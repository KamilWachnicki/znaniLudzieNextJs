import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!
if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

export async function POST(req: NextRequest) {
  const client = new MongoClient(uri);

  try {
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await client.connect();
    const db = client.db(process.env.MONGODB_DB!);
    const usersCollection = db.collection("users");

    // Find user in DB
    const user = await usersCollection.findOne({ name });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Password check
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign({ name: user.name }, "TEST_SECRET", {
      expiresIn: "1h",
    });

    // Set cookie
    const res = NextResponse.json({ message: "Logged in" });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true, // should be true in production
      secure: false, // true if using https
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
