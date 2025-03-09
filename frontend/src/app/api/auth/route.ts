import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // Ensure correct path
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    console.log("Received login request for:", email);

    // Fetch user from Firestore
    const userSnapshot = await db.collection("users").where("email", "==", email).get();

    if (userSnapshot.empty) {
      console.log("User not found in Firestore");
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const user = userSnapshot.docs[0].data();
    console.log("User retrieved from Firestore:", user);

    return NextResponse.json({ message: "Login successful", role: user.role });

  } catch (error) {
    console.error("🚨 API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
