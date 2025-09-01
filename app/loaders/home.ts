export async function homeLoader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok)
    throw new Response("Failed to fetch users", { status: res.status });
  return res.json();
}
