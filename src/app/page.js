
import Hero from "./components/Hero";
import Kartu from "./components/Kartu";
import SkillCard from "./components/SkillCard";
import Link from "next/link";
import ProyekCard from "@/components/ProyekCard";
import { proyek } from "@/data/proyek";

const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
  { nama: "JavaScript", level: "Dasar" },
  { nama: "Next.js", level: "Dasar" },
];

const proyekTerbaru = proyek.slice(-3);

export default function Home() {
  return (
    <main className="flex-1 bg-[#f1f8ed] text-[#203b5d]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <Hero
          nama="M Reyhan Purnomo Putra"
          tagline="Siswa XI RPL di SMKN 1 Kota Pasuruan yang belajar web development dan tertarik pada AI, teknologi, serta pasar finansial."
        />

        <Kartu
          judul="Selamat datang"
          anak={
            <p>
              Saya senang belajar dengan membuat sesuatu. Di sini saya
              membagikan keahlian dan beberapa proyek yang sedang saya
              kembangkan.
            </p>
          }
        />

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-[#203b5d]">
            Keahlian
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <SkillCard
                key={skill.nama}
                nama={skill.nama}
                level={skill.level}
              />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-[#203b5d]">
            Proyek Terbaru
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {proyekTerbaru.map((item) => (
              <ProyekCard key={item.slug} proyek={item} />
            ))}
          </div>
          <Link
            href="/proyek"
            className="mt-6 inline-block rounded-lg bg-[#203b5d] px-5 py-2 font-semibold text-white transition hover:bg-[#30435d]"
          >
            Lihat semua proyek
          </Link>
        </section>
      </div>
    </main>
  );
}
