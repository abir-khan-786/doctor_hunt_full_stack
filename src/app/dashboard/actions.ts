"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guards";

export async function updateProfile(formData: FormData) {
  await requireUser("/dashboard/profile");
  const name = String(formData.get("name") ?? "").trim();
  const imageRaw = String(formData.get("image") ?? "").trim();
  const image = imageRaw === "" ? null : imageRaw;

  if (!name) return;

  await auth.api.updateUser({
    headers: await headers(),
    body: { name, image },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
}

export async function createUserReview(formData: FormData) {
  const user = await requireUser("/dashboard/review");
  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") ?? "").trim();
  const doctorIdRaw = String(formData.get("doctorId") ?? "").trim();
  const doctorId = doctorIdRaw === "" ? null : doctorIdRaw;

  if (!comment || !Number.isInteger(rating) || rating < 1 || rating > 5) return;

  if (doctorId) {
    const doc = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doc) return;
  }

  await prisma.review.create({
    data: {
      patientName: user.name,
      rating,
      comment,
      doctorId,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard/review");
  revalidatePath("/");
}
