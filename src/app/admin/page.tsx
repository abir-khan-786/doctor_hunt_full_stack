import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [doctorCount, appointmentCount, userCount, pendingCount] = await Promise.all([
    prisma.doctor.count(),
    prisma.appointment.count(),
    prisma.user.count(),
    prisma.appointment.count({ where: { status: "pending" } }),
  ]);

  const cards = [
    { label: "Doctors", value: doctorCount, href: "/admin/doctors" },
    { label: "Appointments", value: appointmentCount, href: "/admin/appointments" },
    { label: "Patients (users)", value: userCount, href: "/admin/users" },
    { label: "Pending bookings", value: pendingCount, href: "/admin/appointments" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Overview</h1>
      <p className="mt-1 text-sm text-slate-600">Admin-only controls for Doctor Hunt.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-200 transition-colors"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-slate-900">{c.value}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
