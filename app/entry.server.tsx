// entry.server.tsx
import { renderToPipeableStream } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import routes from "./routes";
import i18n from "./i18n"; // instance i18next kamu

export default async function handleRequest(req: Request, res: any) {
  const handler = createStaticHandler(routes);

  const context = await handler.query(req, {
    context: {
      i18n, // ✅ inject ke semua loader
    },
  });

  const router = createStaticRouter(handler.dataRoutes, context);

  const stream = renderToPipeableStream(
    <StaticRouterProvider router={router} context={context} />
  );

  return stream;
}
