import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Get in touch with us" },
  ];
}

export default function Contact() {
  return <h1>Contact</h1>;
}
