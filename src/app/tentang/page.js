
import Hero from "../components/Hero";
import Kartu from "../components/Kartu";

export const metadata = {
  title: "Tentang",
  description:
    "Cerita, hobi, tujuan, dan jadwal belajar M Reyhan Purnomo Putra.",
};

export default function TentangPage() {
  const hobi = [
    "Programming dan pengembangan web",
    "Kecerdasan buatan dan perkembangan teknologi",
    "Fintech, pasar finansial, dan investasi",
    "Bersepeda dan jalan cepat",
    "Bermain basket dan berenang",
  ];

  const citaCita = [
    "Membangun kemampuan programming dan membuat proyek teknologi yang berguna.",
    "Belajar memahami sistem AI dan mengikuti perkembangan teknologi baru.",
    "Terus mencoba ide, belajar dari pengalaman, dan mengembangkan solusi yang bermanfaat.",
  ];

  const jadwalBelajar = [
    {
      hari: "Senin",
      waktu: "15.00 - 17.00",
      kegiatan: "Programming dan pengembangan website",
    },
    {
      hari: "Rabu",
      waktu: "16.00 - 18.00",
      kegiatan: "AI dan perkembangan teknologi",
    },
    {
      hari: "Kamis",
      waktu: "19.00 - 21.00",
      kegiatan: "Keuangan, investasi, dan analisis pasar",
    },
  ];

  return (
    <main className="flex-1 bg-[#f1f8ed] px-4 py-10 text-[#203b5d]">
      <div className="mx-auto max-w-5xl space-y-6">
        <Hero
          nama="M Reyhan Purnomo Putra"
          tagline="Siswa kelas XI RPL di SMKN 1 Kota Pasuruan, web developer yang terus belajar dan bereksplorasi."
        />

        <Kartu
          judul="Perkenalan"
          anak={
            <p>
              Saya M Reyhan Purnomo Putra, siswa kelas XI RPL di SMKN 1 Kota
              Pasuruan. Saya senang memahami cara kerja teknologi dengan
              belajar dan membuat proyek. Saya juga tertarik pada pengalaman
              organisasi dan belajar mengambil tanggung jawab bersama.
            </p>
          }
        />

        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <Kartu
            judul="Hobi dan Minat"
            anak={
              <ul className="list-inside list-disc space-y-2">
                {hobi.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            }
          />

          <Kartu
            judul="Cita-Cita dan Tujuan"
            anak={
              <ul className="list-inside list-disc space-y-2">
                {citaCita.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            }
          />
        </div>

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
                      <td className="px-3 py-4 font-medium">{jadwal.hari}</td>
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
    </main>
  );
}
