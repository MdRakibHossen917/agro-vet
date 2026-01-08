import React from "react";
import Link from "next/link";
import Image from "next/image";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function ProductsDetailsPage({ params }) {
  // Handle async params in Next.js 15
  const resolvedParams = params instanceof Promise ? await params : params;
  const productId = resolvedParams?.id;

  if (!productId) {
    return (
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600">
          Invalid product ID.
        </div>
      </div>
    );
  }

  if (!ObjectId.isValid(productId)) {
    return (
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600">
          Invalid product ID format.
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
            No product found with this ID.
          </div>
        </div>
      );
    }

  return (
    <div className="w-full md:w-11/12 mx-auto px-0 md:px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-8 px-4 md:px-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Product Details
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {data.description || "Comprehensive information about this product"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-none md:rounded-lg shadow-lg p-4 md:p-6 lg:p-8 border-0 md:border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-gray-900 dark:text-gray-100">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          {data.img && (
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-700">
              <Image
                src={data.img}
                alt={data.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                unoptimized={true}
              />
            </div>
          )}
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {data.title}
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-green-600 dark:text-green-400 mb-2">
                  ${data.price}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              </div>

              {data.description && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {data.description}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Product ID
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 break-all font-mono">
                  {data._id}
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="pt-6">
            <Link
              href={`/checkout/${data._id}`}
              className="block w-full px-6 py-4 text-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600">
          Error fetching product data. Please try again later.
        </div>
      </div>
    );
  }
}
