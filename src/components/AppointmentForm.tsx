"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Doctor } from "@prisma/client";

type Props = {
  doctors: Doctor[];
  initialDoctorId?: string;
  user: { name: string; email: string };
};

export function AppointmentForm({ doctors, initialDoctorId, user }: Props) {
  const defaultDoctor = useMemo(() => {
    if (initialDoctorId && doctors.some((d) => d.id === initialDoctorId)) {
      return initialDoctorId;
    }
    return doctors[0]?.id ?? "";
  }, [doctors, initialDoctorId]);

  const [doctorId, setDoctorId] = useState(defaultDoctor);
  const [patientName, setPatientName] = useState(user.name);
  const [phone, setPhone] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          patientName,
          phone,
          scheduledAt,
          reason,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ type: "err", text: data.error ?? "Request failed." });
        return;
      }
      setMessage({ type: "ok", text: `Booking received (reference: ${data.id}). Status: ${data.status}.` });
      setPhone("");
      setScheduledAt("");
      setReason("");
    } catch {
      setMessage({ type: "err", text: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  }

  if (doctors.length === 0) {
    return (
      <p className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        No doctors in the database. Run migrations and seed, then refresh.
      </p>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="rounded-xl border border-brand-100 bg-brand-50/80 px-4 py-3 text-sm text-slate-700">
        Signed in as <strong className="text-slate-900">{user.email}</strong>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Doctor</label>
        <select
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.specialty}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Full name (for visit)</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Phone</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Preferred time</label>
        <input
          type="datetime-local"
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Reason for visit (optional)</label>
        <textarea
          className="mt-1 min-h-[100px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message.text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`rounded-xl px-4 py-3 text-sm ${
              message.type === "ok"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-100"
                : "bg-red-50 text-red-900 border border-red-100"
            }`}
            role="status"
          >
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 disabled:opacity-60 transition-colors"
      >
        {loading ? "Submitting…" : "Confirm appointment"}
      </button>
    </motion.form>
  );
}

export function AppointmentGate() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
      <h2 className="font-display text-xl font-semibold text-slate-900">Sign in to book</h2>
      <p className="mt-2 text-sm text-slate-600">
        Appointments are tied to your account for security. Create an account or sign in to continue.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/sign-in?callbackUrl=/appointments"
          className="inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-200"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
