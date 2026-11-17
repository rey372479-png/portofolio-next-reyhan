"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

export default function LoginAdmin() {
  const [state, formAction] = useActionState(loginAdmin, { errors: {} });

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4">
      <div>
        <label htmlFor="pin" className="block font-semibold">PIN admin</label>
        <input id="pin" name="pin" type="password" inputMode="numeric" autoComplete="current-password" className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-[#203b5d]" required />
        {state.errors?.pin && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.pin}</p>}
      </div>
      <SubmitButton>Masuk</SubmitButton>
    </form>
  );
}
