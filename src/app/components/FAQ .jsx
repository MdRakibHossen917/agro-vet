"use client";

import React, { useState } from "react";

const faqData = [
  {
    question: "How do I take care of my livestock?",
    answer:
      "Ensure they have a balanced diet, clean water, proper shelter, and regular health checkups.",
  },
  {
    question: "What vaccinations do my animals need?",
    answer:
      "Common vaccinations include those against foot-and-mouth disease, rabies, and various parasites. Consult a vet for your region-specific needs.",
  },
  {
    question: "How can I track my order shipment?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email. Use it on our partner courier's website to monitor delivery status.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto p-6 my-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-md p-4 cursor-pointer"
            onClick={() => toggleAnswer(index)}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {item.question}
            </h3>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
