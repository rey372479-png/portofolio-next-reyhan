
import Hero from "./components/Hero";
import Kartu from "./components/Kartu";
import ProyekCard from "@/components/ProyekCard";
import SkillCard from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const [
    { data: skills, error: skillsError },
    { data: proyekTerbaru, error: projectsError },
  ] = await Promise.all([
    supabase.from("skills").select("*").order("id"),
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  return (
    <main className="flex-1 bg-[#f1f8ed] text-[#203b5d] dark:bg-gray-900 dark:text-gray-100">
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
          <h2 className="mb-4 text-2xl font-bold text-[#203b5d] dark:text-sky-200">
            Keahlian
          </h2>
          {skillsError ? (
            <p className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
              Keahlian belum dapat dimuat: {skillsError.message}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills?.map((skill) => (
                <SkillCard
                  key={skill.nama}
                  nama={skill.nama}
                  level={skill.level}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-[#203b5d]">
            Proyek Terbaru
          </h2>
          {projectsError ? (
            <p className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
              Proyek belum dapat dimuat: {projectsError.message}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {proyekTerbaru?.map((item) => (
                <ProyekCard key={item.slug} proyek={item} />
              ))}
            </div>
          )}
          <Button asChild href="/proyek" className="mt-6">
            Lihat semua proyek
          </Button>
        </section>
      </div>
    </main>
  );
}
