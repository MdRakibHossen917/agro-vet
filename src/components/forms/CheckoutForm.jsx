"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ data }) {
  const { data: session } = useSession();
  const router = useRouter();

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

    if (!session) {
      toast.error("You need to log in first!");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Order placed successfully!");
        router.push("/my-bookings");
      } else {
        toast.error("Error submitting order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting order");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Checkout
      </h2>

      {formData.img && (
        <div className="w-full h-52 relative rounded-xl overflow-hidden mb-6 shadow-md">
          <Image
            src={formData.img}
            alt={formData.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-xl"
            priority
          />
        </div>
      )}

      <div className="mb-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {formData.title || "Product"}
        </h3>
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Price: ${formData.price || "0.00"}
        </p>
      </div>

      {!session && (
        <p className="text-center text-red-500 font-medium mb-4">
          Please log in to place an order
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name & Email (readonly) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            readOnly
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-not-allowed"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
        />

        {/* Address */}
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
        />

        {/* Notes */}
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional Notes (optional)"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-bold text-white transition ${
            session
              ? "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500"
          }`}
        >
          {session ? "Confirm & Pay" : "Login to Order"}
        </button>
      </form>
    </div>
  );
}
