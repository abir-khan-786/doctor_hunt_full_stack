"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthNav } from "@/components/AuthNav";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/75 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-slate-900">
          Doctor<span className="text-brand-600">Hunt</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600 sm:gap-6">
          <Link href="/#how" className="hover:text-brand-700 transition-colors hidden sm:inline">
            How it works
          </Link>
          <Link href="/#doctors" className="hover:text-brand-700 transition-colors hidden sm:inline">
            Doctors
          </Link>
          <Link href="/#reviews" className="hover:text-brand-700 transition-colors hidden sm:inline">
            Reviews
          </Link>
          <AuthNav />
          <Link
            href="/appointments"
            className="rounded-full bg-brand-600 px-4 py-2 text-white shadow-sm shadow-brand-600/20 hover:bg-brand-700 transition-colors"
          >
            Book visit
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
