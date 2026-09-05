// One-off migration: copies data-db/*.json out of Vercel Blob into Firestore,
// and re-uploads any images that still live on blob.vercel-storage.com to
// Cloudinary, rewriting the URLs in the migrated documents.
//
// Run once, after setting FIREBASE_* / CLOUDINARY_* / BLOB_READ_WRITE_TOKEN
// in .env.local:
//   node --env-file=.env.local scripts/migrate-blob-to-firebase.mjs

import { list } from "@vercel/blob";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { v2 as cloudinary } from "cloudinary";

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});
const db = getFirestore();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function readBlobJson(pathname, fallback) {
  const { blobs } = await list({ prefix: pathname, limit: 1 });
  const match = blobs.find((b) => b.pathname === pathname);
  if (!match) return fallback;
  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return fallback;
  return res.json();
}

async function migrateImageUrl(url, folder) {
  if (!url || !url.includes("blob.vercel-storage.com")) return url;
  const result = await cloudinary.uploader.upload(url, { folder });
  console.log(`  image -> ${result.secure_url}`);
  return result.secure_url;
}

async function writeDoc(docId, value) {
  await db.collection("data-db").doc(docId).set({ value });
}

async function migrateSiteImages() {
  console.log("Migrating site-images.json...");
  const overrides = await readBlobJson("data-db/site-images.json", {});
  for (const key of Object.keys(overrides)) {
    overrides[key].path = await migrateImageUrl(overrides[key].path, "migrated/site-images");
  }
  await writeDoc("site-images", overrides);
  console.log(`Done: ${Object.keys(overrides).length} overrides.`);
}

async function migrateContentFile(file, migrateImages) {
  console.log(`Migrating ${file}...`);
  const items = await readBlobJson(`data-db/${file}`, []);
  for (const item of items) {
    await migrateImages(item);
  }
  await writeDoc(file.replace(/\.json$/, ""), items);
  console.log(`Done: ${items.length} items.`);
}

async function main() {
  await migrateSiteImages();

  await migrateContentFile("galleries.json", async (g) => {
    if (g.cover?.src) g.cover.src = await migrateImageUrl(g.cover.src, "migrated/galleries");
    for (const img of g.images ?? []) {
      img.src = await migrateImageUrl(img.src, "migrated/galleries");
    }
  });

  await migrateContentFile("team.json", async (m) => {
    if (m.avatar) m.avatar = await migrateImageUrl(m.avatar, "migrated/team");
  });

  await migrateContentFile("reviews.json", async (r) => {
    if (r.avatar) r.avatar = await migrateImageUrl(r.avatar, "migrated/reviews");
    if (r.cover) r.cover = await migrateImageUrl(r.cover, "migrated/reviews");
  });

  await migrateContentFile("instagram.json", async (p) => {
    if (p.image?.src) p.image.src = await migrateImageUrl(p.image.src, "migrated/instagram");
  });

  console.log("Migration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
