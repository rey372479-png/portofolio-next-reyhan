import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

async function ambilProyek(slug) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Project detail query failed", {
      code: error.code ?? "unknown",
      status: error.status ?? "unknown",
    });
    throw new Error("Proyek belum dapat dimuat. Silakan coba lagi.");
  }

  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await ambilProyek(slug);

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
  const item = await ambilProyek(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="flex-1 bg-slate-950 px-4 py-10 text-white">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/proyek"
          className="text-sm font-semibold text-slate-300 hover:underline"
        >
          &larr; Kembali ke daftar proyek
        </Link>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">{item.judul}</h1>
        <div className="mt-3 flex items-center gap-3">
          <Badge>{item.kategori}</Badge>
          <span className="text-sm text-slate-300">
            {item.minggu}
          </span>
        </div>
        {item.gambar_url ? (
          <Image
            src={item.gambar_url}
            alt={`Gambar proyek ${item.judul}`}
            width={640}
            height={420}
            loading="eager"
            className="mt-6 h-auto w-full rounded-xl border border-gray-200"
          />
        ) : null}
        <p className="mt-6 text-lg leading-8">{item.deskripsi}</p>
        <Separator />
        <h2 className="text-2xl font-bold text-white">
          Yang Saya Pelajari
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {(item.fitur ?? []).map((fitur) => (
            <li key={fitur}>{fitur}</li>
          ))}
        </ul>
      </article>
    </main>
  );
}
