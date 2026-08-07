"use client";

import { useState } from "react";

const NUMERO = "59175928656";

const SERVICIOS = [
  { value: "AMARRE", label: "Amarre de Amor" },
  { value: "UNION_PAREJA", label: "Unión de Parejas" },
  { value: "ENDULZAMIENTO", label: "Endulzamiento" },
  { value: "RETORNO", label: "Retorno del Ser Amado" },
  { value: "ALEJAMIENTO", label: "Alejamiento de Terceros" },
];

const API_URL = "https://juan-santiago-admin.vercel.app/api/leads";

export default function ConsultaPage() {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState("AMARRE");
  const [situacion, setSituacion] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEnviando(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          fechaNacimiento: fechaNacimiento || null,
          telefono,
          servicio,
          situacion,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al enviar");
      }

      const servicioLabel =
        SERVICIOS.find((s) => s.value === servicio)?.label ?? servicio;

      const mensaje = encodeURIComponent(
        `Hola Maestro Juan Santiago, soy ${nombre}. Ya envié mi consulta sobre ${servicioLabel}. Mi situación: ${situacion}`
      );

      window.location.href = `https://wa.me/${NUMERO}?text=${mensaje}`;
    } catch {
      setError("Hubo un problema al enviar. Intenta de nuevo o escríbeme directo por WhatsApp.");
      setEnviando(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#1a0505] px-6 py-12 text-[#f5e6d3]">
      <div className="mx-auto max-w-lg">
        <h1
          className="mb-2 text-center text-3xl font-bold text-[#f0d78c]"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Cuéntame tu situación
        </h1>
        <p className="mb-8 text-center text-sm text-[#f5e6d3]/70">
          Completa estos datos y te contacto por WhatsApp para orientarte.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-[#c9a24b]/30 bg-[#3d0f1a] p-6"
        >
          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Nombre completo *
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Teléfono / WhatsApp *
            </label>
            <input
              type="tel"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="70123456"
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Servicio que te interesa *
            </label>
            <select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            >
              {SERVICIOS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Cuéntame tu situación *
            </label>
            <textarea
              required
              minLength={5}
              rows={4}
              value={situacion}
              onChange={(e) => setSituacion(e.target.value)}
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="mt-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition disabled:opacity-50"
          >
            {enviando ? "Enviando..." : "Enviar y continuar por WhatsApp"}
          </button>
        </form>
      </div>
    </main>
  );
}
