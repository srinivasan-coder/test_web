import { db } from "@/lib/firebase-admin";

function splitPath(pathname: string): { collection: string; doc: string } {
  const parts = pathname.split("/");
  const collection = parts[0] ?? "";
  const file = parts[1] ?? "";
  return { collection, doc: file.replace(/\.json$/, "") };
}

/**
 * Reads a JSON value stored in Firestore under a fixed logical pathname
 * (e.g. "data-db/galleries.json" -> collection "data-db", doc "galleries").
 * Firestore documents are maps, so the value is wrapped under a "value" field.
 */
export async function readJsonDoc<T>(pathname: string, fallback: T): Promise<T> {
  try {
    const { collection, doc } = splitPath(pathname);
    const snap = await db.collection(collection).doc(doc).get();
    if (!snap.exists) return fallback;
    const value = snap.data()?.value;
    return value === undefined ? fallback : (value as T);
  } catch {
    return fallback;
  }
}

/** Overwrites the JSON value at a fixed logical pathname. */
export async function writeJsonDoc(pathname: string, data: unknown): Promise<void> {
  const { collection, doc } = splitPath(pathname);
  await db.collection(collection).doc(doc).set({ value: data });
}
