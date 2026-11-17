export function teks(formData, nama) {
  return String(formData.get(nama) ?? "").trim();
}

export function parseFitur(value) {
  return value
    .split(/\r?\n|,/)
    .map((fitur) => fitur.trim())
    .filter(Boolean);
}

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validasiProyek(formData) {
  const judul = teks(formData, "judul");
  const deskripsi = teks(formData, "deskripsi");
  const kategori = teks(formData, "kategori");
  const minggu = teks(formData, "minggu");
  const fitur = parseFitur(teks(formData, "fitur"));
  const gambarUrl = teks(formData, "gambar_url");
  const errors = {};

  if (judul.length < 3) errors.judul = "Judul minimal 3 karakter.";
  if (deskripsi.length < 10) errors.deskripsi = "Deskripsi minimal 10 karakter.";
  if (!kategori) errors.kategori = "Kategori wajib diisi.";
  if (!minggu) errors.minggu = "Minggu pembelajaran wajib diisi.";
  if (fitur.length === 0) errors.fitur = "Masukkan minimal satu fitur.";
  if (gambarUrl && !/^https?:\/\//i.test(gambarUrl)) {
    errors.gambar_url = "URL gambar harus diawali http:// atau https://.";
  }

  return {
    errors,
    values: { judul, deskripsi, kategori, minggu, fitur, gambarUrl },
  };
}
