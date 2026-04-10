"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export type CarouselReviewItem = {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  doctorName?: string | null;
  avatarUrl: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-amber-400" : "text-slate-200"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsCarousel({
  items,
  autoMs = 5000,
}: {
  items: CarouselReviewItem[];
  autoMs?: number;
}) {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  useEffect(() => {
    if (safeItems.length <= 1) return;
    const t = setInterval(() => {
      setDir(1);
      setIdx((v) => (v + 1) % safeItems.length);
    }, autoMs);
    return () => clearInterval(t);
  }, [autoMs, safeItems.length]);

  if (safeItems.length === 0) return null;

  const current = safeItems[idx]!;

  function prev() {
    setDir(-1);
    setIdx((v) => (v - 1 + safeItems.length) % safeItems.length);
  }

  function next() {
    setDir(1);
    setIdx((v) => (v + 1) % safeItems.length);
  }

  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="text-sm font-semibold text-slate-900">Patient review</div>
        {safeItems.length > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              aria-label="Previous review"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
              aria-label="Next review"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>

      <div className="overflow-hidden p-5 sm:p-6">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.blockquote
            key={current.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-2 ring-white shadow-sm">
                <Image src={current.avatarUrl} alt={`${current.patientName} (reviewer)`} fill className="object-cover" sizes="56px" />
              </div>
              <div className="min-w-0 flex-1">
                <Stars rating={current.rating} />
                <p className="mt-3 text-slate-800 leading-relaxed">&ldquo;{current.comment}&rdquo;</p>
              </div>
            </div>
            <footer className="border-t border-slate-100 pt-4 text-sm text-slate-500">
              — {current.patientName}
              {current.doctorName ? <span className="text-slate-400"> · {current.doctorName}</span> : null}
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        {safeItems.length > 1 ? (
          <div className="mt-5 flex justify-center gap-2">
            {safeItems.map((it, i) => (
              <button
                key={it.id}
                type="button"
                onClick={() => {
                  setDir(i > idx ? 1 : -1);
                  setIdx(i);
                }}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === idx ? "bg-brand-600" : "bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

