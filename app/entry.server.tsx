// app/entry.server.tsx
import { PassThrough } from "node:stream";
import { ServerRouter } from "react-router";
import type { EntryContext } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { createReadableStreamFromReadable } from "@react-router/node";

export default function handleRequest(
  request: Request,
  status: number,
  headers: Headers,
  context: EntryContext
) {
  return new Promise<Response>((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={context} url={request.url} />,
      {
        onShellReady() {
          headers.set("Content-Type", "text/html");
          const body = new PassThrough();
          pipe(body);
          resolve(new Response(createReadableStreamFromReadable(body), { status, headers }));
        },
        onShellError(err) { reject(err); },
      }
    );
    // opsional: abort timeout streaming
    setTimeout(abort, 15_000);
  });
}
