import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-2">
            Rampart Power Bangladesh Ltd.
          </h2>
          <p>© 2025 All rights reserved.</p>
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul>
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p>Phone: +8801300981501</p>
          <p>Email: mdrakibhossencse.com</p>
          <div className="flex space-x-4 mt-2">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Facebook
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Twitter
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
