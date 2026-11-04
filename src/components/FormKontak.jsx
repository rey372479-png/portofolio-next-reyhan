"use client";

import { useState } from "react";

const nilaiAwal = {
  nama: "",
  email: "",
  nomorHp: "",
  keperluan: "",
  pesan: "",
};

const kelasInput =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-[#203b5d] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100";

export default function FormKontak() {
  const [form, setForm] = useState(nilaiAwal);
  const [error, setError] = useState({});
  const [terkirim, setTerkirim] = useState(false);

  function ubahField(event) {
    const { name, value } = event.target;
    setForm((nilai) => ({ ...nilai, [name]: value }));
    setTerkirim(false);
  }

  function kirim(event) {
    event.preventDefault();
    const errorBaru = {};

    if (!form.nama.trim()) errorBaru.nama = "Nama wajib diisi.";
    if (!form.email.trim()) {
      errorBaru.email = "Email wajib diisi.";
    } else if (!form.email.includes("@")) {
      errorBaru.email = "Email harus memuat tanda @.";
    }
    if (!form.nomorHp.trim()) errorBaru.nomorHp = "Nomor HP wajib diisi.";
    if (!form.keperluan.trim()) errorBaru.keperluan = "Keperluan wajib diisi.";
    if (!form.pesan.trim()) errorBaru.pesan = "Pesan wajib diisi.";

    setError(errorBaru);
    setTerkirim(Object.keys(errorBaru).length === 0);
  }

  return (
    <form onSubmit={kirim} noValidate className="space-y-4">
      <div>
        <label htmlFor="nama" className="block font-semibold">
          Nama lengkap
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={form.nama}
          onChange={ubahField}
          placeholder="Nama Anda"
          className={kelasInput}
        />
        {error.nama && <p className="mt-1 text-sm text-[#c1121f]">{error.nama}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={ubahField}
          placeholder="nama@email.com"
          className={kelasInput}
        />
        {error.email && <p className="mt-1 text-sm text-[#c1121f]">{error.email}</p>}
      </div>
      <div>
        <label htmlFor="nomorHp" className="block font-semibold">
          Nomor HP
        </label>
        <input
          type="tel"
          id="nomorHp"
          name="nomorHp"
          value={form.nomorHp}
          onChange={ubahField}
          placeholder="08xxxxxxxxxx"
          className={kelasInput}
        />
        {error.nomorHp && (
          <p className="mt-1 text-sm text-[#c1121f]">{error.nomorHp}</p>
        )}
      </div>
      <div>
        <label htmlFor="keperluan" className="block font-semibold">
          Keperluan
        </label>
        <input
          type="text"
          id="keperluan"
          name="keperluan"
          value={form.keperluan}
          onChange={ubahField}
          placeholder="Contoh: diskusi project"
          className={kelasInput}
        />
        {error.keperluan && (
          <p className="mt-1 text-sm text-[#c1121f]">{error.keperluan}</p>
        )}
      </div>
      <div>
        <label htmlFor="pesan" className="block font-semibold">
          Pesan
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={5}
          maxLength={300}
          value={form.pesan}
          onChange={ubahField}
          placeholder="Tulis pesan Anda..."
          className={kelasInput}
        />
        {error.pesan && <p className="mt-1 text-sm text-[#c1121f]">{error.pesan}</p>}
      </div>
      <button
        type="submit"
        className="rounded-lg bg-[#203b5d] px-5 py-3 font-semibold text-white transition hover:bg-[#30435d] dark:bg-sky-200 dark:text-gray-900 dark:hover:bg-sky-100"
      >
        Kirim Pesan
      </button>
      {terkirim && (
        <p className="rounded-lg bg-green-100 p-3 text-sm font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-200">
          Pesan berhasil divalidasi. Terima kasih sudah menghubungi saya.
        </p>
      )}
    </form>
  );
}
