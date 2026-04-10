import { prisma } from "@/lib/prisma";
import { updateAppointmentStatus } from "../actions";

export const dynamic = "force-dynamic";

const statuses = ["pending", "confirmed", "cancelled"] as const;

export default async function AdminAppointmentsPage() {
  const rows = await prisma.appointment.findMany({
    orderBy: { scheduledAt: "desc" },
    include: { doctor: true, user: { select: { email: true, name: true } } },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">Appointments</h1>
      <p className="mt-1 text-sm text-slate-600">Update status for each booking.</p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[800px] w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Account</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                  {a.scheduledAt.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{a.patientName}</div>
                  <div className="text-xs text-slate-500">{a.email}</div>
                  <div className="text-xs text-slate-500">{a.phone}</div>
                </td>
                <td className="px-4 py-3 text-slate-700">{a.doctor.name}</td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  {a.user ? (
                    <>
                      {a.user.name}
                      <br />
                      {a.user.email}
                    </>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  <form action={updateAppointmentStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={a.id} />
                    <select
                      name="status"
                      defaultValue={a.status}
                      className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                    >
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-slate-500">No appointments yet.</p>
        )}
      </div>
    </div>
  );
}
