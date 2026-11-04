"use client";

import { useState } from "react";
import ProyekCard from "@/components/ProyekCard";

const daftarKategori = ["Semua", "HTML", "CSS", "JavaScript"];

function cocokKategori(item, kategori) {
  if (kategori === "Semua") {
    return true;
  }

  const metadataKategori = [
    item.kategori,
    ...(item.kategoriFilter || []),
    ...(item.teknologi || []),
  ]
    .join(" ")
    .toLowerCase();

  return metadataKategori.includes(kategori.toLowerCase());
}

export default function FilterProyek({ proyek }) {
  const [kategori, setKategori] = useState("Semua");
  const [kata, setKata] = useState("");
  const kataKecil = kata.trim().toLowerCase();

  const hasil = proyek.filter((item) => {
    const cocokKata = [item.judul, item.deskripsi]
      .join(" ")
      .toLowerCase()
      .includes(kataKecil);

    return cocokKategori(item, kategori) && cocokKata;
  });

  const kelasTombol =
    "rounded-full border px-4 py-2 text-sm font-semibold transition";

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        {daftarKategori.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setKategori(item)}
            className={`${kelasTombol} ${
              kategori === item
                ? "border-[#c1121f] bg-[#c1121f] text-white"
                : "border-[#203b5d] text-[#203b5d] hover:bg-[#203b5d] hover:text-white dark:border-sky-200 dark:text-sky-200 dark:hover:bg-sky-200 dark:hover:text-gray-900"
            }`}
            aria-pressed={kategori === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-xl">
        <label htmlFor="cari" className="block font-semibold">
          Cari proyek
        </label>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            id="cari"
            value={kata}
            onChange={(event) => setKata(event.target.value)}
            placeholder="Cari judul atau deskripsi"
            className="w-full rounded-lg border border-gray-300 bg-white p-2 text-[#203b5d] outline-none focus:border-[#203b5d] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
          {kata && (
            <button
              type="button"
              onClick={() => setKata("")}
              className="rounded-lg border border-[#203b5d] px-4 py-2 text-sm font-semibold text-[#203b5d] hover:bg-[#203b5d] hover:text-white dark:border-sky-200 dark:text-sky-200 dark:hover:bg-sky-200 dark:hover:text-gray-900"
            >
              Hapus Pencarian
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-[#30435d] dark:text-gray-300">
        Menampilkan {hasil.length} dari {proyek.length} proyek
      </p>

      {hasil.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((item) => (
            <ProyekCard key={item.slug} proyek={item} />
          ))}
        </div>
      )}

      {hasil.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-gray-300 p-6 text-center text-[#30435d] dark:border-gray-600 dark:text-gray-300">
          Tidak ada proyek yang cocok dengan kategori dan pencarian tersebut.
        </p>
      )}
    </div>
  );
}
