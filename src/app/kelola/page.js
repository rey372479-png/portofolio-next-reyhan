import Link from "next/link";
import { hapusPesan, hapusProyek, logoutAdmin, ubahPinPesan } from "@/app/actions";
import AlertDialog from "@/components/AlertDialog";
import FormProyek from "@/components/FormProyek";
import LoginAdmin from "@/components/LoginAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isAdminAuthenticated } from "@/lib/admin";
import { createAdminSupabaseClient } from "@/lib/supabase";

export const metadata = { title: "Kelola" };

async function ambilDataAdmin() {
  const client = createAdminSupabaseClient();
  const [{ data: proyek, error: proyekError }, { data: pesan, error: pesanError }] =
    await Promise.all([
      client.from("projects").select("*").order("created_at", { ascending: false }),
      client.from("messages").select("*").order("created_at", { ascending: false }),
    ]);

  if (proyekError) {
    console.warn("Admin projects query failed", {
      code: proyekError.code ?? "unknown",
      status: proyekError.status ?? "unknown",
    });
  }
  if (pesanError) {
    console.warn("Admin messages query failed", {
      code: pesanError.code ?? "unknown",
      status: pesanError.status ?? "unknown",
    });
  }

  return {
    proyek: proyek ?? [],
    pesan: pesan ?? [],
    proyekError: Boolean(proyekError),
    pesanError: Boolean(pesanError),
  };
}

export default async function KelolaPage() {
  if (!(await isAdminAuthenticated())) {
    return (
      <main className="w-full flex-1 bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center text-3xl font-bold md:text-4xl">Kelola Data</h1>
          <p className="mt-2 text-center text-slate-400">Halaman ini khusus pemilik portofolio.</p>
          <Card className="mt-6 border-slate-700 bg-slate-900">
            <CardHeader><CardTitle className="text-white">Masuk Admin</CardTitle></CardHeader>
            <CardContent className="text-slate-300"><LoginAdmin /></CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const { proyek, pesan, proyekError, pesanError } = await ambilDataAdmin();

  return (
    <main className="w-full flex-1 bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Kelola Data</h1>
            <p className="mt-2 text-slate-400">CRUD proyek dan moderasi buku tamu.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/proyek" className="rounded border border-slate-600 px-3 py-2 text-sm font-semibold text-white hover:border-sky-400">Lihat situs</Link>
            <form action={logoutAdmin}><button className="rounded border border-slate-600 px-3 py-2 text-sm font-semibold text-red-300 hover:border-red-400">Keluar</button></form>
          </div>
        </div>

        <Card className="mx-auto max-w-2xl border-slate-700 bg-slate-900">
          <CardHeader><CardTitle className="text-center text-white">Tambah Proyek</CardTitle></CardHeader>
          <CardContent className="text-slate-300"><FormProyek /></CardContent>
        </Card>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Proyek ({proyek.length})</h2>
          {proyekError ? <p className="text-red-700">Proyek belum dapat dimuat. Silakan coba lagi.</p> : (
            <div className="space-y-5">
              {proyek.map((item) => (
                <Card key={item.id} className="mx-auto max-w-2xl border-slate-700 bg-slate-900">
                  <CardHeader><CardTitle className="text-white">{item.judul}</CardTitle></CardHeader>
                  <CardContent className="text-slate-300">
                    <FormProyek proyek={item} />
                    <AlertDialog
                      title={`Hapus ${item.judul}?`}
                      description="Proyek akan dihapus permanen dari Supabase."
                      action={hapusProyek}
                      fields={<input type="hidden" name="id" value={item.id} />}
                    >
                      <button type="button" className="mt-3 font-semibold text-[#c1121f] underline">Hapus proyek</button>
                    </AlertDialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Buku tamu ({pesan.length})</h2>
          {pesanError ? <p className="text-red-700">Pesan buku tamu belum dapat dimuat. Silakan coba lagi.</p> : (
            <div className="space-y-4">
              {pesan.length === 0 && <p>Belum ada pesan.</p>}
              {pesan.map((item) => (
                <Card key={item.id} className="border-slate-700 bg-slate-900">
                  <CardContent className="pt-5 text-slate-300">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-bold">{item.nama}</p>
                        <p className="mt-1 text-sm">{item.pesan}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <form action={ubahPinPesan}>
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="disematkan" value={String(Boolean(item.disematkan))} />
                          <button className="text-sm font-semibold underline">{item.disematkan ? "Lepas pin" : "Pin pesan"}</button>
                        </form>
                        <AlertDialog
                          title="Hapus pesan?"
                          description="Pesan ini akan dihapus permanen."
                          action={hapusPesan}
                          fields={<input type="hidden" name="id" value={item.id} />}
                        >
                          <button type="button" className="text-sm font-semibold text-[#c1121f] underline">Hapus</button>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
