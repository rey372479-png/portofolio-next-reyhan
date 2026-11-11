import FilterProyek from "@/components/FilterProyek";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Proyek",
  description: "Kumpulan proyek web dan desain karya M Reyhan Purnomo Putra.",
};

export default async function DaftarProyek() {
  const { data: proyek, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at");

  return (
    <main className="w-full flex-1 bg-[#f1f8ed] px-4 py-10 text-[#203b5d] dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold md:text-4xl">Proyek Saya</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#30435d] dark:text-gray-300">
          Setiap project adalah kesempatan untuk belajar, mencoba ide, dan
          mengembangkan keterampilan. Pilih kartu untuk membaca detailnya.
        </p>
        {error ? (
          <p className="mt-8 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
            Proyek belum dapat dimuat: {error.message}
          </p>
        ) : (
          <FilterProyek proyek={proyek ?? []} />
        )}
      </div>
    </main>
  );
}
