"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TombolTema() {
  const [gelap, setGelap] = useState(false);

  function gantiTema() {
    const temaBerikutnya = !gelap;
    document.documentElement.classList.toggle("dark", temaBerikutnya);
    setGelap(temaBerikutnya);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={gantiTema}
      className="border-white text-white hover:border-[#c1121f] hover:bg-[#c1121f] hover:text-white"
      aria-pressed={gelap}
    >
      {gelap ? "Mode Terang" : "Mode Gelap"}
    </Button>
  );
}
