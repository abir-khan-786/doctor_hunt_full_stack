"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sectionImages } from "@/lib/section-images";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-emerald-100/80 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-4 inline-flex rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-xs font-medium text-brand-800 shadow-sm">
            MVP · Appointments powered by PostgreSQL
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Hunt less.
            <span className="block text-brand-600">Heal smarter.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Compare doctors, skim real patient reviews, and lock in a visit in a few guided steps —
            built for clarity, not clutter.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 transition-colors"
            >
              Book an appointment
            </Link>
            <Link
              href="/#reviews"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-brand-200 hover:bg-brand-50/50 transition-colors"
            >
              Read patient stories
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:max-w-none"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-100/80 to-emerald-100/40 ring-1 ring-slate-200/60" />
          <Image
            src={sectionImages.hero}
            alt="Healthcare professional consulting with a patient in a modern clinic"
            fill
            className="rounded-3xl object-cover shadow-xl shadow-slate-900/10"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-full grid gap-4 sm:grid-cols-3"
        >
          {[
            { label: "Avg. booking time", value: "Under 2 min" },
            { label: "Specialties in demo", value: "3+" },
            { label: "Reviews surfaced", value: "Live DB" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm shadow-slate-200/40 backdrop-blur"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
