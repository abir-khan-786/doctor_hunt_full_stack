import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { sectionImages } from "@/lib/section-images";

const steps = [
  {
    step: "01",
    title: "Browse & compare",
    detail: "Scan specialties and short bios to shortlist doctors.",
    image: sectionImages.howItWorks[0],
    alt: "Medical team in a hospital corridor",
  },
  {
    step: "02",
    title: "Choose a slot",
    detail: "Select a time that fits—no endless calendar hunting.",
    image: sectionImages.howItWorks[1],
    alt: "Peaceful wellness and scheduling moment",
  },
  {
    step: "03",
    title: "Confirm & arrive",
    detail: "Get a clear summary; your visit is tracked as pending → confirmed.",
    image: sectionImages.howItWorks[2],
    alt: "Modern hospital reception area",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="how" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Three calm steps to care
          </h2>
        </FadeIn>
        <ol className="mt-12 space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.06}>
              <li className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-stretch sm:gap-6 sm:p-6">
                <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-auto sm:w-44 sm:min-h-[140px]">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 176px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 sm:flex-row sm:items-center sm:gap-6">
                  <span className="font-display text-3xl font-bold text-brand-500 sm:w-14 sm:shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-slate-600">{s.detail}</p>
                  </div>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
