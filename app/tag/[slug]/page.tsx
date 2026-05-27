import Link from "next/link";

export default async function TagDetailPage({
  params,
}: {
  params: { slug: Promise<{ slug: string }> };
}) {
  const { slug } = await params;

  const IMAGEKIT_API_ENDPOINT = process.env.IMAGEKIT_API_ENDPOINT;
  const IMAGEKIT_KEY = process.env.IMAGEKIT_KEY;

  const token = btoa(IMAGEKIT_KEY + ":");

  const res = await fetch(
    `${IMAGEKIT_API_ENDPOINT}/files?type=file&searchQuery=tags IN ["${slug}"]&sort=DESC_CREATED`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
    },
  );

  // Always check if the response is OK
  if (!res.ok) {
    console.log("HTTP error", res.status);
    const text = await res.text(); // read error body
    console.log("Error body:", text);
    return;
  }

  const files = await res.json();

  return (
    <div className="container mx-auto py-8">
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to home
      </Link>
      <h1 className="text-3xl font-bold mb-4">{files[0].tags.join(", ")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file: any) => (
          <figure key={file.fileId}>
            <img
              src={`/api/images?query=${file.filePath.slice(1)}/tr:w-400,h-400`}
              alt={file.name}
            />
            <figcaption className="text-center mt-2">{file.name}</figcaption>
          </figure>
        ))}
      </div>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to home
      </Link>
    </div>
  );
}
