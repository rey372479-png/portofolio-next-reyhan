# Dokumentasi Database Portfolio

Database portfolio menggunakan Supabase dengan tiga tabel pada schema `public`.

## Tabel `projects`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `int8` | Primary key dan identity |
| `created_at` | `timestamptz` | Waktu pembuatan data |
| `slug` | `text` | Slug unik proyek |
| `judul` | `text` | Judul proyek |
| `deskripsi` | `text` | Deskripsi proyek |
| `kategori` | `text` | Kategori proyek |
| `minggu` | `text` | Minggu pembelajaran proyek |
| `fitur` | `text[]` | Daftar fitur proyek |
| `gambar_url` | `text` | URL gambar proyek |

- RLS: Aktif
- Policy: `Pengunjung boleh membaca proyek`
- Role: `anon`
- Perintah: `SELECT`
- Tujuan: Mengizinkan pengunjung membaca data proyek.
- Jumlah data terverifikasi: 6 proyek.

## Tabel `messages`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `int8` | Primary key |
| `created_at` | `timestamptz` | Waktu pesan dibuat |
| `nama` | `text` | Nama pengirim |
| `email` | `text` | Email pengirim |
| `pesan` | `text` | Isi pesan |
| `disematkan` | `boolean` | Menandai pesan yang dipin admin |

- RLS: Aktif
- Policy SELECT publik: Buku tamu memakai kolom publik terbatas
- Tujuan: Menampilkan nama, pesan, waktu, dan status pin tanpa menampilkan email.
- Jumlah data terverifikasi: 0 pesan.
- Policy `INSERT` publik hanya mengizinkan `nama`, `email`, dan `pesan`.
- Policy `SELECT` publik hanya diperlukan untuk menampilkan buku tamu.
- Operasi `UPDATE` dan `DELETE` hanya dilakukan dari Server Actions memakai
  `SUPABASE_SECRET_KEY`.

## SQL tambahan CRUD

Jalankan SQL berikut di Supabase SQL Editor untuk menyiapkan kolom, policy, dan
proyek modul terakhir. Secret key tidak diperlukan di SQL ini.

```sql
alter table public.messages
  add column if not exists disematkan boolean not null default false;

alter table public.messages enable row level security;

create policy "Pengunjung boleh membaca pesan buku tamu"
  on public.messages for select
  to anon, authenticated
  using (true);

create policy "Pengunjung boleh menulis pesan buku tamu"
  on public.messages for insert
  to anon, authenticated
  with check (
    char_length(trim(nama)) between 2 and 100
    and char_length(trim(pesan)) between 3 and 500
  );

insert into public.projects
  (slug, judul, deskripsi, kategori, minggu, fitur, gambar_url)
values
  (
    'buku-tamu-digital',
    'Buku Tamu Digital',
    'Aplikasi buku tamu digital dengan Server Actions dan Supabase.',
    'Next.js',
    'P1-W15',
    array['Form server-side', 'Validasi useActionState', 'CRUD Supabase'],
    null
  )
on conflict (slug) do update set
  judul = excluded.judul,
  deskripsi = excluded.deskripsi,
  kategori = excluded.kategori,
  minggu = excluded.minggu,
  fitur = excluded.fitur,
  gambar_url = excluded.gambar_url;
```

Jangan membuat policy `UPDATE` atau `DELETE` untuk role publik. Halaman
`/kelola` membutuhkan environment server berikut di Vercel dan `.env.local`:
`SUPABASE_SECRET_KEY`, `ADMIN_PIN`, dan `ADMIN_SESSION_SECRET`. Variabel yang
diawali `NEXT_PUBLIC_` hanya berisi konfigurasi yang aman untuk browser.

## Tabel `skills`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `int8` | Primary key |
| `created_at` | `timestamptz` | Waktu data dibuat |
| `nama` | `text` | Nama skill |
| `level` | `text` | Tingkat kemampuan |

- RLS: Aktif
- Policy: `Pengunjung boleh membaca skills`
- Role: `anon`
- Perintah: `SELECT`
- Tujuan: Mengizinkan pengunjung membaca data skills.
- Jumlah data terverifikasi: 5 skills.

Data skills:

| Nama | Level |
|---|---|
| Next.js | Dasar |
| HTML | Menengah |
| Git dan GitHub | Dasar |
| CSS | Menengah |
| JavaScript | Dasar |
