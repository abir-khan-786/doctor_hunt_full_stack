import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { sectionImages } from "@/lib/section-images";
import { ReviewsCarousel, type CarouselReviewItem } from "@/components/home/ReviewsCarousel";

type ReviewWithDoctor = {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  doctor: { name: string } | null;
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

export function ReviewsSection({ reviews }: { reviews: ReviewWithDoctor[] }) {
  const carouselItems: CarouselReviewItem[] = reviews.map((r, i) => ({
    id: r.id,
    patientName: r.patientName,
    rating: r.rating,
    comment: r.comment,
    doctorName: r.doctor?.name ?? null,
    avatarUrl: sectionImages.reviews[i % sectionImages.reviews.length],
  }));

  return (
    <section id="reviews" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Patient reviews</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                Voices from real visits
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                Stored in your database and rendered server-side for fast first paint—animations kick in on scroll.
              </p>
            </div>
            <div className="relative hidden aspect-[16/10] max-h-56 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-sm lg:block">
              <Image
                src={sectionImages.features[2]}
                alt="Happy patient after a positive care experience"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <ReviewsCarousel items={carouselItems} />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/70 p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Quick highlights</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-800 text-xs font-bold">
                    1
                  </span>
                  <span>Reviews are stored in PostgreSQL and show instantly on the home page.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-800 text-xs font-bold">
                    2
                  </span>
                  <span>Users can submit reviews from their dashboard (with a doctor or general).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-800 text-xs font-bold">
                    3
                  </span>
                  <span>Slider auto-plays and supports next/prev + dots.</span>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-slate-100">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Average rating</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="font-display text-3xl font-semibold text-slate-900">
                    {reviews.length
                      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                      : "—"}
                  </div>
                  <div className="text-sm text-slate-600">
                    {reviews.length ? (
                      <span className="text-slate-500">Based on {reviews.length} reviews</span>
                    ) : (
                      <span className="text-slate-500">No reviews yet</span>
                    )}
                  </div>
                </div>
                {reviews.length ? (
                  <div className="mt-2">
                    <Stars
                      rating={Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </FadeIn>
        </div>
        {reviews.length === 0 && (
          <p className="mt-8 text-sm text-slate-600">
            No reviews yet. Seed the database to see this section shine.
          </p>
        )}
      </div>
    </section>
  );
}
