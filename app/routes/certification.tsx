import type { Route } from "./+types/certification";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Certification" },
    { name: "description", content: "Prepare for the React Certification" },
  ];
}

export default function Certification() {
  return (
    <main className="p-4">
      <h1>React Certification</h1>
      <p>Prepare for the React Certification</p>
    </main>
  );
}
