import type { Route } from "./+types/blog";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Blog() {
  return <h1>Blog</h1>;
}
