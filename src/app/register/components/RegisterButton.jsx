"use client";

import React from "react";
import Link from "next/link";

export default function RegisterButton() {
  return (
    <Link
      href="/register"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
    >
      Registe 
    </Link>
  );
}
