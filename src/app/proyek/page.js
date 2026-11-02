import ProyekCard from "@/components/ProyekCard";
import { proyek } from "@/data/proyek";

export const metadata = {
  title: "Proyek",
  description: "Kumpulan proyek web dan desain karya M Reyhan Purnomo Putra.",
};

export default function DaftarProyek() {
  return (
    <main className="flex-1 bg-[#f1f8ed] px-4 py-10 text-[#203b5d]">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold md:text-4xl">Proyek Saya</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#30435d]">
          Setiap project adalah kesempatan untuk belajar, mencoba ide, dan
          mengembangkan keterampilan. Pilih kartu untuk membaca detailnya.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyek.map((item) => (
            <ProyekCard key={item.slug} proyek={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
