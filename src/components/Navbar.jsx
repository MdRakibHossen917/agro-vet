"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const searchUrl = `/all-products?search=${encodeURIComponent(trimmedQuery)}`;
      router.push(searchUrl);
      setSearchQuery(""); // Clear search after submit
    }
  };

  const navData = (
    <>
      <li>
        <Link href="/all-products">Products</Link>
      </li>
      <li>
        <Link href="/all-articles">Articles</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/my-bookings">My Bookings</Link>
      </li>
      <li>
        <Link href="/profile">My Profile</Link>
      </li>
    </>
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: isScrolled ? "#1D232A" : "#F9FAFB",
        color: isScrolled ? "#FFFFFF" : "#1D232A",
      }}
    >
      <div className="navbar w-11/12 mx-auto">
      {/* Left side */}
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box mt-3 w-56 p-2 shadow-md"
            style={{
              backgroundColor: isScrolled ? "#1D232A" : "#F9FAFB",
              color: isScrolled ? "#FFFFFF" : "#1D232A",
            }}
          >
            {navData}
            {/* Mobile Search */}
            <div className="mt-2 border-t pt-2">
              <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
                  style={{
                    backgroundColor: isScrolled ? "#FFFFFF" : "#FFFFFF",
                    color: isScrolled ? "#1D232A" : "#1D232A",
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-square btn-sm bg-green-600 hover:bg-green-700 text-white border-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            </div>
            <div className="mt-2 border-t pt-2">
              {status === "authenticated" ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="btn btn-outline w-full"
                >
                  Log Out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login" className="btn btn-primary w-full">
                    Login
                  </Link>
                  <Link href="/register" className="btn btn-secondary w-full">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Rampart Power
        </Link>
      </div>

      {/* Center - Desktop & Tablet menu */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-4">{navData}</ul>
      </div>

      {/* Search Bar - Desktop */}
      <div className="navbar-center hidden lg:flex">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-64 pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{
                backgroundColor: isScrolled ? "#FFFFFF" : "#FFFFFF",
                color: isScrolled ? "#1D232A" : "#1D232A",
              }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Right side - Auth buttons */}
      <div className="navbar-end hidden md:flex gap-3">
        {status === "authenticated" ? (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="btn btn-outline"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link href="/login" className="btn">
              Login
            </Link>
            <Link href="/register" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
      </div>
    </div>
  );
}
