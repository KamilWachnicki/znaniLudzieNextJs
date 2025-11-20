import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const uri = process.env.MONGODB_URI!
    const client = new MongoClient(uri);

    try {
        const start = Date.now();
        await client.connect();

        const db = client.db("znani_ludzie");
        // Ping the database
        await db.command({ ping: 1 });

        // Run a test query: fetch up to 5 documents from a collection
        const testCollection = db.collection("users"); // replace with your collection name
        const docs = await testCollection.find({}).limit(5).toArray();

        const duration = Date.now() - start;

        return NextResponse.json({
            message: "MongoDB connection and query successful!",
            pingTimeMs: duration,
            sampleData: docs,
        });
    } catch (err) {
        console.error("MongoDB connection/query failed:", err);
        return NextResponse.json({ error: "Connection/query failed", details: err }, { status: 500 });
    } finally {
        await client.close();
    }
}
