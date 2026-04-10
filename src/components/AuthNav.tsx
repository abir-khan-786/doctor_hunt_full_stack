"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AuthNav() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function signOut() {
    await authClient.signOut();
    router.refresh();
  }

  if (isPending) {
    return <span className="h-9 w-20 animate-pulse rounded-full bg-slate-100" aria-hidden />;
  }

  if (session?.user) {
    const role = (session.user as { role?: string }).role;
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/dashboard"
          className="rounded-full px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 sm:px-3 sm:text-sm"
        >
          Dashboard
        </Link>
        {role === "admin" && (
          <Link
            href="/admin"
            className="rounded-full bg-slate-900 px-2 py-1.5 text-xs font-medium text-white hover:bg-slate-800 sm:px-3 sm:text-sm"
          >
            Admin
          </Link>
        )}
        <span className="hidden max-w-[100px] truncate text-sm text-slate-600 md:inline" title={session.user.email}>
          {session.user.name}
        </span>
        <button
          type="button"
          onClick={() => void signOut()}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors"
      >
        Sign in
      </Link>
      <Link
        href="/sign-up"
        className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-800 hover:border-brand-200 hover:bg-brand-50/50 transition-colors"
      >
        Sign up
      </Link>
    </div>
  );
}
