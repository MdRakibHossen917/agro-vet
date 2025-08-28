"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Spinner loader
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-sm mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md text-center">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">My Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={session.user?.image || "https://i.pravatar.cc/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full border shadow"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          value={session.user?.email || ""}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed dark:text-white text-center"
        />
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-4 w-full rounded-lg bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
