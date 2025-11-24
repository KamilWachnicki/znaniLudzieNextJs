import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

export async function GET(req: Request) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("znani_ludzie");
        const collection = db.collection("events");

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const data = await collection.find({ id }).toArray();
            return NextResponse.json(data);
        }

        const maxDoc = await collection
            .find({})
            .sort({ id: -1 })
            .limit(1)
            .toArray();

        const maxId = maxDoc[0]?.id || 0;

        return NextResponse.json({ maxId });

    } catch (err) {
        console.error("MongoDB fetch error:", err);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    } finally {
        await client.close();
    }
}