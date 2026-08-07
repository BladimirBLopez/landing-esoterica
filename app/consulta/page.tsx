"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const schema = z.object({
  nombre: z.string().min(3, "Escribe tu nombre completo"),
  fechaNacimiento: z.string().optional(),
  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .regex(/^\d+$/, "Solo números, sin espacios ni guiones"),
  servicio: z.string().min(1, "Elige un servicio"),
  situacion: z.string().min(10, "Cuéntanos un poco más de tu situación"),
});

type FormData = z.infer<typeof schema>;

export default function ConsultaPage() {
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { servicio: "AMARRE" },
  });

  async function onSubmit(data: FormData) {
    setErrorEnvio("");
    setEnviando(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          fechaNacimiento: data.fechaNacimiento || null,
          telefono: data.telefono,
          servicio: data.servicio,
          situacion: data.situacion,
        }),
      });

      if (!res.ok) throw new Error("Error al enviar");

      const servicioLabel =
        SERVICIOS.find((s) => s.value === data.servicio)?.label ?? data.servicio;

      const mensaje = encodeURIComponent(
        `Hola Maestro Juan Santiago, soy ${data.nombre}. Ya envié mi consulta sobre ${servicioLabel}. Mi situación: ${data.situacion}`
      );

      window.location.href = `https://wa.me/${NUMERO}?text=${mensaje}`;
    } catch {
      setErrorEnvio("Hubo un problema al enviar. Intenta de nuevo o escríbeme directo por WhatsApp.");
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-2xl border border-[#c9a24b]/30 bg-[#3d0f1a] p-6"
        >
          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Nombre completo *
            </label>
            <input
              type="text"
              {...register("nombre")}
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            />
            {errors.nombre && (
              <p className="text-xs text-[#e8752c] mt-1">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              {...register("fechaNacimiento")}
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Teléfono / WhatsApp *
            </label>
            <input
              type="tel"
              {...register("telefono")}
              placeholder="70123456"
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            />
            {errors.telefono && (
              <p className="text-xs text-[#e8752c] mt-1">{errors.telefono.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-[#f5e6d3]/80">
              Servicio que te interesa *
            </label>
            <select
              {...register("servicio")}
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
              {...register("situacion")}
              rows={4}
              className="w-full rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] outline-none focus:border-[#c9a24b]"
            />
            {errors.situacion && (
              <p className="text-xs text-[#e8752c] mt-1">{errors.situacion.message}</p>
            )}
          </div>

          {errorEnvio && <p className="text-sm text-red-400">{errorEnvio}</p>}

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
