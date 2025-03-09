import admin from "firebase-admin";

// Ensure we only initialize Firebase once
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_ADMIN_KEY;

  if (!serviceAccount) {
    console.error("❌ Missing FIREBASE_ADMIN_KEY environment variable");
    throw new Error("Missing Firebase Admin credentials");
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount)),
    });
    console.log("✅ Firebase Admin Initialized Successfully");
  } catch (error) {
    console.error("🔥 Firebase Admin Initialization Error:", error);
    throw new Error("Firebase Admin Initialization Failed");
  }
}

export const db = admin.firestore();
