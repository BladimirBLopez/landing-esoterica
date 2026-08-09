import type { Metadata } from "next";
import type { Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import FaqAccordion from "@/components/FaqAccordion";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const NUMERO = "59175928656";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Amarres de Amor Maestro Juan Santiago",
  description: "Resuelve tus dudas sobre amarres de amor, consultas de Tarot y Hojas de Coca, tiempos de trabajo y confidencialidad con el Maestro Juan Santiago en Bolivia.",
};

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Amarres de Amor Maestro Juan Santiago",
  description: "Resuelve tus dudas sobre amarres de amor, consultas de Tarot y Hojas de Coca, tiempos de trabajo y confidencialidad con el Maestro Juan Santiago en Bolivia.",
};

const faq = [
  {
    pregunta: "¿Cómo empieza el trabajo?",
    respuesta: "Primero se hace una consulta con las Sagradas Hojas de Coca y el Tarot para ver tu situación real: si hay amor verdadero, si hay bloqueos o terceros interfiriendo, y qué trabajo necesita exactamente tu caso.",
  },
  {
    pregunta: "¿Qué necesito para la consulta?",
    respuesta: "Nombres completos de ambos, fechas de nacimiento, y contarme tu situación actual.",
  },
  {
    pregunta: "¿La consulta es confidencial?",
    respuesta: "Sí, 100% confidencial. Trabajo serio, con fe y respeto.",
  },
  {
    pregunta: "¿Cuánto tiempo toma ver resultados?",
    respuesta: "Depende del trabajo: entre 5 y 21 días según el caso. En la consulta te explico el tiempo estimado para tu situación particular.",
  },
  {
    pregunta: "¿Atienden a distancia?",
    respuesta: "Sí. Atiendo en Bolivia y también a distancia a otros países por WhatsApp, sin importar dónde te encuentres.",
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#6b1330] to-[#4a0916] text-[#f5e6d3]">
      <section className="relative overflow-hidden px-6 py-16">
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute -right-10 top-0 h-48 w-48 text-[#c9a24b] opacity-[0.08]">
          <path fill="currentColor" d="M12 21s-6.7-4.35-9.3-8.1C1.1 10.6 1.6 7.4 4.2 5.9c2.2-1.3 4.9-.6 6.3 1.4l1.5 2 1.5-2c1.4-2 4.1-2.7 6.3-1.4 2.6 1.5 3.1 4.7 1.5 7-2.6 3.75-9.3 8.1-9.3 8.1z"/>
        </svg>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute -left-10 bottom-0 h-44 w-44 text-[#c9a24b] opacity-[0.08]">
          <path fill="currentColor" d="M12 21s-6.7-4.35-9.3-8.1C1.1 10.6 1.6 7.4 4.2 5.9c2.2-1.3 4.9-.6 6.3 1.4l1.5 2 1.5-2c1.4-2 4.1-2.7 6.3-1.4 2.6 1.5 3.1 4.7 1.5 7-2.6 3.75-9.3 8.1-9.3 8.1z"/>
        </svg>
        <div className="relative z-10 mx-auto mb-6 flex items-center justify-center gap-2 text-[#c9a24b]">
          <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
          <span>♥</span>
          <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
        </div>
        <RevealOnScroll>
          <h1 className="mb-10 text-center text-4xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>
            Preguntas Frecuentes
          </h1>
        </RevealOnScroll>
        <FaqAccordion items={faq} />
      </section>

      <FloatingWhatsApp
        numero={NUMERO}
        mensaje="¡Hola! Tengo una pregunta sobre los servicios del Maestro Juan Santiago."
      />
    </main>
  );
}
