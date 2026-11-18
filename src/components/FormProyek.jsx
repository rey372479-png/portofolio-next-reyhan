"use client";

import { useActionState, useEffect } from "react";
import { tambahProyek, ubahProyek } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

const kelasInput =
  "mt-2 w-full rounded border border-slate-600 bg-slate-900 px-3 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-sky-400";
const stateAwal = { ok: false, message: "", errors: {}, values: {} };

export default function FormProyek({ proyek = null }) {
  const action = proyek ? ubahProyek : tambahProyek;
  const [state, formAction] = useActionState(action, stateAwal);
  const values = state.values || {};
  const fiturAwal = proyek?.fitur?.join("\n") || "";

  useEffect(() => {
    if (state.ok) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.ok]);

  return (
    <form action={formAction} className="space-y-4">
      {proyek && (
        <h2 className="text-center text-2xl font-bold text-white">Ubah Proyek</h2>
      )}
      {proyek && <input type="hidden" name="id" value={proyek.id} />}
      <div>
        <label htmlFor={`judul-${proyek?.id || "baru"}`} className="block text-sm font-semibold text-slate-100">
          Judul proyek
        </label>
        <input
          id={`judul-${proyek?.id || "baru"}`}
          name="judul"
          defaultValue={values.judul ?? proyek?.judul ?? ""}
          className={kelasInput}
          required
        />
        {state.errors?.judul && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.judul}</p>}
      </div>
      <div>
        <label htmlFor={`deskripsi-${proyek?.id || "baru"}`} className="block font-semibold">
          Deskripsi
        </label>
        <textarea
          id={`deskripsi-${proyek?.id || "baru"}`}
          name="deskripsi"
          rows={4}
          defaultValue={values.deskripsi ?? proyek?.deskripsi ?? ""}
          className={kelasInput}
          required
        />
        {state.errors?.deskripsi && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.deskripsi}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`kategori-${proyek?.id || "baru"}`} className="block font-semibold">
            Kategori
          </label>
          <input
            id={`kategori-${proyek?.id || "baru"}`}
            name="kategori"
            defaultValue={values.kategori ?? proyek?.kategori ?? ""}
            className={kelasInput}
            required
          />
          {state.errors?.kategori && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.kategori}</p>}
        </div>
        <div>
          <label htmlFor={`minggu-${proyek?.id || "baru"}`} className="block font-semibold">
            Minggu pembelajaran
          </label>
          <input
            id={`minggu-${proyek?.id || "baru"}`}
            name="minggu"
            defaultValue={values.minggu ?? proyek?.minggu ?? ""}
            className={kelasInput}
            required
          />
          {state.errors?.minggu && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.minggu}</p>}
        </div>
      </div>
      <div>
        <label htmlFor={`fitur-${proyek?.id || "baru"}`} className="block font-semibold">
          Fitur <span className="font-normal">(satu per baris)</span>
        </label>
        <textarea
          id={`fitur-${proyek?.id || "baru"}`}
          name="fitur"
          rows={4}
          defaultValue={values.fitur?.join("\n") ?? fiturAwal}
          className={kelasInput}
          required
        />
        {state.errors?.fitur && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.fitur}</p>}
      </div>
      <div>
        <label htmlFor={`gambar-${proyek?.id || "baru"}`} className="block font-semibold">
          URL gambar <span className="font-normal">(opsional)</span>
        </label>
        <input
          id={`gambar-${proyek?.id || "baru"}`}
          name="gambar_url"
          type="url"
          defaultValue={values.gambarUrl ?? proyek?.gambar_url ?? ""}
          className={kelasInput}
        />
        {state.errors?.gambar_url && <p className="mt-1 text-sm text-[#c1121f]">{state.errors.gambar_url}</p>}
      </div>
      {state.message && (
        <p className={`rounded-lg p-3 text-sm ${state.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {state.message}
        </p>
      )}
      <SubmitButton>{proyek ? "Simpan perubahan" : "Tambah proyek"}</SubmitButton>
    </form>
  );
}
