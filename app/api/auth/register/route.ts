import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, password } = await req.json();

  if (!name || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("znani_ludzie");
  const users = db.collection("users");

  const existingUser = await users.findOne({ name });
  if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({ name, password: hashedPassword });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
