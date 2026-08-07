"use client";

import { useState } from "react";

const NUMERO = "59175928656";
const API_URL = "https://juan-santiago-admin.vercel.app/api/leads";

const SERVICIOS = [
  { value: "AMARRE", label: "Amarre de Amor" },
  { value: "UNION_PAREJA", label: "Unión de Parejas" },
  { value: "ENDULZAMIENTO", label: "Endulzamiento" },
  { value: "RETORNO", label: "Retorno del Ser Amado" },
  { value: "ALEJAMIENTO", label: "Alejamiento de Terceros" },
];

type Paso = "inicio" | "nombre" | "servicio" | "situacion" | "telefono" | "enviando" | "listo";

type Mensaje = { de: "bot" | "usuario"; texto: string };

export default function ChatAsistente() {
  const [abierto, setAbierto] = useState(false);
  const [paso, setPaso] = useState<Paso>("inicio");
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { de: "bot", texto: "Hola, soy el asistente del Maestro Juan Santiago 🙏 ¿Cuál es tu nombre completo?" },
  ]);
  const [inputTexto, setInputTexto] = useState("");
  const [datos, setDatos] = useState({
    nombre: "",
    servicio: "",
    situacion: "",
    telefono: "",
  });

  function agregarMensaje(de: "bot" | "usuario", texto: string) {
    setMensajes((prev) => [...prev, { de, texto }]);
  }

  function abrirChat() {
    setAbierto(true);
    setPaso("nombre");
  }

  function enviarNombre() {
    if (inputTexto.trim().length < 3) return;
    agregarMensaje("usuario", inputTexto);
    setDatos((d) => ({ ...d, nombre: inputTexto }));
    setInputTexto("");
    setTimeout(() => {
      agregarMensaje("bot", "¿Qué servicio te interesa?");
      setPaso("servicio");
    }, 400);
  }

  function elegirServicio(servicio: string, label: string) {
    agregarMensaje("usuario", label);
    setDatos((d) => ({ ...d, servicio }));
    setTimeout(() => {
      agregarMensaje("bot", "Cuéntame un poco de tu situación 💭");
      setPaso("situacion");
    }, 400);
  }

  function enviarSituacion() {
    if (inputTexto.trim().length < 10) return;
    agregarMensaje("usuario", inputTexto);
    setDatos((d) => ({ ...d, situacion: inputTexto }));
    setInputTexto("");
    setTimeout(() => {
      agregarMensaje("bot", "¿Cuál es tu número de WhatsApp?");
      setPaso("telefono");
    }, 400);
  }

  async function enviarTelefono() {
    if (inputTexto.trim().length < 7) return;
    agregarMensaje("usuario", inputTexto);
    const telefono = inputTexto;
    setInputTexto("");
    setPaso("enviando");

    const datosFinales = { ...datos, telefono };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: datosFinales.nombre,
          telefono: datosFinales.telefono,
          servicio: datosFinales.servicio,
          situacion: datosFinales.situacion,
        }),
      });

      agregarMensaje("bot", "Listo 🙏 Te voy a llevar a WhatsApp para continuar la conversación con el Maestro.");
      setPaso("listo");

      const servicioLabel = SERVICIOS.find((s) => s.value === datosFinales.servicio)?.label ?? "";
      const mensaje = encodeURIComponent(
        `Hola Maestro Juan Santiago, soy ${datosFinales.nombre}. Ya envié mi consulta sobre ${servicioLabel}. Mi situación: ${datosFinales.situacion}`
      );

      setTimeout(() => {
        window.location.href = `https://wa.me/${NUMERO}?text=${mensaje}`;
      }, 1500);
    } catch {
      agregarMensaje("bot", "Hubo un problema, mejor escríbeme directo por WhatsApp 🙏");
      setPaso("listo");
    }
  }

  function handleEnter(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    if (paso === "nombre") enviarNombre();
    if (paso === "situacion") enviarSituacion();
    if (paso === "telefono") enviarTelefono();
  }

  if (!abierto) {
    return (
      <button
        onClick={abrirChat}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e6c476] to-[#c9a24b] px-5 py-3 text-sm font-bold text-[#1a0505] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        💬 Habla con el Maestro
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm rounded-2xl border border-[#c9a24b]/30 bg-[#1a0505] shadow-2xl flex flex-col max-h-[75vh]">
      <div className="flex items-center justify-between p-4 border-b border-[#c9a24b]/20">
        <p className="text-sm font-semibold text-[#f0d78c]" style={{ fontFamily: "var(--font-cinzel)" }}>
          Maestro Juan Santiago
        </p>
        <button onClick={() => setAbierto(false)} className="text-[#f5e6d3]/60 text-lg leading-none">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
              m.de === "bot"
                ? "bg-[#3d0f1a] text-[#f5e6d3] self-start"
                : "bg-[#c9a24b] text-[#1a0505] self-end ml-auto"
            }`}
          >
            {m.texto}
          </div>
        ))}

        {paso === "servicio" && (
          <div className="flex flex-col gap-2">
            {SERVICIOS.map((s) => (
              <button
                key={s.value}
                onClick={() => elegirServicio(s.value, s.label)}
                className="text-left text-sm rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-[#f5e6d3] hover:bg-[#3d0f1a]"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {["nombre", "situacion", "telefono"].includes(paso) && (
        <div className="p-3 border-t border-[#c9a24b]/20 flex gap-2">
          <input
            type={paso === "telefono" ? "tel" : "text"}
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            onKeyDown={handleEnter}
            className="flex-1 rounded-lg border border-[#c9a24b]/30 bg-[#2a0a12] px-3 py-2 text-sm text-[#f5e6d3] outline-none"
            placeholder="Escribe aquí..."
            autoFocus
          />
          <button
            onClick={() => {
              if (paso === "nombre") enviarNombre();
              if (paso === "situacion") enviarSituacion();
              if (paso === "telefono") enviarTelefono();
            }}
            className="rounded-lg bg-[#c9a24b] px-4 text-sm font-semibold text-[#1a0505]"
          >
            →
          </button>
        </div>
      )}

      {paso === "enviando" && (
        <div className="p-4 text-center text-xs text-[#f5e6d3]/60">Enviando...</div>
      )}
    </div>
  );
}
