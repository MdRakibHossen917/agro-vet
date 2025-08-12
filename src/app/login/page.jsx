"use client";

import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import SocialLogin from "./components/SocialLogin";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      toast.error("Login failed: " + result.error);
    } else {
      toast.success("Login successful!");
      router.push("/");
      setForm({ email: "", password: "" });
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <Image
            src="/login.jpg"
            width={400}
            height={280}
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700">
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

            {/* OR Divider */}
            <div className="my-6 flex items-center">
              <hr className="flex-grow border-gray-300 dark:border-gray-700" />
              <span className="mx-3 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            </div>

            {/* NextAuth or alternate login button */}
       <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
}
