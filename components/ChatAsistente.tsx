"use client";

import { useState, useEffect, useRef } from "react";
import Tesseract from "tesseract.js";

const NUMERO = "59175928656";
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
type Etapa = "conversando" | "horario" | "pago" | "enviado";

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
    { de: "bot", texto: "Hola, soy el asistente del Maestro Juan Santiago 🙏 ¿En qué puedo ayudarte hoy?", hora: horaActual() },
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

  async function enviarMensaje() {
    const texto = inputTexto.trim();
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

      if (data.completo) {
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
      setTimeout(() => {
        agregarMensaje("bot", `Perfecto ${datosFinales.nombre ?? ""} 🙏 Elige el día y horario que más te acomode para tu videollamada.`);
        setEtapa("horario");
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
      agregarMensaje("bot", `Quedó reservado para el ${fechaTexto} 🙏 Tienes 40 minutos para confirmar el pago de Bs ${MONTO_CONSULTA}. Escanea el QR y sube tu comprobante.`);
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
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] border border-[#2a2f32]">
      <div className="flex items-center gap-3 p-3 bg-[#005e54]">
        <div className="h-9 w-9 rounded-full bg-[#c9a24b] flex items-center justify-center text-xs font-bold text-[#1a0505] shrink-0">
          JS
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white leading-tight">Maestro Juan Santiago</p>
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
          backgroundColor: "#0b141a",
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.02) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-2.5 pt-1.5 pb-1 text-sm shadow-sm ${
              m.de === "bot"
                ? "bg-[#202c33] text-[#e9edef] self-start rounded-r-lg rounded-bl-lg"
                : "bg-[#005c4b] text-[#e9edef] self-end ml-auto rounded-l-lg rounded-br-lg"
            }`}
            style={{ width: "fit-content", fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            <span>{m.texto}</span>
            <span className="flex items-center justify-end gap-1 -mb-0.5 mt-0.5">
              <span className="text-[10px] text-[#8696a0]">{m.hora}</span>
            </span>
          </div>
        ))}

        {pensando && (
          <div className="bg-[#202c33] text-[#8696a0] self-start rounded-r-lg rounded-bl-lg px-3 py-2 text-xs" style={{ width: "fit-content" }}>
            escribiendo...
          </div>
        )}

        {etapa === "horario" && (
          <div className="mt-3 rounded-xl border border-[#2a3942] bg-[#111b21] p-3 space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {dias.map((d) => {
                const activo = fechaISOSinHora(d) === fechaISOSinHora(diaSeleccionado);
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => setDiaSeleccionado(d)}
                    className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[10px] capitalize transition ${
                      activo
                        ? "border-[#c9a24b] bg-[#c9a24b]/20 text-[#f0d78c]"
                        : "border-[#2a3942] text-[#8696a0]"
                    }`}
                  >
                    {formatearDiaCorto(d)}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto">
              {cargandoSlots && (
                <p className="col-span-3 py-3 text-[11px] text-[#8696a0] text-center">Cargando horarios...</p>
              )}
              {!cargandoSlots && slots.length === 0 && (
                <p className="col-span-3 py-3 text-[11px] text-[#8696a0] text-center">No hay horarios libres este día</p>
              )}
              {!cargandoSlots &&
                slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setHorarioElegido(s)}
                    className={`rounded-md border py-1.5 text-[11px] transition ${
                      horarioElegido === s
                        ? "border-[#c9a24b] bg-[#c9a24b]/20 text-[#f0d78c]"
                        : "border-[#2a3942] text-[#e9edef] hover:border-[#c9a24b]/50"
                    }`}
                  >
                    {formatearHoraSlot(s)}
                  </button>
                ))}
            </div>

            {errorHorario && <p className="text-[11px] text-[#f97316] text-center">{errorHorario}</p>}

            <button
              onClick={reservarHorario}
              disabled={!horarioElegido || reservando}
              className="w-full rounded-lg bg-[#c9a24b] text-[#0f1115] font-medium text-xs py-2.5 disabled:opacity-50"
            >
              {reservando ? "Reservando..." : "Confirmar horario"}
            </button>
          </div>
        )}

        {etapa === "pago" && (
          <div className="mt-3 rounded-xl border border-[#2a3942] bg-[#111b21] p-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-[#2a3942] bg-[#0b141a] p-2 text-center">
                <img
                  src="https://res.cloudinary.com/dkq95jus0/image/upload/qr-union"
                  alt="QR Union"
                  className="mx-auto rounded w-full"
                />
                <p className="text-[10px] text-[#8696a0] mt-1">Unión</p>
              </div>
              <div className="rounded-lg border border-[#2a3942] bg-[#0b141a] p-2 text-center">
                <img
                  src="https://res.cloudinary.com/dkq95jus0/image/upload/qr-tigomoney"
                  alt="QR Tigo Money"
                  className="mx-auto rounded w-full"
                />
                <p className="text-[10px] text-[#8696a0] mt-1">Tigo Money</p>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
              className="w-full text-[11px] text-[#8696a0] file:mr-2 file:py-1.5 file:px-2.5 file:rounded-md file:border-0 file:bg-[#c9a24b] file:text-[#0f1115] file:text-[11px] file:font-medium"
            />

            {preview && <img src={preview} alt="Vista previa" className="rounded-lg max-h-32 mx-auto" />}

            {analizando && <p className="text-[11px] text-[#8696a0] text-center">Analizando comprobante...</p>}
            {!analizando && verificado === "si" && (
              <p className="text-[11px] text-[#22c55e] text-center">✓ Monto detectado coincide ({montoDetectado})</p>
            )}
            {!analizando && verificado === "no" && (
              <p className="text-[11px] text-[#f97316] text-center">⚠️ No pudimos confirmar el monto ({montoDetectado}). El Maestro lo revisará igual.</p>
            )}

            <button
              onClick={enviarComprobante}
              disabled={!archivo || enviandoPago}
              className="w-full rounded-lg bg-[#c9a24b] text-[#0f1115] font-medium text-xs py-2.5 disabled:opacity-50"
            >
              {enviandoPago ? "Enviando..." : "Enviar comprobante"}
            </button>
          </div>
        )}
      </div>

      {etapa === "conversando" && (
        <div className="p-2 bg-[#202c33] flex gap-2 items-center">
          <input
            type="text"
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
            onKeyDown={handleEnter}
            disabled={pensando}
            className="flex-1 rounded-full border-0 bg-[#2a3942] px-4 py-2.5 text-sm text-[#e9edef] outline-none placeholder:text-[#8696a0] disabled:opacity-60"
            placeholder="Escribe un mensaje"
            autoFocus
          />
          <button
            onClick={enviarMensaje}
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
