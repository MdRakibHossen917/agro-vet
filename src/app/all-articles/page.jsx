import React from "react";
import Image from "next/image";
import Link from "next/link";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// Import images from assets/Articles
import articleImage1 from "../../assets/Articles/front-view-smiley-woman-holding-goat.jpg";
import articleImage2 from "../../assets/Articles/researcher-holds-test-tube-with-water-hand-blue-glove.jpg";
import articleImage3 from "../../assets/Articles/view-woman-working-animal-farming-field-celebrate-labour-day-women 1.jpg";
import articleImage4 from "../../assets/Articles/young-farmer-feeding-his-goats-milk-from-bottle-farm.jpg";
import articleImage5 from "../../assets/Articles/young-woman-farmer-looking-after-cows-cowshed.jpg";

// Array of article images to cycle through
const articleImages = [
  articleImage1,
  articleImage2,
  articleImage3,
  articleImage4,
  articleImage5,
];

const ARTICLES_PER_PAGE = 9;

const ArticlesPage = async ({ searchParams }) => {
  // Handle async searchParams in Next.js 15
  const params = searchParams instanceof Promise ? await searchParams : (searchParams || {});
  const page = parseInt(params?.page || 1);
  const category = params?.category || "";

  // DB connect
  const articlesCollection = await dbConnect(
    collectionNameObj.articlesCollection
  );

  // Build query for category filter
  const query = category ? { category: { $regex: category, $options: "i" } } : {};

  // Count & Pagination
  const totalArticles = await articlesCollection.countDocuments(query);
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  // Fetch articles
  const articles = await articlesCollection
    .find(query)
    .skip((page - 1) * ARTICLES_PER_PAGE)
    .limit(ARTICLES_PER_PAGE)
    .toArray();

  // Get all unique categories for filter
  const allArticles = await articlesCollection.find({}).toArray();
  const uniqueCategories = [...new Set(allArticles.map(a => a.category).filter(Boolean))];

  // Function to get image for article (use index or article photo if available)
  const getArticleImage = (article, index) => {
    if (article.photo) {
      return article.photo;
    }
    // Cycle through article images based on index
    return articleImages[index % articleImages.length];
  };

  return (
    <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Knowledge Articles
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore our comprehensive collection of veterinary articles, farming guides, and livestock care insights.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-100 dark:text-gray-800 mb-12 pb-4">
        {/* All Articles Tab */}
        <Link
          href="/all-articles"
          className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 ${
            !category
              ? "border-b-2 border-green-600 text-green-600 dark:text-green-600 font-semibold"
              : "border-b border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-600 transition-colors"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>All Articles</span>
        </Link>

        {/* Category Tabs */}
        {uniqueCategories.map((cat, index) => {
          const isActive = category && category.toLowerCase() === cat.toLowerCase();
          return (
            <Link
              key={index}
              href={`/all-articles?category=${encodeURIComponent(cat)}`}
              className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 ${
                isActive
                  ? "border border-b-0 rounded-t-lg border-green-600 bg-white dark:bg-gray-100 text-green-600 dark:text-gray-900 font-semibold"
                  : "border-b border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-600 transition-colors"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>{cat}</span>
            </Link>
          );
        })}
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No articles found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => {
            const articleImage = getArticleImage(article, index);
            return (
              <article
                key={article._id.toString()}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={articleImage.src || articleImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    {article.category && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-full">
                        {article.category}
                      </span>
                    )}
                    {article.brand && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {article.brand}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Key Info */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {article.usage && (
                      <p className="flex items-start gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Usage:</span>
                        <span className="line-clamp-1">{article.usage}</span>
                      </p>
                    )}
                    {article.benefits && (
                      <p className="flex items-start gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Benefits:</span>
                        <span className="line-clamp-1">{article.benefits}</span>
                      </p>
                    )}
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/articles/${article._id.toString()}`}
                    className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all duration-300 group/link"
                  >
                    Read More
                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12">
          <Link
            href={`/all-articles?page=${Math.max(page - 1, 1)}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              page === 1
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed pointer-events-none"
                : "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            Previous
          </Link>
          
          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <Link
                  key={pageNum}
                  href={`/all-articles?page=${pageNum}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    page === pageNum
                      ? "bg-green-600 dark:bg-green-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-300 dark:hover:border-green-600"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>

          <Link
            href={`/all-articles?page=${Math.min(page + 1, totalPages)}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              page === totalPages
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed pointer-events-none"
                : "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
