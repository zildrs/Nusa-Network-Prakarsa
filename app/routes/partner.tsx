import type { Route } from "./+types/partner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Partner() {
  return <h1>Partner</h1>;
}
