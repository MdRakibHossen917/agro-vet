import React from "react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-gray-800 dark:text-white">
        About Us
      </h1>

      {/* Intro */}
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>Rampart-Power Bangladesh Limited</strong> is a leading
        pharmaceutical company in Bangladesh specializing in animal health and
        veterinary products. It was formerly known as{" "}
        <em>Rhone-Poulenc Agrovet Bangladesh</em>. We have a rich history and a
        strong legacy in providing high-quality veterinary medicines and agrovet
        solutions.
      </p>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800 dark:text-white">
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Our mission is to enhance the health and productivity of livestock and
          poultry through innovative, reliable, and effective veterinary
          products, supporting the agricultural community across Bangladesh.
        </p>
      </section>

      {/* Legacy */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800 dark:text-white">
          Our Legacy
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The journey began with the establishment of Rhone-Poulenc Agrovet
          Bangladesh, a subsidiary of the French chemical and pharmaceutical
          company Rhone-Poulenc. After various mergers and transformations, the
          company was rebranded as Rampart-Power Bangladesh Limited. We continue
          to uphold the commitment to quality and excellence in animal
          healthcare.
        </p>
      </section>

      {/* Products */}
      <section className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800 dark:text-white">
          Our Products
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Antibiotics for treating animal infections</li>
          <li>Anthelmintics to control parasitic infestations</li>
          <li>Vitamins and minerals for overall animal health</li>
          <li>Disinfectants to maintain hygiene</li>
          <li>Vaccines to prevent infectious diseases</li>
        </ul>
      </section>

      {/* Commitment */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800 dark:text-white">
          Our Commitment
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          We are committed to continuous research and development, maintaining
          the highest quality standards, and collaborating with global partners
          to provide the best veterinary solutions for Bangladesh's livestock
          and poultry industries.
        </p>
      </section>
    </div>
  );
}
