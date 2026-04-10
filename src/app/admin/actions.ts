"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function assertAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function updateAppointmentStatus(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const allowed = ["pending", "confirmed", "cancelled"];
  if (!id || !allowed.includes(status)) return;
  await prisma.appointment.update({ where: { id }, data: { status } });
  revalidatePath("/admin/appointments");
  revalidatePath("/dashboard");
}

export async function createDoctor(formData: FormData) {
  await assertAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const specialty = String(formData.get("specialty") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  if (!name || !specialty || !bio) return;
  await prisma.doctor.create({ data: { name, specialty, bio, imageUrl } });
  revalidatePath("/admin/doctors");
  revalidatePath("/");
}

export async function updateDoctor(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const specialty = String(formData.get("specialty") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  if (!id || !name || !specialty || !bio) return;
  await prisma.doctor.update({
    where: { id },
    data: { name, specialty, bio, imageUrl },
  });
  revalidatePath("/admin/doctors");
  revalidatePath(`/admin/doctors/${id}`);
  revalidatePath("/");
}

export async function deleteDoctor(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  await prisma.doctor.delete({ where: { id } });
  revalidatePath("/admin/doctors");
  revalidatePath("/");
}

export async function deleteReview(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function setUserRole(formData: FormData) {
  await assertAdmin();
  const userId = String(formData.get("userId") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  if (!userId || (role !== "user" && role !== "admin")) return;
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
}
