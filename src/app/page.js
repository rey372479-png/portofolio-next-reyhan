
import Hero from "./components/Hero";
import Kartu from "./components/Kartu";
import SkillCard from "./components/SkillCard";

const hobi = [
  "Bersepeda",
  "Jalan cepat",
  "Bermain basket",
  "Berenang",
  "Belajar mengenai keuangan",
  "Mempelajari perkembangan teknologi dan AI",
  "Belajar investasi saham dan crypto",
  "Belajar trading forex",
  "Mempelajari hal-hal baru yang menarik",
];

const langkahCitaCita = [
  "Terus belajar dan menguasai bidang yang saya pilih",
  "Mengembangkan kemampuan programming dan teknologi AI",
  "Membangun sistem AI agent sendiri yang dapat bekerja 24/7",
  "Membangun bisnis dan sistem yang bermanfaat bagi banyak orang",
  "Menjadi pelopor inovasi dan perkembangan teknologi di era baru",
];

const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
  { nama: "JavaScript", level: "Dasar" },
  { nama: "Next.js", level: "Dasar" },
];

const jadwalBelajar = [
  {
    hari: "Senin",
    waktu: "15.00 - 17.00",
    kegiatan: "Belajar programming dan pengembangan website",
  },
  {
    hari: "Rabu",
    waktu: "16.00 - 18.00",
    kegiatan: "Mempelajari AI dan perkembangan teknologi",
  },
  {
    hari: "Kamis",
    waktu: "19.00 - 21.00",
    kegiatan: "Belajar keuangan, investasi, dan analisis pasar",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f1f8ed] font-sans text-[#203b5d]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <Hero
          nama="M Reyhan Purnomo Putra"
          tagline="Siswa kelas XI RPL yang tertarik pada programming, kecerdasan buatan, keuangan, dan perkembangan teknologi."
        />

        <div className="space-y-4">
          <Kartu
            judul="About Me"
            anak={
              <p>
                Saya adalah siswa kelas XI RPL di SMKN 1 Kota Pasuruan.
                Saya tertarik mempelajari pemrograman, kecerdasan buatan,
                perkembangan teknologi, serta dunia keuangan dan investasi.
                Saya senang mengeksplorasi hal-hal baru, memahami cara kerja
                suatu sistem, dan mengembangkan ide menjadi sesuatu yang
                bermanfaat. Saya ingin terus meningkatkan kemampuan agar
                dapat membangun teknologi dan sistem buatan sendiri.
              </p>
            }
          />

          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
            <Kartu
              judul="Hobi"
              anak={
                <ul className="list-inside list-disc space-y-1">
                  {hobi.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              }
            />

            <Kartu
              judul="Cita-Cita"
              anak={
                <div>
                  <h3 className="mb-1 font-bold text-[#203b5d]">
                    Menjadi Miliarder Muda, Triliuner, dan Pelopor Era Baru
                  </h3>
                  <p className="mb-2">Cara mencapainya:</p>
                  <ol className="list-inside list-decimal space-y-2">
                    {langkahCitaCita.map((langkah) => (
                      <li key={langkah}>{langkah}</li>
                    ))}
                  </ol>
                </div>
              }
            />
          </div>

          <Kartu
            judul="Keahlian"
            anak={
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill.nama}
                    nama={skill.nama}
                    level={skill.level}
                  />
                ))}
              </div>
            }
          />

          <Kartu
            judul="Jadwal Belajar"
            anak={
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#203b5d] text-white">
                      <th className="px-3 py-3">Hari</th>
                      <th className="px-3 py-3">Waktu</th>
                      <th className="px-3 py-3">Kegiatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jadwalBelajar.map((jadwal) => (
                      <tr
                        key={jadwal.hari}
                        className="border-b border-gray-100"
                      >
                        <td className="px-3 py-4 font-medium">
                          {jadwal.hari}
                        </td>
                        <td className="px-3 py-4">{jadwal.waktu}</td>
                        <td className="px-3 py-4">{jadwal.kegiatan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          />
        </div>
      </div>

      <footer className="bg-[#203b5d] px-5 py-7 text-center font-semibold text-white">
        © 2026 M Reyhan Purnomo Putra. All rights reserved.
      </footer>
    </main>
  );
}
