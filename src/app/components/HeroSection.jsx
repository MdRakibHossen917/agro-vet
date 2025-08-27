import React from "react";
import heroImage from "../../assets/Hero.jpg";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row items-center bg-gray-50 px-4 sm:px-6 md:px-16 lg:px-24 py-6">
      {/* Left side - Text content */}
      <div className="flex-1 max-w-xl md:pr-12 mt-6 md:mt-0 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-6 leading-tight">
          Trusted Agro-Vet Solutions for Healthy Livestock & Crops
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
          Providing high-quality veterinary medicines and agricultural products
          to boost your farm’s productivity and ensure the health of your
          animals. Discover innovative solutions designed for farmers and
          livestock owners.
        </p>
        <Link href={"/all-products"}>
          <button className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow transition">
            Explore Our Products
          </button>
        </Link>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 mt-15 w-full relative h-[400px] sm:h-[350px] md:h-[400px] lg:h-[550px] lg:mt-14">
        <Image
          src={heroImage}
          alt="Agro-Vet Medicine"
          fill
          className="object-cover rounded-lg shadow-lg"
          priority
        />
      </div>
    </section>
  );
}
