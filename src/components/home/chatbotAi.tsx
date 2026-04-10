"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

const cases = [
  {
    title: "Chest discomfort + fatigue",
    confidence: 86,
    specialty: "Cardiology",
    urgency: "Priority in 24 hours",
    reason:
      "Pattern suggests heart-health follow-up is more relevant than a general visit.",
  },
  {
    title: "Child fever + cough",
    confidence: 91,
    specialty: "Pediatrics",
    urgency: "Same day if symptoms worsen",
    reason:
      "Age-based triage leans pediatric care first, with monitoring advice for parents.",
  },
  {
    title: "Rash + skin irritation",
    confidence: 88,
    specialty: "Dermatology",
    urgency: "Routine booking",
    reason:
      "Symptoms align more closely with skin specialist review than urgent care.",
  },
] as const;

export function ChatbotAi() {
  return (
    <section id="ai-prediction" className="border-t border-slate-100 bg-slate-50/70 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">AI prediction demo</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Smart case prediction before booking
            </h2>
            <p className="mt-4 text-slate-600">
              This demo shows how Doctor Hunt can guide users toward the most relevant specialist
              based on symptom patterns. It is a product-style preview, not a medical diagnosis.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Prediction engine</p>
                  <p className="mt-1 font-display text-xl font-semibold text-slate-900">
                    Symptom-to-specialist matching
                  </p>
                </div>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                  Demo AI
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {cases.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.reason}</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                        {item.confidence}% match
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-slate-100">
                        <p className="text-xs uppercase tracking-wide text-slate-500">Best specialty</p>
                        <p className="mt-1 font-semibold text-brand-700">{item.specialty}</p>
                      </div>
                      <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-slate-100">
                        <p className="text-xs uppercase tracking-wide text-slate-500">Recommended timing</p>
                        <p className="mt-1 font-semibold text-slate-900">{item.urgency}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 p-6 text-white shadow-xl sm:p-8">
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-300">
                Example patient flow
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold">
                Ask, predict, suggest, then book
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  "User enters symptoms in chatbot",
                  "AI estimates likely specialty and urgency",
                  "Doctor Hunt suggests the best available doctor",
                  "Patient books directly from the recommendation",
                ].map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-sm font-bold text-emerald-200">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-200">{step}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                Prediction output should be treated as guidance only. Final decisions must come from
                licensed healthcare professionals.
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}