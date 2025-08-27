"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const navData = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>

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
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow-md"
          >
            {navData}
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
  );
}
