"use client";

import Link from "next/link";
import { useState } from "react";

export default function MenuNav() {
  const [abierto, setAbierto] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/conoce-al-maestro", label: "Conoce al Maestro" },
    { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
    { href: "/testimonios", label: "Testimonios" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#1a0505]/95 backdrop-blur border-b border-[#c9a24b]/20">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-sm font-semibold text-[#f0d78c]" style={{ fontFamily: "var(--font-cinzel)" }}>
          Maestro Juan Santiago
        </Link>
        <button
          onClick={() => setAbierto(!abierto)}
          className="text-[#f5e6d3] sm:hidden"
        >
          ☰
        </button>
        <div className="hidden sm:flex gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-[#f5e6d3]/80 hover:text-[#f0d78c] transition">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      {abierto && (
        <div className="sm:hidden flex flex-col gap-1 px-6 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setAbierto(false)}
              className="py-2 text-sm text-[#f5e6d3]/80 hover:text-[#f0d78c] transition"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
