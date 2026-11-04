import Image from "next/image";
import Link from "next/link";

export default function ProyekCard({ proyek }) {
  return (
    <Link
      href={`/proyek/${proyek.slug}`}
      className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      {proyek.gambar ? (
        <Image
          src={proyek.gambar}
          alt={`Gambar proyek ${proyek.judul}`}
          width={640}
          height={420}
          loading="eager"
          className="h-auto w-full"
        />
      ) : null}
      <div className="p-5">
        <span className="rounded-full bg-[#f1f8ed] px-3 py-1 text-xs font-semibold text-[#203b5d] dark:bg-gray-700 dark:text-sky-200">
          {proyek.kategori}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-[#203b5d] dark:text-sky-200">
          {proyek.judul}
        </h3>
        <p className="mt-1 text-sm leading-6 text-[#30435d] dark:text-gray-300">
          {proyek.deskripsi}
        </p>
        <p className="mt-3 text-xs font-medium text-[#30435d] dark:text-gray-300">
          {proyek.teknologi.join(" · ")}
        </p>
      </div>
    </Link>
  );
}
