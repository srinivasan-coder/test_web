import { put, list } from "@vercel/blob";

/**
 * Reads a JSON object stored in Vercel Blob at a fixed logical pathname.
 * Blobs are content-addressed by URL, not path, so this looks the current
 * blob up by its pathname prefix rather than assuming a stable URL.
 */
export async function readJsonBlob<T>(pathname: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const match = blobs.find((b) => b.pathname === pathname);
    if (!match) return fallback;
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

/** Overwrites the JSON object at a fixed logical pathname. */
export async function writeJsonBlob(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
