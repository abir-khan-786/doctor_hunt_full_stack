import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { doctorFallbackImages } from "@/lib/section-images";
import type { Doctor } from "@prisma/client";

export function DoctorsSection({ doctors }: { doctors: Doctor[] }) {
  return (
    <section id="doctors" className="border-t border-slate-100 bg-slate-50/80 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Doctors</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Featured caregivers
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Pulled live from PostgreSQL. Booking links route to the appointment flow with your selection ready.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {doctors.map((d, i) => (
            <FadeIn key={d.id} delay={i * 0.06}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  <Image
                    src={d.imageUrl ?? doctorFallbackImages[i % doctorFallbackImages.length]}
                    alt={`Portrait of ${d.name}, ${d.specialty}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{d.name}</h3>
                  <p className="text-sm font-medium text-brand-700">{d.specialty}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{d.bio}</p>
                  <Link
                    href={`/appointments?doctorId=${encodeURIComponent(d.id)}`}
                    className="mt-6 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Book with {d.name.split(" ").slice(1).join(" ") || d.name} →
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        {doctors.length === 0 && (
          <p className="mt-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            No doctors yet — run{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs">npm run db:push</code> and{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs">npm run db:seed</code>.
          </p>
        )}
      </div>
    </section>
  );
}
