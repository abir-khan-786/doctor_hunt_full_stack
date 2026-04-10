import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

const base =
  process.env.NEXT_PUBLIC_APP_URL != null && process.env.NEXT_PUBLIC_APP_URL !== ""
    ? { baseURL: process.env.NEXT_PUBLIC_APP_URL }
    : {};

/** Same-origin: defaults to `/api/auth`. Set `NEXT_PUBLIC_APP_URL` if the browser calls a different origin. */
export const authClient = createAuthClient({
  ...base,
  plugins: [
    inferAdditionalFields({
      user: { role: { type: "string", required: false, input: false } },
    }),
  ],
});
