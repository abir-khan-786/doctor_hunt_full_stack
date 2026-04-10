import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { createUserReview } from "../actions";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
    const user = await requireUser("/dashboard/review");

    const [doctors, myReviews] = await Promise.all([
        prisma.doctor.findMany({
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true,
                specialty: true,
            },
        }),
        prisma.review.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: 50,
            include: {
                doctor: {
                    select: {
                        name: true,
                    },
                },
            },
        }),
    ]);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">Reviews</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Share feedback after a visit. Your name on the review matches your profile.
                </p>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-slate-900">Write a review</h2>

                <form action={createUserReview} className="mt-4 max-w-lg space-y-4">
                    <div>
                        <label htmlFor="doctorId" className="block text-sm font-medium text-slate-700">
                            Doctor (optional)
                        </label>
                        <select
                            id="doctorId"
                            name="doctorId"
                            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                        >
                            <option value="">General / no specific doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name} — {doctor.specialty}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-slate-700">
                            Rating
                        </label>
                        <select
                            id="rating"
                            name="rating"
                            required
                            defaultValue="5"
                            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                        >
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <option key={rating} value={rating}>
                                    {rating} star{rating > 1 ? "s" : ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-slate-700">
                            Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            required
                            rows={4}
                            placeholder="What went well? What could improve?"
                            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                        Submit review
                    </button>
                </form>
            </section>

            <section>
                <h2 className="font-display text-lg font-semibold text-slate-900">Your reviews</h2>

                {myReviews.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-500">
                        You have not submitted any reviews yet.
                    </p>
                ) : (
                    <div className="mt-4 space-y-3">
                        {myReviews.map((review) => (
                            <article
                                key={review.id}
                                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span
                                        className="text-amber-500"
                                        aria-label={`${review.rating} out of 5 stars`}
                                    >
                                        {"★".repeat(review.rating)}
                                        <span className="text-slate-200">
                                            {"★".repeat(5 - review.rating)}
                                        </span>
                                    </span>

                                    <time
                                        className="text-xs text-slate-500"
                                        dateTime={review.createdAt.toISOString()}
                                    >
                                        {new Intl.DateTimeFormat("en-BD", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }).format(review.createdAt)}
                                    </time>
                                </div>

                                <p className="mt-2 text-sm text-slate-800">{review.comment}</p>

                                <p className="mt-2 text-xs text-slate-500">
                                    {review.doctor ? `About ${review.doctor.name}` : "General feedback"}
                                </p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}