// app/all-products/page.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

const PAGE_SIZE = 8; // Number of products per page

const AllProducts = async ({ searchParams }) => {
  // Handle async searchParams in Next.js 15
  const params = searchParams instanceof Promise ? await searchParams : (searchParams || {});
  const page = parseInt(params?.page || 1);
  const search = params?.search || "";

  const productsCollection = await dbConnect(
    collectionNameObj.productsCollection
  );

  // Build query for search - escape special regex characters
  const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  
  const query = search 
    ? { 
        title: { 
          $regex: escapeRegex(search), 
          $options: "i" 
        } 
      } 
    : {};

  const totalProducts = await productsCollection.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const products = await productsCollection
    .find(query)
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .toArray();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Discount Offer Marquee */}
      <div className="overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 py-3 mb-6 ">
        <div className="flex marquee-content whitespace-nowrap">
          <div className="flex items-center space-x-8">
            <span className="text-white font-bold text-lg md:text-xl">
              🎉 Special Offer: Get 20% OFF on all products! Limited Time Only
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              🔥 Buy Now: Free Shipping on orders above $100
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              ⚡ Discount Alert: 15% OFF on bulk orders
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              🎁 New Customer Offer: Get 25% OFF on first purchase
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              💰 Best Prices Guaranteed: Quality Veterinary Products
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              🎉 Special Offer: Get 20% OFF on all products! Limited Time Only
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              🔥 Buy Now: Free Shipping on orders above $100
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              ⚡ Discount Alert: 15% OFF on bulk orders
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              🎁 New Customer Offer: Get 25% OFF on first purchase
            </span>
            <span className="text-white font-bold text-lg md:text-xl">
              💰 Best Prices Guaranteed: Quality Veterinary Products
            </span>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100">
        All Products
      </h1>

      {/* Search Box */}
      <form method="GET" className="max-w-md mx-auto mb-8 flex">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search products..."
          className="flex-grow p-2 border rounded-l-md dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.length === 0 && (
          <p className="col-span-4 text-center text-gray-600 dark:text-gray-400">
            No products found.
          </p>
        )}
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
                unoptimized={true}
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
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`/all-products?page=${i + 1}${
                search ? `&search=${search}` : ""
              }`}
              className={`px-4 py-2 rounded-md border ${
                page === i + 1
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              } hover:bg-green-600 hover:text-white transition-colors`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
