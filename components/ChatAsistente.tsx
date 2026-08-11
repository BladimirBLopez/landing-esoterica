"use client";

import { useState, useEffect, useRef } from "react";
import Tesseract from "tesseract.js";

import { NUMERO } from "@/lib/constantes";
const API_BASE = "https://juan-santiago-admin.vercel.app";
const CLOUDINARY_CLOUD = "dkq95jus0";
const CLOUDINARY_PRESET = "juan-santiago-comprobantes";
const MONTO_CONSULTA = 50;

function horaActual() {
  return new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
}

const SERVICIO_LABELS: Record<string, string> = {
  CONSULTA_TAROT: "Consulta de Tarot",
  CONSULTA_COCA: "Consulta de Hojas de Coca",
  AMARRE: "Amarre de Amor",
  UNION_PAREJA: "Unión de Parejas",
  ENDULZAMIENTO: "Endulzamiento",
  RETORNO: "Retorno del Ser Amado",
  ALEJAMIENTO: "Alejamiento de Terceros",
};

type Mensaje = { de: "bot" | "usuario"; texto: string; hora: string };
type Datos = { nombre: string | null; telefono: string | null; servicio: string | null; situacion: string | null };
type Etapa = "conversando" | "confirmarCita" | "horario" | "pago" | "enviado";

const SERVICIOS_CON_CITA = ["CONSULTA_TAROT", "CONSULTA_COCA"];

function formatearHoraSlot(iso: string) {
  return new Date(iso).toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function formatearDiaCorto(date: Date) {
  return date.toLocaleDateString("es-BO", { weekday: "short", day: "numeric", month: "short" });
}

function fechaISOSinHora(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function ChatAsistente() {
  const [abierto, setAbierto] = useState(false);
  const [etapa, setEtapa] = useState<Etapa>("conversando");
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { de: "bot", texto: "Hola, soy Sofía, la asistente del Maestro Juan Santiago 🙏 ¿En qué puedo ayudarte hoy?", hora: horaActual() },
  ]);
  const [inputTexto, setInputTexto] = useState("");
  const [pensando, setPensando] = useState(false);
  const [datos, setDatos] = useState<Datos>({ nombre: null, telefono: null, servicio: null, situacion: null });
  const [consultaId, setConsultaId] = useState<string | null>(null);

  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analizando, setAnalizando] = useState(false);
  const [montoDetectado, setMontoDetectado] = useState<string | null>(null);
  const [verificado, setVerificado] = useState<"si" | "no" | null>(null);
  const [enviandoPago, setEnviandoPago] = useState(false);

  const [diaSeleccionado, setDiaSeleccionado] = useState<Date>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [cargandoSlots, setCargandoSlots] = useState(false);
  const [horarioElegido, setHorarioElegido] = useState<string | null>(null);
  const [reservando, setReservando] = useState(false);
  const [errorHorario, setErrorHorario] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const ultimoMensajeBot = [...mensajes].reverse().find((m) => m.de === "bot")?.texto.toLowerCase() ?? "";
  const pidiendoTelefono = !datos.telefono && (ultimoMensajeBot.includes("whatsapp") || ultimoMensajeBot.includes("número") || ultimoMensajeBot.includes("numero"));
  const pidiendoTipoConsulta = !datos.servicio && Boolean(datos.nombre) && Boolean(datos.telefono);

  const dias = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    if (etapa !== "horario") return;
    setCargandoSlots(true);
    setSlots([]);
    fetch(`${API_BASE}/api/citas/disponibilidad?fecha=${fechaISOSinHora(diaSeleccionado)}`)
      .then((res) => res.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setCargandoSlots(false));
  }, [etapa, diaSeleccionado]);

  useEffect(() => {
    fetch(`${API_BASE}/api/configuracion`)
      .then((res) => res.json())
      .then((data) => {
        const mensajeConfigurado = data?.config?.mensaje_bienvenida;
        if (mensajeConfigurado) {
          setMensajes([{ de: "bot", texto: mensajeConfigurado, hora: horaActual() }]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, etapa]);

  useEffect(() => {
    if (!archivo) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(archivo);
    setPreview(url);
    analizarComprobante(archivo);
    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  async function analizarComprobante(file: File) {
    setAnalizando(true);
    setMontoDetectado(null);
    setVerificado(null);
    try {
      const { data } = await Tesseract.recognize(file, "spa");
      const numeros = (data.text.match(/\d{1,4}[.,]?\d{0,2}/g) ?? [])
        .map((n) => n.replace(",", "."))
        .map(Number)
        .filter((n) => n >= 10 && n <= 100000);
      if (numeros.length > 0) {
        const coincide = numeros.some((n) => Math.abs(n - MONTO_CONSULTA) < 1);
        setMontoDetectado(numeros.join(", "));
        setVerificado(coincide ? "si" : "no");
      }
    } catch {
      setVerificado(null);
    } finally {
      setAnalizando(false);
    }
  }

  function agregarMensaje(de: "bot" | "usuario", texto: string) {
    setMensajes((prev) => [...prev, { de, texto, hora: horaActual() }]);
  }

  function abrirChat() {
    setAbierto(true);
  }

  async function enviarMensaje(textoForzado?: string) {
    const texto = (textoForzado ?? inputTexto).trim();
    if (!texto || pensando) return;

    agregarMensaje("usuario", texto);
    setInputTexto("");
    setPensando(true);

    const historial = mensajes.map((m) => ({
      rol: m.de === "usuario" ? ("usuario" as const) : ("asistente" as const),
      texto: m.texto,
    }));

    try {
      const res = await fetch(`${API_BASE}/api/chat-ia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ historial, mensaje: texto }),
      });
      const data = await res.json();

      agregarMensaje("bot", data.respuesta ?? "Disculpa, ¿puedes repetirlo?");

      if (data.datos) {
        setDatos((prev) => ({
          nombre: data.datos.nombre ?? prev.nombre,
          telefono: data.datos.telefono ?? prev.telefono,
          servicio: data.datos.servicio ?? prev.servicio,
          situacion: data.datos.situacion ?? prev.situacion,
        }));
      }

      const respuestaEsPregunta = (data.respuesta ?? "").trim().endsWith("?");

      if (data.completo && !respuestaEsPregunta) {
        const datosFinales = {
          nombre: data.datos.nombre ?? datos.nombre,
          telefono: data.datos.telefono ?? datos.telefono,
          servicio: data.datos.servicio ?? datos.servicio,
          situacion: data.datos.situacion ?? datos.situacion,
        };
        await crearConsulta(datosFinales);
      }
    } catch {
      agregarMensaje("bot", "Hubo un problema de conexión. ¿Puedes escribirme de nuevo? 🙏");
    } finally {
      setPensando(false);
    }
  }

  async function crearConsulta(datosFinales: Datos) {
    if (datosFinales.servicio && SERVICIOS_CON_CITA.includes(datosFinales.servicio)) {
      setDatos(datosFinales);
      setTimeout(() => {
        setEtapa("confirmarCita");
      }, 400);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/chat-ia/crear-consulta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosFinales),
      });
      const data = await res.json();

      if (res.ok && data.consultaId) {
        setConsultaId(data.consultaId);
        setTimeout(() => {
          agregarMensaje("bot", `Perfecto ${datosFinales.nombre ?? ""} 🙏 Ya casi terminamos. Para confirmar tu consulta, te pido el pago de Bs ${MONTO_CONSULTA}. Escanea el QR y sube tu comprobante aquí abajo.`);
          setEtapa("pago");
        }, 400);
      }
    } catch {
      agregarMensaje("bot", "Hubo un problema al registrar tus datos. Intenta de nuevo en un momento 🙏");
    }
  }

  async function reservarHorario() {
    if (!horarioElegido) return;
    setReservando(true);
    setErrorHorario("");

    const fechaElegidaTexto = new Date(horarioElegido).toLocaleString("es-BO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    agregarMensaje("usuario", fechaElegidaTexto);

    try {
      const res = await fetch(`${API_BASE}/api/citas/reservar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: datos.nombre,
          telefono: datos.telefono,
          servicio: datos.servicio,
          fechaCita: horarioElegido,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorHorario(data.error ?? "Ese horario ya no está disponible, elige otro.");
        setHorarioElegido(null);
        setReservando(false);
        return;
      }

      setConsultaId(data.consultaId);
      const fechaTexto = new Date(horarioElegido).toLocaleString("es-BO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      agregarMensaje("bot", `Reservado para el ${fechaTexto} 🙏 Confirma con el pago de Bs ${MONTO_CONSULTA}.`);
      setEtapa("pago");
    } catch {
      setErrorHorario("Hubo un problema. Intenta de nuevo.");
    } finally {
      setReservando(false);
    }
  }

  function handleEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") enviarMensaje();
  }

  async function enviarComprobante() {
    if (!archivo || !consultaId) return;
    setEnviandoPago(true);

    try {
      const formData = new FormData();
      formData.append("file", archivo);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error();
      const uploadData = await uploadRes.json();

      const res = await fetch(`${API_BASE}/api/pagos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultaId,
          monto: MONTO_CONSULTA,
          comprobanteUrl: uploadData.secure_url,
          verificadoOcr: verificado === "si",
        }),
      });
      if (!res.ok) throw new Error();

      setEtapa("enviado");
      agregarMensaje("bot", "Listo 🙏 Recibí tu comprobante, el Maestro lo revisará y te confirmará por WhatsApp. Te voy a llevar allá para que sigan en contacto.");

      const servicioLabel = SERVICIO_LABELS[datos.servicio ?? ""] ?? "";
      const mensaje = encodeURIComponent(
        `Hola Maestro Juan Santiago, soy ${datos.nombre}. Ya envié mi consulta sobre ${servicioLabel} y subí mi comprobante de pago. Mi situación: ${datos.situacion}`
      );
      setTimeout(() => {
        window.location.href = `https://wa.me/${NUMERO}?text=${mensaje}`;
      }, 1800);
    } catch {
      agregarMensaje("bot", "Hubo un problema al enviar tu comprobante. Intenta de nuevo 🙏");
    } finally {
      setEnviandoPago(false);
    }
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
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] border border-[#d1d7db]">
      <div className="flex items-center gap-3 p-3 bg-[#075e54]" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
        <div className="h-9 w-9 rounded-full bg-[#c9a24b] flex items-center justify-center text-xs font-bold text-[#1a0505] shrink-0">
          JS
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white leading-tight">Sofía · Asistente del Maestro</p>
          <p className="text-[11px] text-white/70 leading-tight">
            {pensando ? "escribiendo..." : "en línea"}
          </p>
        </div>
        <button onClick={() => setAbierto(false)} className="text-white/80 text-lg leading-none px-1">
          ✕
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          backgroundColor: "#e5ddd5",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,0,0,0.035) 1.5px, transparent 1.5px), radial-gradient(circle at 55% 65%, rgba(0,0,0,0.035) 1.5px, transparent 1.5px), radial-gradient(circle at 85% 35%, rgba(0,0,0,0.035) 1.5px, transparent 1.5px), radial-gradient(circle at 35% 85%, rgba(0,0,0,0.035) 1.5px, transparent 1.5px)",
          backgroundSize: "60px 60px, 80px 80px, 70px 70px, 90px 90px",
        }}
      >
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-2.5 pt-1.5 pb-1 text-sm shadow-sm ${
              m.de === "bot"
                ? "bg-white text-[#111b21] self-start rounded-r-lg rounded-bl-lg"
                : "bg-[#dcf8c6] text-[#111b21] self-end ml-auto rounded-l-lg rounded-br-lg"
            }`}
            style={{ width: "fit-content", fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            <span>{m.texto}</span>
            <span className="flex items-center justify-end gap-1 -mb-0.5 mt-0.5">
              <span className="text-[10px] text-[#667781]">{m.hora}</span>
            </span>
          </div>
        ))}

        {pensando && (
          <div className="bg-white text-[#667781] self-start rounded-r-lg rounded-bl-lg px-3 py-2 text-xs shadow-sm" style={{ width: "fit-content" }}>
            escribiendo...
          </div>
        )}

        {etapa === "conversando" && pidiendoTipoConsulta && !pensando && (
          <div className="max-w-[85%] rounded-r-lg rounded-bl-lg bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => enviarMensaje("Consulta de Tarot")}
              className="w-full text-center text-[#00a884] font-medium text-sm py-3 active:bg-[#f0f2f5]"
            >
              🃏 Consulta de Tarot
            </button>
            <button
              onClick={() => enviarMensaje("Hojas de Coca")}
              className="w-full text-center text-[#00a884] font-medium text-sm py-3 border-t border-[#e9edef] active:bg-[#f0f2f5]"
            >
              🌿 Hojas de Coca
            </button>
          </div>
        )}

        {etapa === "confirmarCita" && (
          <div className="max-w-[85%] rounded-r-lg rounded-bl-lg bg-white shadow-sm overflow-hidden">
            <p className="text-sm text-[#111b21] px-4 pt-4 pb-3">
              Para tu consulta de {SERVICIO_LABELS[datos.servicio ?? ""] ?? ""}, ¿quieres elegir un horario para videollamada, o prefieres coordinar directamente con el Maestro?
            </p>
            <button
              onClick={() => {
                agregarMensaje("usuario", "Elegir horario y pagar");
                setEtapa("horario");
              }}
              className="w-full text-center text-[#00a884] font-medium text-sm py-3 border-t border-[#e9edef] active:bg-[#f0f2f5]"
            >
              Elegir horario y pagar
            </button>
            <button
              onClick={async () => {
                agregarMensaje("usuario", "Prefiero hablar con el Maestro");
                try {
                  await fetch(`${API_BASE}/api/chat-ia/crear-consulta`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datos),
                  });
                } catch {}
                const mensaje = encodeURIComponent(
                  `Hola Maestro Juan Santiago, soy ${datos.nombre ?? ""}. Quiero una ${SERVICIO_LABELS[datos.servicio ?? ""] ?? "consulta"}, pero prefiero coordinar directamente con usted. Mi situación: ${datos.situacion ?? ""}`
                );
                window.open(`https://wa.me/${NUMERO}?text=${mensaje}`, "_blank");
              }}
              className="w-full text-center text-[#00a884] font-medium text-sm py-3 border-t border-[#e9edef] active:bg-[#f0f2f5]"
            >
              Prefiero hablar con el Maestro
            </button>
          </div>
        )}

        {etapa === "horario" && (
          <div className="mt-3 rounded-xl border border-[#d1d7db] bg-white p-3 space-y-3 shadow-sm">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {dias.map((d) => {
                const activo = fechaISOSinHora(d) === fechaISOSinHora(diaSeleccionado);
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => setDiaSeleccionado(d)}
                    className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[10px] capitalize transition ${
                      activo
                        ? "border-[#075e54] bg-[#075e54] text-white"
                        : "border-[#d1d7db] text-[#54656f]"
                    }`}
                  >
                    {formatearDiaCorto(d)}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto">
              {cargandoSlots && (
                <p className="col-span-3 py-3 text-[11px] text-[#54656f] text-center">Cargando horarios...</p>
              )}
              {!cargandoSlots && slots.length === 0 && (
                <p className="col-span-3 py-3 text-[11px] text-[#54656f] text-center">No hay horarios libres este día</p>
              )}
              {!cargandoSlots &&
                slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setHorarioElegido(s)}
                    className={`rounded-md border py-1.5 text-[11px] transition ${
                      horarioElegido === s
                        ? "border-[#075e54] bg-[#075e54]/10 text-[#075e54] font-semibold"
                        : "border-[#d1d7db] text-[#111b21] hover:border-[#075e54]/50"
                    }`}
                  >
                    {formatearHoraSlot(s)}
                  </button>
                ))}
            </div>

            {errorHorario && <p className="text-[11px] text-[#e64a19] text-center">{errorHorario}</p>}

            <button
              onClick={reservarHorario}
              disabled={!horarioElegido || reservando}
              className="w-full rounded-lg bg-[#25D366] text-white font-medium text-xs py-2.5 disabled:opacity-50"
            >
              {reservando ? "Reservando..." : "Confirmar horario"}
            </button>
          </div>
        )}

        {etapa === "pago" && (
          <div className="mt-3 rounded-xl border border-[#d1d7db] bg-white p-3 space-y-3 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-[#d1d7db] bg-[#f0f2f5] p-2 text-center">
                <img
                  src="https://res.cloudinary.com/dkq95jus0/image/upload/qr-union"
                  alt="QR Union"
                  className="mx-auto rounded w-full"
                />
                <p className="text-[10px] text-[#54656f] mt-1">Unión</p>
              </div>
              <div className="rounded-lg border border-[#d1d7db] bg-[#f0f2f5] p-2 text-center">
                <img
                  src="https://res.cloudinary.com/dkq95jus0/image/upload/qr-tigomoney"
                  alt="QR Tigo Money"
                  className="mx-auto rounded w-full"
                />
                <p className="text-[10px] text-[#54656f] mt-1">Tigo Money</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              <label className="flex flex-col items-center gap-1 cursor-pointer">
                <span className="flex items-center justify-center h-11 w-11 rounded-full bg-[#f0f2f5] text-[#54656f]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5z"/>
                  </svg>
                </span>
                <span className="text-[10px] text-[#54656f]">Galería</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
              </label>

              <label className="flex flex-col items-center gap-1 cursor-pointer">
                <span className="flex items-center justify-center h-11 w-11 rounded-full bg-[#f0f2f5] text-[#54656f]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M9 3l-1.5 2H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3.5L15 3H9zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                  </svg>
                </span>
                <span className="text-[10px] text-[#54656f]">Cámara</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
              </label>
            </div>

            {archivo && (
              <p className="text-[11px] text-[#54656f] text-center">📎 {archivo.name}</p>
            )}

            {preview && <img src={preview} alt="Vista previa" className="rounded-lg max-h-32 mx-auto" />}

            {analizando && <p className="text-[11px] text-[#54656f] text-center">Analizando comprobante...</p>}
            {!analizando && verificado === "si" && (
              <p className="text-[11px] text-[#25D366] text-center">✓ Monto detectado coincide ({montoDetectado})</p>
            )}
            {!analizando && verificado === "no" && (
              <p className="text-[11px] text-[#e64a19] text-center">⚠️ No pudimos confirmar el monto ({montoDetectado}). El Maestro lo revisará igual.</p>
            )}

            <button
              onClick={enviarComprobante}
              disabled={!archivo || enviandoPago}
              className="w-full rounded-lg bg-[#25D366] text-white font-medium text-xs py-2.5 disabled:opacity-50"
            >
              {enviandoPago ? "Enviando..." : "Enviar comprobante"}
            </button>

            <a
              href={`https://wa.me/${NUMERO}?text=${encodeURIComponent(
                `Hola Maestro Juan Santiago, soy ${datos.nombre ?? ""}. Quiero consultar sobre ${SERVICIO_LABELS[datos.servicio ?? ""] ?? "una consulta"} pero prefiero hablar directamente antes de pagar. Mi situación: ${datos.situacion ?? ""}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-[11px] text-[#54656f] underline pt-1"
            >
              Prefiero llamar al Maestro
            </a>
          </div>
        )}
      </div>

      {etapa === "conversando" && (
        <div className="p-2 bg-[#f0f2f5] flex gap-2 items-center">
          <input
            type={pidiendoTelefono ? "tel" : "text"}
            inputMode={pidiendoTelefono ? "numeric" : "text"}
            value={inputTexto}
            onChange={(e) => {
              const valor = pidiendoTelefono ? e.target.value.replace(/[^\d]/g, "") : e.target.value;
              setInputTexto(valor);
            }}
            onKeyDown={handleEnter}
            disabled={pensando}
            className="flex-1 rounded-full border-0 bg-white px-4 py-2.5 text-sm text-[#111b21] outline-none placeholder:text-[#8696a0] disabled:opacity-60"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            placeholder={pidiendoTelefono ? "Tu número de WhatsApp" : "Escribe un mensaje"}
          />
          <button
            onClick={() => enviarMensaje()}
            disabled={pensando}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-[#00a884] text-white shrink-0 disabled:opacity-60"
          >
            ➤
          </button>
        </div>
      )}
    </div>
  );
}
