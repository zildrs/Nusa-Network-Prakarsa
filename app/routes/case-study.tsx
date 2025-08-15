import type { Route } from "./+types/case-study";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CaseStudy() {
  return <h1>Case Study</h1>;
}
