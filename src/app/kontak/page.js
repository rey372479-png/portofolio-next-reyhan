export const metadata = {
  title: "Kontak",
  description:
    "Hubungi M Reyhan Purnomo Putra melalui formulir, email, atau GitHub.",
};

export default function Kontak() {
  return (
    <main className="flex-1 bg-[#f1f8ed] px-4 py-10 text-[#203b5d]">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold md:text-4xl">Hubungi Saya</h1>
        <p className="mt-3 max-w-2xl text-lg text-[#30435d]">
          Saya terbuka untuk berdiskusi tentang project, pengembangan web,
          desain, dan ide teknologi.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:col-span-2">
            <h2 className="mb-4 text-2xl font-bold">Kirim pesan</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="nama" className="block font-semibold">
                  Nama lengkap
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="Nama Anda"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="nama@email.com"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2"
                />
              </div>
              <div>
                <label htmlFor="pesan" className="block font-semibold">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={5}
                  maxLength={300}
                  placeholder="Tulis pesan Anda..."
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2"
                />
              </div>
              <button
                type="button"
                disabled
                className="rounded-lg bg-[#203b5d] px-5 py-3 font-semibold text-white opacity-60"
              >
                Form belum dapat mengirim pesan
              </button>
            </form>
            <p className="mt-3 text-sm text-[#30435d]">
              Formulir ini belum mengirim pesan. Fitur pengiriman akan dibuat
              pada tahap pembelajaran berikutnya.
            </p>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Temukan Saya</h2>
            <p className="mb-4 text-[#30435d]">
              Hubungi atau lihat aktivitas saya melalui:
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/rey372479-png"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#203b5d] underline"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:rey372479@gmail.com"
                  className="break-all font-semibold text-[#203b5d] underline"
                >
                  rey372479@gmail.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
