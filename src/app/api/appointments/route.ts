import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required to book." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const patientName = String(body.patientName ?? "").trim() || session.user.name;
    const phone = String(body.phone ?? "").trim();
    const doctorId = String(body.doctorId ?? "").trim();
    const scheduledAtRaw = String(body.scheduledAt ?? "").trim();
    const reason = body.reason != null ? String(body.reason).trim() : "";
    const email = session.user.email;

    if (!phone || !doctorId || !scheduledAtRaw) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const scheduledAt = new Date(scheduledAtRaw);
    if (Number.isNaN(scheduledAt.getTime())) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }

    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found." }, { status: 404 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: session.user.id,
        patientName,
        email,
        phone,
        doctorId,
        scheduledAt,
        reason: reason || null,
        status: "pending",
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");
    revalidatePath("/admin/appointments");

    return NextResponse.json({ id: appointment.id, status: appointment.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not create appointment." }, { status: 500 });
  }
}
