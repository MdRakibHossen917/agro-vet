"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  const handleGoogleLogin = async () => {
    await signIn("google", {
      redirect: true,  
      callbackUrl: "/",  
    });
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
