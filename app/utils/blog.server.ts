import { detectLocale } from "~/lib/locale.server";
import type { BackendBlogResponse, BlogData, BlogPost } from "~/types/blog";

const BLOG_API_BASE = "https://dash.nusanetwork.com/api";
const DEFAULT_TIMEOUT_MS = 10000;

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
  }
}

export async function fetchBlogData(request: Request): Promise<BlogData> {
  await ensureDevInsecureTLS();
  const url = new URL(request.url);
  const qpLocale = url.searchParams.get("locale");
  const locale = qpLocale === "id" || qpLocale === "en" ? qpLocale : detectLocale(request);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(`${BLOG_API_BASE}/blogs?locale=${locale}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return { blogs: [], locale };
    const json = (await res.json()) as BackendBlogResponse | null;
    const blogs: BlogPost[] = Array.isArray(json?.data) ? json!.data : [];
    return { blogs, locale, meta: json?.meta };
  } catch (err) {
    clearTimeout(timeout);
    if (process.env.NODE_ENV !== "production") {
      const code = (err as any)?.cause?.code || (err as any)?.code;
      if (
        code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" ||
        code === "CERT_HAS_EXPIRED" ||
        code === "DEPTH_ZERO_SELF_SIGNED_CERT"
      ) {
        console.warn(
          `[blog] TLS verification error in SSR fetch (${String(code)}). ` +
            `You can set ALLOW_INSECURE_TLS=1 for local dev, or configure NODE_EXTRA_CA_CERTS to trust the CA.`
        );
      }
    }
    return { blogs: [], locale };
  }
}
