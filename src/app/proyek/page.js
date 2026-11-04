import FilterProyek from "@/components/FilterProyek";
import { proyek } from "@/data/proyek";

export const metadata = {
  title: "Proyek",
  description: "Kumpulan proyek web dan desain karya M Reyhan Purnomo Putra.",
};

export default function DaftarProyek() {
  return (
    <main className="w-full flex-1 bg-[#f1f8ed] px-4 py-10 text-[#203b5d] dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold md:text-4xl">Proyek Saya</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#30435d] dark:text-gray-300">
          Setiap project adalah kesempatan untuk belajar, mencoba ide, dan
          mengembangkan keterampilan. Pilih kartu untuk membaca detailnya.
        </p>
        <FilterProyek proyek={proyek} />
      </div>
    </main>
  );
}
