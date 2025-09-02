// app/routes/resources.set-locale.tsx  (resource route)
import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const lang = form.get("lang");
  if (lang !== "id" && lang !== "en") {
    return new Response("Invalid lang", { status: 400 });
  }
  const headers = new Headers();
  headers.append("Set-Cookie", `lang=${lang}; Path=/; Max-Age=${60*60*24*365}; SameSite=Lax`);
  headers.append("Vary", "Cookie, Accept-Language");
  // redirect back
  const backTo = form.get("from")?.toString() || "/";
  return redirect(backTo, { headers });
}
