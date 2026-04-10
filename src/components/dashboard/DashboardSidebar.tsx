import Link from "next/link";
import type { AuthUser } from "@/lib/guards";

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/review", label: "Reviews" },
] as const;

export function DashboardSidebar({ user }: { user: AuthUser }) {
  return (
    <aside className="shrink-0 lg:w-56">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-500">Account</p>
        <p className="mt-1 truncate font-display text-sm font-semibold text-slate-900">{user.name}</p>
        <p className="truncate text-xs text-slate-500">{user.email}</p>
        <nav className="mt-4 space-y-1 border-t border-slate-100 pt-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/appointments"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            Book visit →
          </Link>
          {user.role === "admin" && (
            <Link
              href="/admin"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              Admin panel →
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
}
