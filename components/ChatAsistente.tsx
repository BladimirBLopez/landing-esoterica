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
  const [error, setError] = useState("");
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
    if (inputTexto.trim().length < 3) {
      setError("Escribe tu nombre completo (mínimo 3 letras)");
      return;
    }
    setError("");
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
    if (inputTexto.trim().length < 10) {
      setError("Cuéntame un poco más, al menos 10 caracteres");
      return;
    }
    setError("");
    agregarMensaje("usuario", inputTexto);
    setDatos((d) => ({ ...d, situacion: inputTexto }));
    setInputTexto("");
    setTimeout(() => {
      agregarMensaje("bot", "¿Cuál es tu número de WhatsApp?");
      setPaso("telefono");
    }, 400);
  }

  async function enviarTelefono() {
    const soloNumeros = inputTexto.replace(/\D/g, "");
    if (soloNumeros.length < 8) {
      setError("El número debe tener al menos 8 dígitos");
      return;
    }
    setError("");
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
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-16 w-16 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white">
          <path d="M16.04 3C9.37 3 3.98 8.39 3.98 15.06c0 2.24.6 4.34 1.65 6.15L3 29l7.98-2.6a12.03 12.03 0 0 0 5.06 1.11h.01c6.67 0 12.06-5.39 12.06-12.06C28.11 8.79 22.71 3 16.04 3zm0 21.9h-.01a10 10 0 0 1-5.12-1.4l-.37-.22-3.8 1.24 1.26-3.71-.24-.38a9.9 9.9 0 0 1-1.52-5.27C6.24 9.5 10.7 5.04 16.05 5.04c2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 0 1 2.88 6.96c0 5.35-4.46 9.8-9.85 9.8zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.05 1.02-1.05 2.5 1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[75vh] border border-[#2a2f32]">
      <div className="flex items-center gap-3 p-3 bg-[#005e54]">
        <div className="h-9 w-9 rounded-full bg-[#c9a24b] flex items-center justify-center text-xs font-bold text-[#1a0505] shrink-0">
          JS
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white leading-tight">
            Maestro Juan Santiago
          </p>
          <p className="text-[11px] text-white/70 leading-tight">en línea</p>
        </div>
        <button onClick={() => setAbierto(false)} className="text-white/80 text-lg leading-none px-1">
          ✕
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{
          backgroundColor: "#0b141a",
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.02) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-3 py-2 text-sm shadow-sm ${
              m.de === "bot"
                ? "bg-[#202c33] text-[#e9edef] self-start rounded-r-lg rounded-bl-lg"
                : "bg-[#005c4b] text-[#e9edef] self-end ml-auto rounded-l-lg rounded-br-lg"
            }`}
            style={{ width: "fit-content" }}
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
                className="text-left text-sm rounded-lg border border-[#2a3942] bg-[#202c33] px-3 py-2 text-[#e9edef] hover:bg-[#2a3942]"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && ["nombre", "situacion", "telefono"].includes(paso) && (
        <div className="px-3 py-1.5 bg-[#202c33] text-xs text-[#ff6b6b]">
          {error}
        </div>
      )}

      {["nombre", "situacion", "telefono"].includes(paso) && (
        <div className="p-2 bg-[#202c33] flex gap-2 items-center">
          <input
            type={paso === "telefono" ? "tel" : "text"}
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            onKeyDown={handleEnter}
            className="flex-1 rounded-full border-0 bg-[#2a3942] px-4 py-2.5 text-sm text-[#e9edef] outline-none placeholder:text-[#8696a0]"
            placeholder="Escribe un mensaje"
            autoFocus
          />
          <button
            onClick={() => {
              if (paso === "nombre") enviarNombre();
              if (paso === "situacion") enviarSituacion();
              if (paso === "telefono") enviarTelefono();
            }}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-[#00a884] text-white shrink-0"
          >
            ➤
          </button>
        </div>
      )}

      {paso === "enviando" && (
        <div className="p-4 text-center text-xs text-[#8696a0] bg-[#0b141a]">Enviando...</div>
      )}
    </div>
  );
}
