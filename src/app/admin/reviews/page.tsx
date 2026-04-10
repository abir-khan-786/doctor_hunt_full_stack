import { prisma } from "@/lib/prisma";
import { deleteReview } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { doctor: { select: { name: true } } },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Reviews</h1>
      <p className="mt-1 text-sm text-slate-600">Remove inappropriate or test reviews.</p>
      <div className="mt-6 space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <p className="text-sm text-slate-800">&ldquo;{r.comment}&rdquo;</p>
              <p className="mt-2 text-xs text-slate-500">
                {r.patientName} · {r.rating}/5
                {r.doctor ? ` · ${r.doctor.name}` : ""}
              </p>
            </div>
            <form action={deleteReview}>
              <input type="hidden" name="id" value={r.id} />
              <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
                Delete
              </button>
            </form>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-sm text-slate-500">No reviews.</p>}
      </div>
    </div>
  );
}
