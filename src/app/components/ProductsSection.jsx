import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductsSection() {
  const productsCollection = await dbConnect(
    collectionNameObj.productsCollection
  );

  // show 8 products
  const data = await productsCollection.find({}).limit(8).toArray();

  return (
    <section className="  py-12 transition-colors duration-300">
      {/* Title & Subtitle */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Our Products
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Browse our handpicked selection of quality products, curated to meet
          your needs and budget.
        </p>
      </div>

      {/* Products Grid */}
      <div className="mx-4 sm:mx-10 md:mx-16 lg:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-2">
        {data.map((item) => (
          <div
            key={item.product_id || item._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-xl shadow-sm">
              <Image
                src={item.img}
                alt={item.title}
                width={200}
                height={160}
                className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Title */}
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug mt-3">
              {item.title}
            </h2>

            {/* Price */}
            <p className="text-green-700 dark:text-green-400 font-semibold text-sm mt-1">
              Price: ${item.price}
            </p>

            {/* Button */}
            <Link
              href={`/products/${item._id}`}
              className="mt-auto inline-block px-5 py-2 text-center border-2 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
