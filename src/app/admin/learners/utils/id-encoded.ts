export function encodeId(id: string): string {
  const base64 = Buffer.from(id).toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeId(encodedId: string): string {
  let base64 = encodedId.replace(/-/g, "+").replace(/_/g, "/");

  while (base64.length % 4) {
    base64 += "=";
  }

  return Buffer.from(base64, "base64").toString();
}
