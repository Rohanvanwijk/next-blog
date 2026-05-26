import { ImageKitProvider, Image } from "@imagekit/next";
import Link from "next/dist/client/link";

export default async function Home() {
  const IMAGEKIT_API_ENDPOINT = process.env.IMAGEKIT_API_ENDPOINT;
  const IMAGEKIT_KEY = process.env.IMAGEKIT_KEY;

  const token = btoa(IMAGEKIT_KEY + ":");

  const res = await fetch(`${IMAGEKIT_API_ENDPOINT}/files?type=all`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });

  // Always check if the response is OK
  if (!res.ok) {
    console.log("HTTP error", res.status);
    const text = await res.text(); // read error body
    console.log("Error body:", text);
    return;
  }

  const files = await res.json();
  const folders = files.filter((file: any) => file.type === "folder");

  function getImageUrl(folderPath: string) {
    return (
      files.find((file: any) => file.filePath?.startsWith(folderPath))
        ?.filePath || ""
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <header className="flex items-center justify-center pt-16">
        <h1 className="text-4xl font-bold mb-4">Rohan blog Photo</h1>
      </header>
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map((file: any) => (
            <li key={file.folderId}>
              <img
                src={getImageUrl(file.folderPath)}
                alt={getImageUrl(file.folderPath)}
                width={100}
                height={100}
                className="object-cover rounded-md mb-2 bg-blue-100 dark:bg-blue-900"
                data-folder-path={file.folderPath}
              />
              <Link href={`/post/${file.name}`}>{file.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
