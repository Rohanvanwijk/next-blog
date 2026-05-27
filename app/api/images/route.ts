import crypto from "crypto";

export async function GET(request: Request) {
  const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;
  const IMAGEKIT_KEY = process.env.IMAGEKIT_KEY;

  const expiryTimestamp = Math.floor(Date.now() / 1000) + 300;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const str = `${query}${expiryTimestamp}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(IMAGEKIT_KEY);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: { name: "SHA-1" } },
    false,
    ["sign"],
  );
  const messageData = encoder.encode(str);
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    messageData,
  );
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const finalImageUrl = `${IMAGEKIT_URL_ENDPOINT}/${query}?ik-t=${expiryTimestamp}&ik-s=${signatureHex}`;

  return new Response(JSON.stringify("Redirecting to image..."), {
    status: 307,
    headers: {
      Location: finalImageUrl,
    },
  });
}
