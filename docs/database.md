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

- RLS: Aktif
- Policy SELECT publik: Tidak ada
- Tujuan: Menjaga informasi kontak tetap privat.
- Jumlah data terverifikasi: 0 pesan.

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
