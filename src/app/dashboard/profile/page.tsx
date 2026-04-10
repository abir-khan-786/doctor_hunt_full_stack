import { requireUser } from "@/lib/guards";
import { updateProfile } from "../actions";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const user = await requireUser("/dashboard/profile");

    return (
        <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Profile</h1>
            <h2 className="mt-1 text-sm text-slate-600">Update how your name and photo appear on bookings and reviews.</h2>

            <form
                action={updateProfile}
                className="mt-8 max-w-lg space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                        Display name
                    </label>
                    <input
                        id="name"
                        name="name"
                        required
                        defaultValue={user.name}
                        autoComplete="name"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-slate-700">
                        Photo URL (optional)
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="url"
                        defaultValue={user.image ?? ""}
                        placeholder="https://…"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                    <p className="mt-1 text-xs text-slate-500">Paste an image URL, or leave blank to clear.</p>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Email <span className="font-medium text-slate-900">{user.email}</span> is managed by your sign-in account.
                </div>
                <button
                    type="submit"
                    className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                    Save profile
                </button>
            </form>
        </div>
    );
}
