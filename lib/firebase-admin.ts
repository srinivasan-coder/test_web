import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let app: App | undefined;

// Deferred until first real use (not at module import time): Next.js imports
// this module while collecting page data at build time, before deploy-time
// env vars are necessarily available there, which would otherwise throw.
function getFirebaseApp(): App {
  if (!app) {
    app =
      getApps()[0] ??
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // .env files can't hold literal newlines, so the key is stored with
          // escaped "\n" sequences and unescaped here.
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });
  }
  return app;
}

export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}
