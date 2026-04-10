import Link from "next/link";
import { headers } from "next/headers";
import { AppointmentForm, AppointmentGate } from "@/components/AppointmentForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ doctorId?: string }>;
};

export default async function AppointmentsPage({ searchParams }: PageProps) {
  const { doctorId: doctorIdParam } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });

  let doctors: Awaited<ReturnType<typeof prisma.doctor.findMany>> = [];
  try {
    doctors = await prisma.doctor.findMany({ orderBy: { name: "asc" } });
  } catch {
    doctors = [];
  }

  return (
    <main className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="text-sm font-medium text-brand-700 hover:text-brand-800">
          ← Back home
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">Book a visit</h1>
        <p className="mt-2 text-slate-600">
          Choose a doctor and slot. Your request is stored as <strong>pending</strong> until staff confirms.
        </p>
        <div className="mt-10">
          {session?.user ? (
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <AppointmentForm
                key={doctorIdParam ?? "default"}
                doctors={doctors}
                initialDoctorId={doctorIdParam}
                user={{ name: session.user.name, email: session.user.email }}
              />
            </div>
          ) : (
            <AppointmentGate />
          )}
        </div>
      </div>
    </main>
  );
}
