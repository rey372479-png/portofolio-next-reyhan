"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  isValidAdminPin,
  requireAdmin,
  setAdminSession,
} from "@/lib/admin";
import { createAdminSupabaseClient, supabase } from "@/lib/supabase";
import { slugify, teks, validasiProyek } from "@/lib/validasi";

const sukses = (message) => ({ ok: true, message, errors: {}, values: {} });

function catatErrorDatabase(operation, error) {
  console.error("Supabase operation failed", {
    operation,
    code: error.code ?? "unknown",
    status: error.status ?? "unknown",
  });
}

export async function loginAdmin(previousState, formData) {
  const pin = teks(formData, "pin");

  if (!isValidAdminPin(pin)) {
    return {
      ok: false,
      message: "",
      errors: { pin: "PIN admin tidak valid." },
      values: {},
    };
  }

  await setAdminSession();
  redirect("/kelola");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/kelola");
}

export async function tambahPesanTamu(previousState, formData) {
  const nama = teks(formData, "nama");
  const email = teks(formData, "email");
  const pesan = teks(formData, "pesan");
  const errors = {};

  if (nama.length < 2) errors.nama = "Nama minimal 2 karakter.";
  if (nama.length > 100) errors.nama = "Nama maksimal 100 karakter.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Format email tidak valid.";
  }
  if (pesan.length < 3) errors.pesan = "Pesan minimal 3 karakter.";
  if (pesan.length > 500) errors.pesan = "Pesan maksimal 500 karakter.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "", errors, values: { nama, email, pesan } };
  }

  const { error } = await supabase.from("messages").insert({
    nama,
    email: email || null,
    pesan,
  });

  if (error) {
    catatErrorDatabase("insert guestbook message", error);
    return {
      ok: false,
      message: "Pesan gagal disimpan. Silakan coba lagi.",
      errors: {},
      values: { nama, email, pesan },
    };
  }

  revalidatePath("/buku-tamu");
  revalidatePath("/kontak");
  return sukses("Pesan berhasil ditambahkan ke buku tamu.");
}

export async function tambahProyek(previousState, formData) {
  await requireAdmin();
  const { errors, values } = validasiProyek(formData);

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "", errors, values };
  }

  const client = createAdminSupabaseClient();
  const slug = slugify(values.judul);
  const { error } = await client.from("projects").insert({
    slug,
    judul: values.judul,
    deskripsi: values.deskripsi,
    kategori: values.kategori,
    minggu: values.minggu,
    fitur: values.fitur,
    gambar_url: values.gambarUrl || null,
  });

  if (error) {
    catatErrorDatabase("insert project", error);
    return {
      ok: false,
      message: "Proyek gagal ditambahkan. Silakan coba lagi.",
      errors: {},
      values,
    };
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  return sukses("Proyek berhasil ditambahkan.");
}

export async function ubahProyek(previousState, formData) {
  await requireAdmin();
  const id = teks(formData, "id");
  const { errors, values } = validasiProyek(formData);

  if (!id) {
    return { ok: false, message: "ID proyek tidak ditemukan.", errors: {}, values };
  }
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "", errors, values };
  }

  const client = createAdminSupabaseClient();
  const { error } = await client
    .from("projects")
    .update({
      slug: slugify(values.judul),
      judul: values.judul,
      deskripsi: values.deskripsi,
      kategori: values.kategori,
      minggu: values.minggu,
      fitur: values.fitur,
      gambar_url: values.gambarUrl || null,
    })
    .eq("id", id);

  if (error) {
    catatErrorDatabase("update project", error);
    return {
      ok: false,
      message: "Proyek gagal diubah. Silakan coba lagi.",
      errors: {},
      values,
    };
  }

  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/proyek/[slug]", "page");
  return sukses("Proyek berhasil diubah.");
}

export async function hapusProyek(formData) {
  await requireAdmin();
  const id = teks(formData, "id");
  const client = createAdminSupabaseClient();
  const { error } = await client.from("projects").delete().eq("id", id);

  if (error) {
    catatErrorDatabase("delete project", error);
    throw new Error("Proyek gagal dihapus. Silakan coba lagi.");
  }

  revalidatePath("/");
  revalidatePath("/proyek");
}

export async function ubahPinPesan(formData) {
  await requireAdmin();
  const id = teks(formData, "id");
  const disematkan = teks(formData, "disematkan") === "true";
  const client = createAdminSupabaseClient();
  const { error } = await client
    .from("messages")
    .update({ disematkan: !disematkan })
    .eq("id", id);

  if (error) {
    catatErrorDatabase("update guestbook pin", error);
    throw new Error("Status pesan gagal diubah. Silakan coba lagi.");
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
  revalidatePath("/kontak");
}

export async function hapusPesan(formData) {
  await requireAdmin();
  const id = teks(formData, "id");
  const client = createAdminSupabaseClient();
  const { error } = await client.from("messages").delete().eq("id", id);

  if (error) {
    catatErrorDatabase("delete guestbook message", error);
    throw new Error("Pesan gagal dihapus. Silakan coba lagi.");
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
  revalidatePath("/kontak");
}
