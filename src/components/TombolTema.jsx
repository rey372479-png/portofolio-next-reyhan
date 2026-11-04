"use client";

import { useState } from "react";

export default function TombolTema() {
  const [gelap, setGelap] = useState(false);

  function gantiTema() {
    const temaBerikutnya = !gelap;
    document.documentElement.classList.toggle("dark", temaBerikutnya);
    setGelap(temaBerikutnya);
  }

  return (
    <button
      type="button"
      onClick={gantiTema}
      className="rounded-lg border border-white px-3 py-1 text-sm font-semibold text-white transition hover:border-[#c1121f] hover:bg-[#c1121f]"
      aria-pressed={gelap}
    >
      {gelap ? "Mode Terang" : "Mode Gelap"}
    </button>
  );
}
