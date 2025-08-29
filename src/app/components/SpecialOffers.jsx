"use client";

import React, { useEffect, useRef, useState } from "react";

const offers = [
  {
    id: 1,
    title: "Summer Discount 20% Off",
    description:
      "Get 20% off on all veterinary consultation services this summer.",
    validTill: "August 31, 2025",
    icon: "🌞", // Added icon for visual appeal
  },
  {
    id: 2,
    title: "Free Delivery on Equipment",
    description: "Free delivery on all farm equipment orders above $500.",
    validTill: "September 15, 2025",
    icon: "🚚", // Added icon for visual appeal
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free Vaccination",
    description:
      "Avail buy 2 vaccinations and get 1 vaccination free for your livestock.",
    validTill: "December 31, 2025",
    icon: "💉", // Added icon for visual appeal
  },
];

// Custom hook for intersection observer
function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

export default function SpecialOffers() {
  const sectionRef = useRef();
  const isSectionVisible = useOnScreen(sectionRef, "-100px");

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-800 dark:to-green-900 rounded-2xl shadow-lg"
    >
      <div
        className={`text-center mb-12 ${
          isSectionVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 dark:text-green-100 mb-4">
          Special Offers &{" "}
          <span className="text-green-800 dark:text-green-300">Promotions</span>
        </h2>
        <p className="text-lg text-green-700 dark:text-green-200 max-w-2xl mx-auto">
          Take advantage of our limited-time offers to keep your livestock
          healthy and your farm productive.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {offers.map((offer, index) => (
          <OfferCard key={offer.id} offer={offer} index={index} />
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .offer-card {
          opacity: 0;
        }

        .offer-card.animate-in {
          animation: fadeInUp 0.6s forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s forwards;
        }

        .offer-icon {
          transition: all 0.3s ease;
        }

        .offer-card:hover .offer-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .offer-card:hover {
          transform: translateY(-5px);
        }

        .countdown-timer {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </section>
  );
}

function OfferCard({ offer, index }) {
  const ref = useRef();
  const isVisible = useOnScreen(ref, "-100px");
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    // Calculate days remaining for the offer
    const validTillDate = new Date(offer.validTill);
    const today = new Date();
    const timeDiff = validTillDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysRemaining(daysDiff > 0 ? daysDiff : 0);
  }, [offer.validTill]);

  return (
    <div
      ref={ref}
      className={`offer-card bg-white dark:bg-green-800 border border-green-200 dark:border-green-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${
        isVisible ? "animate-in" : ""
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="text-center mb-4">
        <div className="text-4xl mb-3 offer-icon">{offer.icon}</div>
        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
          {offer.title}
        </h3>
      </div>

      <p className="text-green-700 dark:text-green-300 mb-5 text-center">
        {offer.description}
      </p>

      <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg mb-4">
        <p className="text-sm font-medium text-green-800 dark:text-green-200 text-center">
          ⏰ Valid for{" "}
          <span className="countdown-timer font-bold">{daysRemaining}</span>{" "}
          more days
        </p>
        <p className="text-xs text-green-600 dark:text-green-400 text-center mt-1">
          Until: {offer.validTill}
        </p>
      </div>

      <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
        Claim Offer
      </button>
    </div>
  );
}
