import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized, please login" },
        { status: 401 }
      );
    }

    const email = session.user.email;
    const bookingsCollection = await dbConnect(
      collectionNameObj.bookingsCollection
    );
    const bookings = await bookingsCollection.find({ email }).toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields (optional but recommended)
    if (
      !body.fullName ||
      !body.email ||
      !body.phone ||
      !body.address ||
      !body.title ||
      !body.price
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bookingsCollection = await dbConnect(
      collectionNameObj.bookingsCollection
    );

    const result = await bookingsCollection.insertOne(body);

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
}
