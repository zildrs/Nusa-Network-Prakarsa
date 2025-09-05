let tlsBypassInitialized = false;

async function ensureDevInsecureTLS() {
  if (tlsBypassInitialized) return;
  if (process.env.NODE_ENV === "production") return;
  if (process.env.ALLOW_INSECURE_TLS !== "1") return;
  try {
    const { setGlobalDispatcher, Agent } = await import("undici");
    setGlobalDispatcher(new Agent({ connect: { rejectUnauthorized: false } }));
    tlsBypassInitialized = true;
  } catch {
    // undici not available; keep strict TLS
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
 * Generic reusable API request
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json", ...opts.headers },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    clearTimeout(timeout);
    handleApiError(err, opts.serviceName || "api");
    return null;
  }
}
