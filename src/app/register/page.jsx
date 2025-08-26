"use client";

import Image from "next/image";
import React, { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import SocialLogin from "../login/components/SocialLogin";
 

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();
      console.log("Registration success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side Image */}
      <div className="md:w-1/2 hidden md:block">
        <Image
          src="/login.jpg"
          width={400}
          height={280}
          alt="Register Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            Register
          </h2>

          <RegisterForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          {/* OR Divider */}
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            <span className="mx-3 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          </div>

          {/* NextAuth or alternate register button */}
           <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
}
