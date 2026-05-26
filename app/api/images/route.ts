export async function GET(request: Request) {
  const IMAGEKIT_API_ENDPOINT = process.env.IMAGEKIT_API_ENDPOINT;
  const IMAGEKIT_KEY = process.env.IMAGEKIT_KEY;

  const token = btoa(IMAGEKIT_KEY + ":");

  const res = await fetch(`${IMAGEKIT_API_ENDPOINT}/files`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });

  const { data } = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
