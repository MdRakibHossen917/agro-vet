import React from "react";
import Image from "next/image";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

const ARTICLES_PER_PAGE = 1;

const ArticlesPage = async ({ searchParams }) => {
  const page = parseInt((await searchParams)?.page || 1);

  // DB connect
  const articlesCollection = await dbConnect(
    collectionNameObj.articlesCollection
  );

  // Count & Pagination
  const totalArticles = await articlesCollection.countDocuments();
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  // Fetch articles
  const articles = await articlesCollection
    .find({})
    .skip((page - 1) * ARTICLES_PER_PAGE)
    .limit(ARTICLES_PER_PAGE)
    .toArray();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        All Articles
      </h1>

      {articles.map((article) => (
        <div
          key={article._id.toString()}
          className="flex flex-col md:flex-row items-start bg-white dark:bg-gray-800 shadow-lg rounded-xl mb-8 overflow-hidden"
        >
          {/* Left Image */}
          <div className="md:w-2/5 w-full relative h-64 md:h-auto">
            <img
              src={article.photo}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Info */}
          <div className="md:w-3/5 w-full p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                {article.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {article.description}
              </p>

              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Brand:</strong> {article.brand} |{" "}
                  <strong>Category:</strong> {article.category}
                </p>
                <p>
                  <strong>Usage:</strong> {article.usage}
                </p>
                <p>
                  <strong>Composition:</strong> {article.composition}
                </p>
                <p>
                  <strong>Benefits:</strong> {article.benefits}
                </p>
                <p>
                  <strong>Other Details:</strong> {article.otherDetails}
                </p>
                <p>
                  <strong>Expiry Date:</strong> {article.expiryDate}
                </p>
                {article.longDescription && (
                  <p className="mt-2 text-gray-800 dark:text-gray-200 leading-relaxed">
                    {article.longDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-3">
          <a
            href={`/all-articles?page=${Math.max(page - 1, 1)}`}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              page === 1
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white dark:hover:bg-blue-500"
            }`}
          >
            Previous
          </a>
          <span className="px-3 py-2 text-gray-700 dark:text-gray-300 font-medium">
            Page {page} of {totalPages}
          </span>
          <a
            href={`/all-articles?page=${Math.min(page + 1, totalPages)}`}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              page === totalPages
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white dark:hover:bg-blue-500"
            }`}
          >
            Next
          </a>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
