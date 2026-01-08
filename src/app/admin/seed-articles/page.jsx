"use client";

import { useState } from "react";

export default function SeedArticlesPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSeedArticles = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/articles/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `Successfully seeded ${data.count} articles! IDs: ${data.insertedIds.join(", ")}`
        );
        setTimeout(() => {
          window.location.href = "/all-articles";
        }, 2000);
      } else {
        setError(data.message || "Failed to seed articles");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearArticles = async () => {
    if (!confirm("Are you sure you want to delete all articles? This cannot be undone.")) {
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/articles/seed", {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Successfully deleted ${data.deletedCount} articles.`);
      } else {
        setError(data.message || "Failed to delete articles");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Seed Articles
          </h1>

          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h2 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                What this does:
              </h2>
              <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                <li>Adds 5 sample articles with images from assets/Articles</li>
                <li>Articles include: Goat Care, Veterinary Testing, Women in Agriculture, Young Livestock, and Cattle Management</li>
                <li>All articles include proper categories, descriptions, and content</li>
              </ul>
            </div>

            {message && (
              <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200">{message}</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleSeedArticles}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-300 disabled:cursor-not-allowed"
              >
                {loading ? "Seeding..." : "Seed Articles"}
              </button>

              <button
                onClick={handleClearArticles}
                disabled={loading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-300 disabled:cursor-not-allowed"
              >
                {loading ? "Deleting..." : "Clear All"}
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/all-articles"
                className="text-green-600 dark:text-green-400 hover:underline font-medium"
              >
                ← Back to Articles
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

