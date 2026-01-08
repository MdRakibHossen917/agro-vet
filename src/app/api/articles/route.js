import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// GET all articles
export async function GET(request) {
  try {
    const articlesCollection = await dbConnect(
      collectionNameObj.articlesCollection
    );

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || 1);
    const limit = parseInt(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const articles = await articlesCollection
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await articlesCollection.countDocuments();

    // Convert _id to string
    const formattedArticles = articles.map((article) => ({
      ...article,
      _id: article._id.toString(),
    }));

    return NextResponse.json({
      articles: formattedArticles,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST create new article
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const articlesCollection = await dbConnect(
      collectionNameObj.articlesCollection
    );

    const articleData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await articlesCollection.insertOne(articleData);

    return NextResponse.json(
      {
        message: "Article created successfully",
        article: {
          ...articleData,
          _id: result.insertedId.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

