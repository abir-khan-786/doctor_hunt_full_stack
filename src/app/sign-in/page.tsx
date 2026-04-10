import { Suspense } from "react";
import { SignInForm } from "./SignInForm";

export default function SignInPage() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="mx-auto max-w-md px-4 py-16 text-center text-sm text-slate-500">Loading…</div>
        }
      >
        <SignInForm />
      </Suspense>
    </main>
  );
}
