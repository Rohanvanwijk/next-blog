import BackLink from "@/components/BackLink";
import Link from "next/link";

export default async function DetailPhotoPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const IMAGEKIT_API_ENDPOINT = process.env.IMAGEKIT_API_ENDPOINT;
  const IMAGEKIT_KEY = process.env.IMAGEKIT_KEY;

  const token = btoa(IMAGEKIT_KEY + ":");
  const fileId = (await searchParams).id;

  const res = await fetch(`${IMAGEKIT_API_ENDPOINT}/files/${fileId}/metadata`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
  });

  const file = await res.json();

  return (
    <div className="container mx-auto py-8 h-screen flex flex-col items-center justify-center">
      <div className="my-4 w-full flex items-center justify-between gap-4 flex-wrap">
        <BackLink />
        {file?.exif && (
          <div>
            <div className="flex flex-row items-end gap-2 flex-wrap">
              {file?.exif?.image?.Model && (
                <>
                  <div className="text-neutral-500">
                    {file.exif.image.Model}
                  </div>
                </>
              )}
              {file?.exif?.exif?.LensModel && (
                <>
                  <div className="text-neutral-500">
                    {file.exif.exif.LensModel} Lens
                  </div>
                </>
              )}
              {file?.exif?.exif?.ISO && (
                <>
                  <div className="text-neutral-500">
                    ISO {file.exif.exif.ISO}
                  </div>
                </>
              )}
              {file?.exif?.exif?.FNumber && (
                <>
                  <div className="text-neutral-500">
                    f/{file.exif.exif.FNumber}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <img
        src={`/api/images?query=${decodedSlug}`}
        alt={decodedSlug}
        className="w-auto h-full object-cover rounded-md"
      />
    </div>
  );
}
