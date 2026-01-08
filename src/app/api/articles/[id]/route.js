import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    // Handle async params in Next.js 15
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid article ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const articlesCollection = await dbConnect(
      collectionNameObj.articlesCollection
    );

    const article = await articlesCollection.findOne({ _id: new ObjectId(id) });

    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert _id to string for JSON
    article._id = article._id.toString();

    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch article" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
