import CheckoutForm from '@/components/forms/CheckoutForm';
import React from 'react';
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function CheckoutPage({ params }) {
  // Handle async params in Next.js 15
  const resolvedParams = params instanceof Promise ? await params : params;
  const productId = resolvedParams?.id;

  if (!productId || !ObjectId.isValid(productId)) {
    return (
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600">
          Invalid product ID.
        </div>
      </div>
    );
  }

  try {
    const productsCollection = await dbConnect(
      collectionNameObj.productsCollection
    );

    const data = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!data) {
      return (
        <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-red-600">
            Product not found.
          </div>
        </div>
      );
    }

    return (
      <div>
        <CheckoutForm data={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600">
          Error loading product data. Please try again later.
        </div>
      </div>
    );
  }
}
