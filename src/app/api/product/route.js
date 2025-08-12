import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

 

// GET handler to fetch bookings for logged-in user
export const GET = async () => {
  try {
    const productsCollection = await dbConnect(
      collectionNameObj.productsCollection
    );

     
    const products = await productsCollection.find({}).limit(5).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};

// POST handler to create a new booking
export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized, please login" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bookingsCollection = await dbConnect(
      collectionNameObj.bookingsCollection
    );
    const result = await bookingsCollection.insertOne({
      ...body,
      email: session.user.email,  
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Booking saved successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    return NextResponse.json(
      { error: "Failed to save booking" },
      { status: 500 }
    );
  }
};

