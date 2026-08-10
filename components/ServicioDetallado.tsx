"use client";

import { useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

interface ServicioDetalladoProps {
  titulo: string;
  icono?: string;
  descripcion: string;
  beneficios?: string[];
  incluyeTitulo?: string;
  incluye?: string[];
  notaFinal?: string;
  duracion: string;
  imagen: string;
  numero: string;
  mensaje: string;
  cta: string;
  colorFondo?: string;
  servicio?: string;
}

function IconoServicio({ tipo }: { tipo: string }) {
  const iconos: Record<string, { path: string; color: string }> = {
    amor: {
      color: "#e91e8c",
      path: "M12 21s-6.7-4.35-9.3-8.1C1.1 10.6 1.6 7.4 4.2 5.9c2.2-1.3 4.9-.6 6.3 1.4l1.5 2 1.5-2c1.4-2 4.1-2.7 6.3-1.4 2.6 1.5 3.1 4.7 1.5 7-2.6 3.75-9.3 8.1-9.3 8.1z",
    },
    union: {
      color: "#c9a24b",
      path: "M8.5 12a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 0 9h-1.5v-2H16a2.5 2.5 0 0 0 0-5h-3a2.5 2.5 0 0 0-2.5 2.5v.5h-2v-.5zM15.5 12a4.5 4.5 0 0 1-4.5 4.5H8a4.5 4.5 0 0 1 0-9h1.5v2H8a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 0 2.5-2.5v-.5h2v.5z",
    },
    miel: {
      color: "#e0a13c",
      path: "M12 2c-1 2.5-3 4-3 7a3 3 0 0 0 6 0c0-3-2-4.5-3-7zM6 12h12a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a1 1 0 0 1 1-1zm0 3h12v2H6v-2z",
    },
    retorno: {
      color: "#d9534f",
      path: "M17.65 6.35A8 8 0 1 0 19.5 13h-2.1a6 6 0 1 1-1.4-6.15L13 10h7V3l-2.35 3.35z",
    },
    escudo: {
      color: "#6a5acd",
      path: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
    },
  };

  const icono = iconos[tipo] || iconos.amor;

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill={icono.color}>
      <path d={icono.path} />
    </svg>
  );
}

export default function ServicioDetallado({
  titulo,
  icono,
  descripcion,
  beneficios,
  incluyeTitulo,
  incluye,
  notaFinal,
  duracion,
  imagen,
  numero,
  mensaje,
  cta,
  colorFondo = "#3d1414",
  servicio,
}: ServicioDetalladoProps) {
  const [abierto, setAbierto] = useState(false);
  const tieneDetalle = beneficios && beneficios.length > 0;

  return (
    <div className="group relative mx-auto w-full max-w-xl transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute -inset-3 rounded-[32px] bg-[#c9a24b]/25 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />

      <div className="relative rounded-[28px] bg-gradient-to-br from-[#f0d78c] via-[#c9a24b] to-[#8a651f] p-[3px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="overflow-hidden rounded-[25px]">
          <div className="relative aspect-video w-full">
            <Image src={imagen} alt={titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <h3 className="text-4xl font-bold uppercase tracking-wide text-white" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.9)" }}>
                {titulo}
              </h3>
              <div className="h-[2px] w-16 bg-[#c9a24b]" />
            </div>
          </div>

          <div className="relative flex justify-center" style={{ backgroundColor: colorFondo }}>
            {icono && (
              <span className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#c9a24b] bg-[#f5e6d3] shadow-lg">
                <IconoServicio tipo={icono} />
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 px-6 pb-8 pt-6 text-center" style={{ backgroundColor: colorFondo }}>
            <p className="text-base leading-relaxed text-[#f5e6d3]" style={{ fontFamily: "var(--font-playfair)" }}>{descripcion}</p>

            <span className="rounded-full border-2 border-red-500 bg-red-500/10 px-4 py-1 text-sm font-bold text-red-400">
              Resultados en {duracion}
            </span>

            {tieneDetalle && (
              <>
                {abierto && (
                  <div className="w-full rounded-lg bg-black/30 p-5 text-left text-sm text-[#f5e6d3]/80">
                    <ul className="flex flex-col gap-2">
                      {beneficios!.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-[#c9a24b]">♥</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {incluye && incluye.length > 0 && (
                      <>
                        <p className="mt-4 mb-2 font-semibold text-[#c9a24b]">
                          {incluyeTitulo || "¿Qué incluye el trabajo?"}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {incluye.map((i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-[#c9a24b]">♥</span>
                              <span>{i}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {notaFinal && (
                      <p className="mt-4 border-t border-[#c9a24b]/20 pt-4 text-xs italic text-[#f5e6d3]/60">
                        {notaFinal}
                      </p>
                    )}
                  </div>
                )}
                <button
                  onClick={() => setAbierto(!abierto)}
                  className="flex items-center gap-2 rounded-full border-2 border-[#c9a24b] bg-[#c9a24b]/10 px-5 py-2 text-sm font-semibold text-[#f0d78c] shadow-[0_0_15px_-3px_rgba(201,162,75,0.6)] transition-colors hover:bg-[#c9a24b]/20"
                >
                  {abierto ? "Ver menos" : "¿Qué incluye?"}
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 fill-current transition-transform duration-300 ${abierto ? "rotate-180" : "animate-bounce"}`}
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
              </>
            )}

            <div className="mt-2 h-px w-16 bg-[#c9a24b]/30" />

            <WhatsAppButton
              numero={numero}
              mensaje={mensaje}
              texto={cta}
              className="text-base px-8 py-3"
              servicio={servicio}
            />
            <p className="text-xs text-[#f5e6d3]/60">
              Toca para consultar directo por WhatsApp
            </p>
          </div>
        </div>
      </div>

      <span className="absolute -left-2 -top-2 text-xl text-[#f0d78c] drop-shadow-[0_0_6px_rgba(240,215,140,0.9)]">♥</span>
      <span className="absolute -right-2 -top-2 text-xl text-[#f0d78c] drop-shadow-[0_0_6px_rgba(240,215,140,0.9)]">♥</span>
      <span className="absolute -bottom-2 -left-2 text-xl text-[#f0d78c] drop-shadow-[0_0_6px_rgba(240,215,140,0.9)]">♥</span>
      <span className="absolute -bottom-2 -right-2 text-xl text-[#f0d78c] drop-shadow-[0_0_6px_rgba(240,215,140,0.9)]">♥</span>
    </div>
  );
}
