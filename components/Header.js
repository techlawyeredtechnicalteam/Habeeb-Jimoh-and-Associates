"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-50 sticky top-0 z-20 text-[#434343] shadow-lg py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        {/* Logo and Name */}
        <div className="relative flex items-center w-32 h-10 md:w-48 md:h-16">
          <Image
            src="/logo.png"
            alt="Habeeb-Jimoh & Associates Logo"
            fill
            className="object-cover"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="font-semibold">
            Home
          </Link>
          {["About", "Attorneys", "Practice Areas", "Blog", "Contact"].map(
            (item, idx) => (
              <Link
                key={idx}
                href={
                  item === "Practice Areas"
                    ? "/#practice-areas"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className="relative group font-semibold tracking-wide hover:text-[#B7860D] transition-colors"
              >
                {item}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-blue-950 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4 py-4 bg-gray-50 rounded-lg text-[#434343] space-y-4 transition-all">
          <Link href="/" className="font-semibold block">
            Home
          </Link>
          {["About", "Attorneys", "Practice Areas", "Blog", "Contact"].map(
            (item, idx) => (
              <Link
                key={idx}
                href={
                  item === "Practice Areas"
                    ? "/#practice-areas"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                className="block font-semibold hover:text-[#B7860D] transition-colors"
              >
                {item}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
