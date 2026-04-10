import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
};

export async function getSessionUser(): Promise<AuthUser | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  const u = session.user as AuthUser;
  return u;
}

export async function requireUser(callbackUrl = "/dashboard"): Promise<AuthUser> {
  const user = await getSessionUser();
  if (!user) redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in?callbackUrl=/admin");
  if (user.role !== "admin") redirect("/dashboard");
  return user;
}
