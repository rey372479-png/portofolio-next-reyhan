import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proyek } from "@/data/proyek";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = proyek.find((project) => project.slug === slug);

  if (!item) {
    return { title: "Proyek tidak ditemukan" };
  }

  return {
    title: item.judul,
    description: item.deskripsi,
  };
}

export default async function DetailProyek({ params }) {
  const { slug } = await params;
  const item = proyek.find((project) => project.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#f1f8ed] px-4 py-10 text-[#203b5d]">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/proyek"
          className="text-sm font-semibold text-[#30435d] hover:underline"
        >
          &larr; Kembali ke daftar proyek
        </Link>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">{item.judul}</h1>
        <p className="mt-2 text-[#30435d]">
          {item.kategori} &middot; {item.teknologi.join(" · ")}
        </p>
        {item.gambar ? (
          <Image
            src={item.gambar}
            alt={`Gambar proyek ${item.judul}`}
            width={640}
            height={420}
            loading="eager"
            className="mt-6 h-auto w-full rounded-xl border border-gray-200"
          />
        ) : null}
        <p className="mt-6 text-lg leading-8">{item.deskripsi}</p>
        <p className="mt-3 leading-7 text-[#30435d]">{item.detail}</p>
        <h2 className="mt-8 text-2xl font-bold text-[#203b5d]">
          Tentang Project
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {item.fitur.map((fitur) => (
            <li key={fitur}>{fitur}</li>
          ))}
        </ul>
        {item.tautan ? (
          <a
            href={item.tautan.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-lg bg-[#203b5d] px-5 py-3 font-semibold text-white hover:bg-[#30435d]"
          >
            {item.tautan.label}
          </a>
        ) : null}
      </article>
    </main>
  );
}
