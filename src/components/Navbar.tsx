"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={48} />
          <span className="text-xl font-bold tracking-wider text-neon-pink glow-pink">
            MOOSEPHONE
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#features" className="text-sm text-gray-300 transition-colors hover:text-neon-cyan">
            Features
          </Link>
          <Link href="/#pricing" className="text-sm text-gray-300 transition-colors hover:text-neon-cyan">
            Pricing
          </Link>
          <Link href="/configure" className="btn-neon rounded-lg text-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-neon-pink transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-neon-pink transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-neon-pink transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-dark-border bg-dark-bg/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/#features" className="text-gray-300 hover:text-neon-cyan" onClick={() => setMenuOpen(false)}>
              Features
            </Link>
            <Link href="/#pricing" className="text-gray-300 hover:text-neon-cyan" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/configure" className="btn-neon inline-block rounded-lg text-center text-sm" onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
