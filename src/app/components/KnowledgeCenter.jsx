import React from "react";
import Link from "next/link";

export default function KnowledgeCenter() {
  const articles = [
    {
      id: 1,
      title: "Cattle Health Management",
      subtitle: "Best practices for keeping your cattle healthy year-round.",
      link: "https://en.wikipedia.org/wiki/Cattle",
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
    <section className="mx-4 sm:mx-10 md:mx-16 lg:mx-20 py-16">
      {/* Section Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Knowledge Center
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Learn from our collection of farming tips, livestock care guides, and
          industry insights.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400">
              {article.title}
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {article.subtitle}
            </p>
            <span className="mt-4 inline-block text-green-600 dark:text-green-400 font-medium group-hover:underline">
              Read More →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
