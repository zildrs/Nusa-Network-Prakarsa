import { apiCache } from "./cache.server";

let tlsBypassInitialized = false;

async function ensureDevInsecureTLS() {
  if (tlsBypassInitialized) return;
  const shouldBypass = process.env.ALLOW_INSECURE_TLS === "1";
  if (!shouldBypass) return;
  try {
    const { setGlobalDispatcher, Agent } = await import("undici");
    setGlobalDispatcher(new Agent({ connect: { rejectUnauthorized: false } }));
    tlsBypassInitialized = true;
    console.log("[TLS] Insecure TLS bypass enabled (ALLOW_INSECURE_TLS=1)");
  } catch {
    return;
  }
}

const DEFAULT_TIMEOUT_MS = 10000;

function handleApiError(err: unknown, serviceName: string) {
  if (process.env.NODE_ENV !== "production") {
    const code = (err as any)?.cause?.code || (err as any)?.code;
    if (
      code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" ||
      code === "CERT_HAS_EXPIRED" ||
      code === "DEPTH_ZERO_SELF_SIGNED_CERT"
    ) {
      console.warn(
        `[${serviceName}] TLS verification error in SSR fetch (${String(
          code
        )}). You can set ALLOW_INSECURE_TLS=1 for local dev, or configure NODE_EXTRA_CA_CERTS.`
      );
    } else {
      console.error(`[${serviceName}] fetch failed:`, err);
    }
  }
}

/**
 * Generic reusable API request with caching
 */
export async function createApiRequest<T>(
  baseUrl: string,
  endpoint: string,
  opts: {
    query?: Record<string, string | number | undefined>;
    serviceName?: string;
    headers?: HeadersInit;
  } = {}
): Promise<T | null> {
  await ensureDevInsecureTLS();

  const url = new URL(endpoint, baseUrl);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v != null) url.searchParams.set(k, String(v));
    }
  }

  const cacheKey = url.toString();
  const cached = apiCache.get<T>(cacheKey);

  if (cached !== null) {
    console.log(`[CACHE HIT] ${opts.serviceName || "api"}: ${cacheKey}`);
    return cached;
  }

  console.log(`[CACHE MISS] ${opts.serviceName || "api"}: ${cacheKey}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json", ...opts.headers },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    
    if (!res.ok) {
      console.error(`[${opts.serviceName || "api"}] API returned ${res.status}: ${url}`);
      return null;
    }

    const data = (await res.json()) as T;
    const dataSize = JSON.stringify(data).length;
    console.log(`[${opts.serviceName || "api"}] Fetched ${dataSize} bytes from ${url}`);
    
    apiCache.set(cacheKey, data);

    return data;
  } catch (err) {
    clearTimeout(timeout);
    handleApiError(err, opts.serviceName || "api");
    console.error(`[${opts.serviceName || "api"}] Fetch error for ${url}:`, err);
    return null;
  }
}
