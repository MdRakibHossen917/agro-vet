import React from "react";
import Link from "next/link";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";

export default async function AllProducts() {
  const productsCollection = await dbConnect(
    collectionNameObj.productsCollection
  );
  const products = await productsCollection.find({}).toArray();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100">
        All Products
      </h1>
      <p className="max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-400 mb-12">
        Browse through our wide range of products carefully selected for you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id.toString()}
            className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            style={{ minHeight: "360px" }}
          >
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src={product.img}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 ease-in-out hover:scale-105"
                unoptimized={true} // Add this if external images cause issues
              />
            </div>

            <div className="flex flex-col flex-grow p-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {product.title}
              </h2>
              <p className="text-green-600 font-bold text-lg">
                ${product.price}
              </p>

              <div className="mt-auto">
                <Link
                  href={`/products/${product._id.toString()}`}
                  className="block w-full text-center py-2 rounded-lg border-2 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition-colors duration-300"
                  aria-label={`View details for ${product.title}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
