import React from "react";

const offers = [
  {
    id: 1,
    title: "Summer Discount 20% Off",
    description:
      "Get 20% off on all veterinary consultation services this summer.",
    validTill: "August 31, 2025",
  },
  {
    id: 2,
    title: "Free Delivery on Equipment",
    description: "Free delivery on all farm equipment orders above $500.",
    validTill: "September 15, 2025",
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free Vaccination",
    description:
      "Avail buy 2 vaccinations and get 1 vaccination free for your livestock.",
    validTill: "December 31, 2025",
  },
];

export default function SpecialOffers() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12   dark:bg-green-700 rounded-lg">
      <h2 className="text-3xl font-extrabold text-center text-green-800 dark:text-green-200 mb-8">
        Special Offers & Promotions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white dark:bg-green-800 border border-green-300 dark:border-green-700 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
              {offer.title}
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              {offer.description}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Valid Till: {offer.validTill}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
