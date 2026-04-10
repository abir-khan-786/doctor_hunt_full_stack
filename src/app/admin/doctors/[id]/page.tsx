import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateDoctor } from "../../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditDoctorPage({ params }: Props) {
  const { id } = await params;
  const doctor = await prisma.doctor.findUnique({ where: { id } });
  if (!doctor) notFound();

  return (
    <div>
      <Link href="/admin/doctors" className="text-sm font-medium text-brand-700 hover:text-brand-800">
        ← Doctors
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">Edit doctor</h1>
      <form action={updateDoctor} className="mt-6 max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <input type="hidden" name="id" value={doctor.id} />
        <div>
          <label className="block text-xs font-medium text-slate-600">Name</label>
          <input
            name="name"
            required
            defaultValue={doctor.name}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Specialty</label>
          <input
            name="specialty"
            required
            defaultValue={doctor.specialty}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Image URL</label>
          <input
            name="imageUrl"
            type="url"
            defaultValue={doctor.imageUrl ?? ""}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600">Bio</label>
          <textarea
            name="bio"
            required
            rows={4}
            defaultValue={doctor.bio}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
