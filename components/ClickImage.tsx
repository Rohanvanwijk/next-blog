"use client";

export default function ClickImage({
  src,
  alt,
  srcFull,
}: Readonly<{ src: string; alt: string; srcFull?: string }>) {
  return (
    <img
      src={src}
      alt={alt}
      className="cursor-pointer hover:opacity-75 rounded-md bg-gray-100 dark:bg-gray-800 w-full transition-opacity"
      onClick={() => {
        window.open(srcFull || src, "_blank");
      }}
    />
  );
}
