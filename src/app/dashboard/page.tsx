import Link from "next/link";
import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  const appointments = await prisma.appointment.findMany({
    where: { userId: user.id },
    orderBy: { scheduledAt: "desc" },
    include: { doctor: { select: { name: true, specialty: true } } },
    take: 50,
  });

  return (
    <div>
      <div className="max-w-3xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900">Your dashboard</h1>
            <p className="mt-1 text-slate-600">
              Signed in as <span className="font-medium text-slate-900">{user.email}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Admin panel
              </Link>
            )}
            <Link
              href="/appointments"
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Book visit
            </Link>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-slate-900">Your appointments</h2>
          <div className="mt-4 space-y-3">
            {appointments.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-900">{a.doctor.name}</p>
                    <p className="text-sm text-slate-500">{a.doctor.specialty}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {a.scheduledAt.toLocaleString()} · {a.patientName}
                    </p>
                    {a.reason ? (
                      <p className="mt-1 text-sm text-slate-500">Reason: {a.reason}</p>
                    ) : null}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      a.status === "confirmed"
                        ? "bg-emerald-100 text-emerald-800"
                        : a.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {appointments.length === 0 && (
            <p className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
              No bookings yet.{" "}
              <Link href="/appointments" className="font-semibold text-brand-700 hover:text-brand-800">
                Book a visit
              </Link>
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
