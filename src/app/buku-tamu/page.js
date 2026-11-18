import FormBukuTamu from "@/components/FormBukuTamu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Buku Tamu",
  description: "Tinggalkan pesan untuk M Reyhan Purnomo Putra.",
};

async function ambilPesan() {
  const { data, error } = await supabase
    .from("messages")
    .select("id, created_at, nama, pesan, disematkan")
    .order("disematkan", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Guestbook query failed", {
      code: error.code ?? "unknown",
      status: error.status ?? "unknown",
    });
    return { data: [], error: true };
  }

  return { data: data ?? [], error: null };
}

export default async function BukuTamuPage() {
  const { data: pesan, error } = await ambilPesan();

  return (
    <main className="w-full flex-1 bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold md:text-4xl">Buku Tamu</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-300">
          Tinggalkan pesan, saran, atau semangat untuk proyek-proyek saya.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-slate-700 bg-slate-900">
            <CardHeader><CardTitle className="text-white">Tulis pesan</CardTitle></CardHeader>
            <CardContent className="text-slate-300"><FormBukuTamu /></CardContent>
          </Card>
          <Card className="border-slate-700 bg-slate-900">
            <CardHeader><CardTitle className="text-white">Pesan pengunjung</CardTitle></CardHeader>
            <CardContent className="text-slate-300">
              {error ? (
                <p className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                  Buku tamu belum dapat dimuat. Pastikan policy SELECT messages sudah dibuat.
                </p>
              ) : pesan.length === 0 ? (
                <p>Belum ada pesan. Jadilah yang pertama!</p>
              ) : (
                <ul className="space-y-4">
                  {pesan.map((item) => (
                    <li key={item.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-bold">{item.nama}</p>
                        {item.disematkan && <span className="text-xs font-semibold text-[#c1121f]">Disematkan</span>}
                      </div>
                      <p className="mt-2 text-sm">{item.pesan}</p>
                      <time className="mt-2 block text-xs text-gray-500" dateTime={item.created_at}>
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </time>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
