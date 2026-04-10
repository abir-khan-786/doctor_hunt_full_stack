import type { Doctor, Review } from "@prisma/client";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { CtaSection } from "@/components/home/CtaSection";

type ReviewWithDoctor = Review & { doctor: Doctor | null };

type Props = {
  doctors: Doctor[];
  reviews: ReviewWithDoctor[];
  dbOk: boolean;
};

export function HomePageView({ doctors, reviews, dbOk }: Props) {
  return (
    <main>
      {!dbOk && (
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Database unavailable — add <code className="rounded bg-white px-1">.env</code> with{" "}
            <code className="rounded bg-white px-1">DATABASE_URL</code>, then run{" "}
            <code className="rounded bg-white px-1">npm run db:push</code> and{" "}
            <code className="rounded bg-white px-1">npm run db:seed</code>.
          </p>
        </div>
      )}
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DoctorsSection doctors={doctors} />
      <ReviewsSection reviews={reviews} />
      <CtaSection />
    </main>
  );
}
