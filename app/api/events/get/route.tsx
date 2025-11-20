import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

export async function GET() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("znani_ludzie");
        const collection = db.collection("events"); 


        const data = await collection.find({}).toArray();

        return NextResponse.json(data);
    } catch (err) {
        console.error("MongoDB fetch error:", err);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    } finally {
        await client.close();
    }
}
