import FormKontak from "@/components/FormKontak";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi M Reyhan Purnomo Putra melalui formulir, email, atau GitHub.",
};

export default function Kontak() {
  return (
    <main className="w-full flex-1 bg-[#f1f8ed] px-4 py-10 text-[#203b5d] dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold md:text-4xl">Hubungi Saya</h1>
        <p className="mt-3 max-w-2xl text-lg text-[#30435d] dark:text-gray-300">
          Saya terbuka untuk berdiskusi tentang project, pengembangan web,
          desain, dan ide teknologi.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Kirim pesan</CardTitle>
            </CardHeader>
            <CardContent>
              <FormKontak />
              <p className="mt-3 text-sm">
                Formulir ini hanya melakukan validasi di browser dan belum
                menyimpan atau mengirim pesan ke server.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Temukan Saya</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Hubungi atau lihat aktivitas saya melalui:
              </p>
              <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/rey372479-png"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#203b5d] underline dark:text-sky-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:rey372479@gmail.com"
                  className="break-all font-semibold text-[#203b5d] underline dark:text-sky-200"
                >
                  rey372479@gmail.com
                </a>
              </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
