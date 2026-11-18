"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tambahPesanTamu } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

const stateAwal = { ok: false, message: "", errors: {}, values: {} };
const kelasInput =
  "mt-2 w-full rounded border border-slate-600 bg-slate-900 px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-sky-400";

export default function FormBukuTamu() {
  const [state, formAction] = useActionState(tambahPesanTamu, stateAwal);
  const router = useRouter();

  useEffect(() => {
    if (state.ok) router.refresh();
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="tamu-nama" className="block font-semibold">Nama</label>
        <input id="tamu-nama" name="nama" defaultValue={state.values?.nama ?? ""} className={kelasInput} required />
        {state.errors?.nama && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.nama}</p>}
      </div>
      <div>
        <label htmlFor="tamu-email" className="block font-semibold">
          Email <span className="font-normal">(opsional, tidak ditampilkan)</span>
        </label>
        <input id="tamu-email" name="email" type="email" defaultValue={state.values?.email ?? ""} className={kelasInput} />
        {state.errors?.email && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.email}</p>}
      </div>
      <div>
        <label htmlFor="tamu-pesan" className="block font-semibold">Pesan</label>
        <textarea id="tamu-pesan" name="pesan" rows={4} maxLength={500} defaultValue={state.values?.pesan ?? ""} className={kelasInput} required />
        {state.errors?.pesan && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.pesan}</p>}
      </div>
      {state.message && (
        <p className={`rounded-lg p-3 text-sm ${state.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {state.message}
        </p>
      )}
      <SubmitButton>Kirim ke buku tamu</SubmitButton>
    </form>
  );
}
