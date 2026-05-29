"use client";
import { useRouter } from "next/navigation";

export default function BackLink() {
  const router = useRouter();

  return (
    <div className="mb-4">
      <button
        onClick={() => router.back()}
        className="text-blue-500 hover:underline cursor-pointer"
      >
        Go back
      </button>
    </div>
  );
}
