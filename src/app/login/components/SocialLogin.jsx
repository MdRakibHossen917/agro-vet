"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
    if (!result?.error) {
      router.push("/");
    } else {
      alert("Login failed: " + result.error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 btn text-white py-2 rounded-md font-semibold"
    >
      <FcGoogle size={24} />
      Continue with Google
    </button>
  );
}
