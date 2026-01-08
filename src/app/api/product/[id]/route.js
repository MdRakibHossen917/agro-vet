import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
  try {
    // Handle async params in Next.js 15
    const resolvedParams = params instanceof Promise ? await params : params;
    const productId = resolvedParams?.id;

    if (!productId || !ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const productsCollection = await dbConnect(
      collectionNameObj.productsCollection
    );

    const data = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Convert _id to string for JSON
    const formattedData = {
      ...data,
      _id: data._id.toString(),
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
};

