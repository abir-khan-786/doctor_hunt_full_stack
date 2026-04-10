import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/doctors", label: "Doctors" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/users", label: "Users" },
];

export function AdminNav({ variant = "sidebar" }: { variant?: "sidebar" | "mobile" }) {
  if (variant === "mobile") {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="shrink-0 rounded-full bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
          >
            {l.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <nav className="space-y-1 px-3 py-4">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          {l.label}
        </Link>
      ))}
      <Link
        href="/dashboard"
        className="mt-6 block rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-300"
      >
        ← User dashboard
      </Link>
      <Link href="/" className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-300">
        ← Home
      </Link>
    </nav>
  );
}
