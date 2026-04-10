import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { getSessionUser } from "@/lib/guards";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] border-t border-slate-100 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-10">
        <DashboardSidebar user={user} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
