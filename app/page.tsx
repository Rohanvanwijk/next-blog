import MyBooks from "@/components/MyBooks";
import Link from "next/dist/client/link";

const TAGS = ["Nature", "Automotive", "Travel", "Vibe", "Architecture"];

export default async function Home() {
  const IMAGEKIT_API_ENDPOINT = process.env.IMAGEKIT_API_ENDPOINT;
  const IMAGEKIT_KEY = process.env.IMAGEKIT_KEY;

  const token = btoa(IMAGEKIT_KEY + ":");

  const Allresponse = await Promise.all(
    TAGS.map((tag) =>
      fetch(
        `${IMAGEKIT_API_ENDPOINT}/files?type=file&searchQuery=tags IN ["${tag}"]&limit=1&sort=DESC_CREATED`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
          },
        },
      ).then((res) =>
        res
          .json()
          .catch((err) =>
            console.error(
              `Failed to parse JSON for tag ${tag}: ${err.message}`,
            ),
          ),
      ),
    ),
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <header className="flex items-center justify-center pt-16 gap-4">
        <h1 className="text-4xl font-bold mb-4">Rohan Photo</h1>
      </header>
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-start py-16 px-8 bg-white dark:bg-black sm:items-start">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {Allresponse.map((theme: any) => (
            <li key={theme[0].fileId} className="">
              <img
                src={`/api/images?query=${theme[0].filePath.slice(1)}/tr:w-400,h-400`}
                alt={theme[0].name}
                className="object-cover rounded-md mb-2 bg-blue-100 dark:bg-blue-900 w-full"
                width={400}
                height={400}
              />
              <Link
                href={`/tag/${theme[0].tags[0]}`}
                className="text-lg font-semibold text-gray-800 dark:text-gray-200"
              >
                {theme[0].tags.join(", ")}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
