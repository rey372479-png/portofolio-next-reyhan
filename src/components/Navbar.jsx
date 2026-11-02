"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/proyek", label: "Proyek" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-[#203b5d] text-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-xl font-bold">
          M Reyhan Purnomo Putra
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {menu.map((item) => {
            const aktif =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const kelas = aktif
              ? "font-bold text-white underline underline-offset-8"
              : "text-gray-200 hover:text-white";

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={kelas}
                  aria-current={aktif ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
