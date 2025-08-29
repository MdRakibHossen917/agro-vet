"use client";
import React, { useEffect, useRef, useState } from "react";
import VeterinaryConsultation from "../../assets/Services/female-farmer-taking-care-cow.jpg";
import AnimalVaccination from "../../assets/Services/veterinary-cowshed-with-jug-milk.jpg";
import FarmEquipmentSupply from "../../assets/Services/veterinarian-protective-clothes-holding-bottle-with-medicine-pig-farm.jpg";
import AnimalNutritionPlanning from "../../assets/Services/veterinary-farm-walking-cowshed-checking-cows.jpg";

const services = [
  {
    title: "Veterinary Consultation",
    description:
      "Receive expert advice and thorough examinations from our certified veterinarians to ensure your animals stay healthy and productive.",
    img: VeterinaryConsultation,
    wiki: "https://en.wikipedia.org/wiki/Veterinary_medicine",
  },
  {
    title: "Animal Vaccination",
    description:
      "Protect your livestock with our comprehensive vaccination programs that prevent common and dangerous animal diseases.",
    img: AnimalVaccination,
    wiki: "https://en.wikipedia.org/wiki/Vaccination_of_animals",
  },
  {
    title: "Farm Equipment Supply",
    description:
      "Get reliable, high-quality farming tools and equipment that boost your farm's efficiency and productivity.",
    img: FarmEquipmentSupply,
    wiki: "https://en.wikipedia.org/wiki/Agricultural_machinery",
  },
  {
    title: "Animal Nutrition Planning",
    description:
      "Customized feeding plans designed by experts to improve the health, growth, and yield of your animals.",
    img: AnimalNutritionPlanning,
    wiki: "https://en.wikipedia.org/wiki/Animal_nutrition",
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

function ServiceItem({ service, index, isEven }) {
  const ref = useRef();
  const isVisible = useOnScreen(ref, "-100px");

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center md:space-x-10  ${
        isEven ? "md:flex-row-reverse" : ""
      } service-item ${isVisible ? "animate-in" : ""}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Image */}
      <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-2xl image-container">
        <img
          src={service.img.src || service.img}
          alt={service.title}
          className="w-full h-72 md:h-96 object-cover"
        />
      </div>

      {/* Text */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 text-container">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
          {service.title}
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg md:text-xl mb-6">
          {service.description}
        </p>
        <a
          href={service.wiki}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const headerRef = useRef();
  const isHeaderVisible = useOnScreen(headerRef, "-100px");

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 shadow-2xl">
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`text-center max-w-3xl mx-auto mb-16 ${
          isHeaderVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Our Expert <span className="text-green-600">Services</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Comprehensive solutions tailored to support your farm's health and
          productivity.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-20 ">
        {services.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <ServiceItem
              key={service.title}
              service={service}
              index={index}
              isEven={isEven}
            />
          );
        })}
      </div>

      {/* Animations & Hover effects */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
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

        .service-item {
          opacity: 0;
        }

        .service-item.animate-in {
          animation: fadeInUp 0.8s forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s forwards;
        }

        .image-container {
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.7s ease-out;
        }

        .service-item.animate-in .image-container {
          opacity: 1;
          transform: scale(1);
        }

        .text-container {
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.7s ease-out;
        }

        .service-item.animate-in .text-container {
          opacity: 1;
          transform: translateX(0);
        }

        /* Hover effects */
        .image-container:hover {
          transform: scale(1.02) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .service-item.animate-in .text-container {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}
