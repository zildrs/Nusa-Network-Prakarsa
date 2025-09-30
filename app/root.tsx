import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getRequestLocale } from "./lib/locale-utils.server";
import { createT } from "./i18n";

import type { Route } from "./+types/root";
import "./app.css";
import "aos/dist/aos.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { createOrganizationSchema } from "./lib/seo";
import { useEffect } from "react";
import AOS from "aos";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = getRequestLocale(request);
  return { locale }; // cukup primitif, data kecil
}

export function Layout() {
  const { locale } = useLoaderData<typeof loader>();
  const t = createT(locale);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="E_Eg6_oNxGnmJ1xQjAe5I6YDdjI8aw0w2fmXCjiBJq8"
        />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createOrganizationSchema()),
          }}
        />
      </head>
      <body>
        <Header locale={locale} t={t} />
        {/* Hanya pakai Outlet, jangan gabung dengan children */}
        <Outlet context={{ t, locale }} />
        <Footer locale={locale} t={t} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

// tipe helper untuk anak-anak
export type RootOutletContext = ReturnType<typeof createRootContext>;
function createRootContext() {
  return {} as { t: ReturnType<typeof createT>; locale: "id" | "en" };
}
