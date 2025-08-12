import React from "react";
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
  },
  {
    title: "Animal Vaccination",
    description:
      "Protect your livestock with our comprehensive vaccination programs that prevent common and dangerous animal diseases.",
    img: AnimalVaccination,
  },
  {
    title: "Farm Equipment Supply",
    description:
      "Get reliable, high-quality farming tools and equipment that boost your farm’s efficiency and productivity.",
    img: FarmEquipmentSupply,
  },
  {
    title: "Animal Nutrition Planning",
    description:
      "Customized feeding plans designed by experts to improve the health, growth, and yield of your animals.",
    img: AnimalNutritionPlanning,
  },
];

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Our Expert Services
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Comprehensive solutions tailored to support your farm’s health and
          productivity.
        </p>
      </div>

      {/* Services List */}
      {services.map((service, index) => {
        const isEven = index % 2 === 1;
        return (
          <div
            key={service.title}
            className={`flex flex-col md:flex-row items-center md:space-x-10 ${
              isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
              <img
                src={service.img.src || service.img}
                alt={service.title}
                className="w-full h-72 object-cover"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {service.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
