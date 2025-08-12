import React from "react";

import amazon from "../../assets/brands/amazon.png";
import amazon_vector from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import start from "../../assets/brands/start.png";

const partners = [
  { id: 1, name: "Amazon", logo: amazon },
  { id: 2, name: "Amazon Vector", logo: amazon_vector },
  { id: 3, name: "Casio", logo: casio },
  { id: 4, name: "Moonstar", logo: moonstar },
  { id: 5, name: "Randstad", logo: randstad },
  { id: 6, name: "Start", logo: start },
];

export default function Partners() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-900 dark:text-gray-100">
        Our Trusted Partners
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex justify-center items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <img
              src={partner.logo.src || partner.logo}
              alt={partner.name}
              className="max-h-16 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
