"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sectionImages } from "@/lib/section-images";

export function CtaSection() {
  return (
    <section id="cta" className="border-t border-slate-100 px-4 pb-20 pt-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl shadow-xl shadow-brand-900/20"
        >
          <div className="absolute inset-0">
            <Image
              src={sectionImages.cta}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-700/95 via-emerald-800/90 to-teal-900/95" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
          </div>
          <div className="relative px-8 py-14 text-center sm:px-14">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Ready when you are</h2>
            <p className="mx-auto mt-4 max-w-xl text-emerald-50">
              Book a demo appointment, inspect the API responses, and extend the Prisma models as your product
              grows.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/appointments"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-md hover:bg-emerald-50 transition-colors"
              >
                Start booking
              </Link>
              <a
                href="https://www.postgresql.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Why PostgreSQL?
              </a>
            </div>
          </div>
        </motion.div>
        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Doctor Hunt MVP</p>
          <div className="flex gap-6">
            <Link href="/#features" className="hover:text-slate-800">
              Features
            </Link>
            <Link href="/appointments" className="hover:text-slate-800">
              Appointments
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
