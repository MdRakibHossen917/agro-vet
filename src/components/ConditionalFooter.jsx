"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on login and register pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }
  
  return <Footer />;
}

