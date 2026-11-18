"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

export default function LoginAdmin() {
  const [state, formAction] = useActionState(loginAdmin, { errors: {} });

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-5">
      <div>
        <label htmlFor="pin" className="block text-sm font-semibold text-white">PIN admin</label>
        <input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          placeholder="Masukkan PIN"
          autoComplete="current-password"
          className="mt-2 w-full rounded border border-slate-600 bg-slate-900 px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
          required
        />
        {state.errors?.pin && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.pin}</p>}
      </div>
      <SubmitButton pendingText="Memeriksa...">Masuk</SubmitButton>
    </form>
  );
}
