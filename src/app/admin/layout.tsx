import { requireAdmin } from "@/lib/guards";
import { AdminNav } from "./AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-slate-900 md:block md:min-h-[calc(100vh-4rem)]">
          <div className="border-b border-slate-800 px-4 py-5">
            <p className="font-display text-lg font-semibold text-white">Admin</p>
            <p className="text-xs text-slate-500">Doctor Hunt</p>
          </div>
          <AdminNav />
        </aside>
        <div className="min-w-0 flex-1">
          <div className="border-b border-slate-200 bg-slate-900 px-3 py-3 md:hidden">
            <AdminNav variant="mobile" />
          </div>
          <div className="p-4 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
