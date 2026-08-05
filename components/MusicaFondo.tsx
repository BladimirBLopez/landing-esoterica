"use client";

import { useRef, useState } from "react";

interface MusicaFondoProps {
  src: string;
}

export default function MusicaFondo({ src }: MusicaFondoProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sonando, setSonando] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (sonando) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setSonando(!sonando);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src={src} type="audio/mpeg" />
      </audio>
      <button
        onClick={toggle}
        aria-label={sonando ? "Pausar musica de fondo" : "Reproducir musica de fondo"}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#c9a24b] bg-[#1a0505]/90 shadow-[0_0_20px_-4px_rgba(201,162,75,0.7)] transition-transform hover:scale-105"
      >
        {sonando ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#c9a24b]">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#c9a24b]">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
