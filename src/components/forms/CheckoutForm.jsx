"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CheckoutForm({ data }) {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    price: data?.price || "",
    title: data?.title || "",
    img: data?.img || "",
  });

  // Prefill from session and props
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: session.user.name || "",
        email: session.user.email || "",
        price: data?.price || prev.price,
        title: data?.title || prev.title,
        img: data?.img || prev.img,
      }));
    }
  }, [session, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending checkout data:", formData);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Server response:", result);
        toast.success("Order placed successfully!");
      } else {
        toast.error("Error submitting order");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error submitting order");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-colors duration-300">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
        Checkout Form
      </h2>

      {formData.img && (
        <div className="w-full h-48 relative rounded-lg overflow-hidden mb-6 shadow-md">
          <Image
            src={formData.img}
            alt={formData.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}

      <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">
        {formData.title || "Product"}
      </h3>
      <p className="mb-8 text-xl font-semibold text-blue-600 dark:text-blue-400">
        Price: ${formData.price || "0.00"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name (readonly) */}
        <div>
          <label
            htmlFor="fullName"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            readOnly
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
            rows={3}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
          >
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special requests?"
            rows={3}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-md transition duration-300"
        >
          Confirm & Pay
        </button>
      </form>
    </div>
  );
}
