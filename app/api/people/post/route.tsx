import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

export async function POST(request: Request) {
  const client = new MongoClient(uri);

  try {
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("znani_ludzie");
    const collection = db.collection("people");

    const result = await collection.insertOne(body);

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("MongoDB insert error:", err);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
