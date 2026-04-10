import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { sectionImages } from "@/lib/section-images";

const items = [
  {
    title: "Transparent profiles",
    body: "Specialty, focus areas, and bios so you pick with context—not guesswork.",
    image: sectionImages.features[0],
    alt: "Doctor reviewing medical information with a patient",
  },
  {
    title: "Guided scheduling",
    body: "Pick a doctor, time, and reason for visit. We keep the form tight and human.",
    image: sectionImages.features[1],
    alt: "Calendar and planning for a medical appointment",
  },
  {
    title: "Reviews you can trust",
    body: "Patient feedback is stored in PostgreSQL and shown where it helps most.",
    image: sectionImages.features[2],
    alt: "Person sharing positive feedback",
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-slate-100 bg-white/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Why Doctor Hunt</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything you need for a calm first booking
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            This MVP pairs a polished front-of-house experience with a real database backing doctors,
            appointments, and reviews.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 shadow-sm">
                <div className="relative aspect-[16/10] w-full shrink-0 bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold text-brand-800">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
