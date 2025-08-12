"use client";
import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginForm({ form, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700">
        <FaEnvelope className="text-gray-400 mr-3" />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Password */}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700">
        <FaLock className="text-gray-400 mr-3" />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-semibold"
      >
        Login
      </button>
    </form>
  );
}
