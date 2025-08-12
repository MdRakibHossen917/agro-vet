import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function ProductsDetailsPage({ params }) {
  console.log("Product ID:", params.id);

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://agro-vet.vercel.app"
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/product/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-red-600">
        Error fetching product data.
      </div>
    );
  }

  const data = await res.json();

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-red-600">
        No product found with this ID.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
        Product Details
      </h1>

      <div className="flex flex-col items-center space-y-6 text-gray-900 dark:text-gray-100">
        {data.img && (
          <Image
            src={data.img}
            alt={data.title}
            width={400}
            height={120}
            className="object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        )}

        <div className="w-full space-y-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow-inner">
          <p>
            <strong>ID:</strong> <span className="break-all">{data._id}</span>
          </p>
          <p>
            <strong>Product:</strong> {data.title}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold">
              ${data.price}
            </span>
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {data.description || "No description available."}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href={`/checkout/${data._id}`}
          className="mt-auto w-full inline-block px-5 py-2 text-center border-2 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition-colors duration-300"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
