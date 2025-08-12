import React from "react";
import Link from "next/link";

export default function KnowledgeCenter() {
  const articles = [
    {
      id: 1,
      title: "Cattle Health Management",
      subtitle: "Best practices for keeping your cattle healthy year-round.",
      link: "https://en.wikipedia.org/wiki/Cattle_Health_Initiative",
    },
    {
      id: 2,
      title: "Proper Feed Nutrition",
      subtitle: "A guide to balanced diets for livestock.",
      link: "https://en.wikipedia.org/wiki/Nutrition",
    },
    {
      id: 3,
      title: "Disease Prevention Tips",
      subtitle: "How to identify and prevent common livestock diseases.",
      link: "https://en.wikipedia.org/wiki/Preventive_healthcare",
    },
    {
      id: 4,
      title: "Modern Dairy Farming",
      subtitle: "Techniques to improve milk yield and quality.",
      link: "https://en.wikipedia.org/wiki/Dairy_farming",
    },
  ];

  return (
    <section className="mx-4 sm:mx-10 md:mx-16 lg:mx-20 py-12">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Knowledge Center
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Learn from our collection of farming tips, livestock care guides, and
          industry insights.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {article.subtitle}
            </p>
            <Link
              href={article.link}
              className="inline-block mt-4 text-green-600 dark:text-green-400 font-semibold hover:underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}  