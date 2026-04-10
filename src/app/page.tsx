import { HomePageView } from "@/components/home/HomePageView";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getHomeData() {
  try {
    const [doctors, reviews] = await Promise.all([
      prisma.doctor.findMany({ orderBy: { name: "asc" } }),
      prisma.review.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { doctor: true },
      }),
    ]);
    return { doctors, reviews, dbOk: true as const };
  } catch {
    return { doctors: [], reviews: [], dbOk: false as const };
  }
}

export default async function HomePage() {
  const data = await getHomeData();
  return <HomePageView {...data} />;
}
