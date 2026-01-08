import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 py-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded shadow-lg">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          About <span className="text-green-600 dark:text-green-400">Rampart Power</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Leading the way in veterinary medicine and agricultural solutions for healthy livestock and productive farms
        </p>
        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
      </div>

      {/* Company Intro Card */}
      <section className="mb-16">
        <div className="bg-white dark:bg-gray-800 rounded shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Our Story
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong className="text-green-600 dark:text-green-400">Rampart Power Bangladesh Limited</strong> is a leading
            pharmaceutical company in Bangladesh specializing in animal health and
            veterinary products. Founded as <em>Rhone-Poulenc Agrovet Bangladesh</em>, 
            we have evolved through decades of innovation and commitment to excellence.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            With a rich history spanning multiple transformations, we continue to uphold 
            our founding principles of quality, innovation, and service to the agricultural 
            community across Bangladesh.
          </p>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Mission Card */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded shadow-xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed opacity-95">
            To enhance the health and productivity of livestock and poultry through 
            innovative, reliable, and effective veterinary products, supporting the 
            agricultural community across Bangladesh.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded shadow-xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed opacity-95">
            To be the most trusted and innovative veterinary healthcare partner, 
            empowering farmers and contributing to sustainable agricultural development 
            in Bangladesh and beyond.
          </p>
        </div>
      </div>

      {/* Legacy Section */}
      <section className="mb-16">
        <div className="bg-gray-50 dark:bg-gray-800 rounded shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Our Legacy
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our journey began with the establishment of <strong>Rhone-Poulenc Agrovet Bangladesh</strong>, 
                a subsidiary of the renowned French chemical and pharmaceutical company Rhone-Poulenc. 
                Through strategic mergers and transformations, we evolved into the trusted brand we are today.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, <strong>Rampart Power Bangladesh Limited</strong> continues to build upon this 
                rich heritage, combining international expertise with local understanding to serve 
                the unique needs of Bangladesh's agricultural sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Our Products & Solutions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive veterinary healthcare solutions for livestock and poultry
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "💊", title: "Antibiotics", desc: "Treating animal infections effectively" },
            { icon: "🪱", title: "Anthelmintics", desc: "Controlling parasitic infestations" },
            { icon: "💉", title: "Vaccines", desc: "Preventing infectious diseases" },
            { icon: "🧪", title: "Vitamins & Minerals", desc: "Ensuring overall animal health" },
            { icon: "🧼", title: "Disinfectants", desc: "Maintaining hygiene standards" },
            { icon: "🌾", title: "Feed Supplements", desc: "Enhancing nutrition and growth" },
          ].map((product, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                {product.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {product.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values/Commitment Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Commitment</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Quality Excellence",
                desc: "Maintaining the highest quality standards in all our products",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Innovation",
                desc: "Continuous research and development for better solutions",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Global Partnership",
                desc: "Collaborating with partners worldwide for best practices",
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 opacity-90">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-lg opacity-90 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <div className="bg-white dark:bg-gray-800 rounded shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore our products and services to find the perfect veterinary solutions for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/all-products"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Browse Products
            </Link>
            <Link
              href="/all-articles"
              className="px-8 py-4 bg-white dark:bg-gray-700 border-2 border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
