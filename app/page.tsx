import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FaqAccordion from "@/components/FaqAccordion";

const NUMERO = "59100000000"; // TODO: reemplazar con el número real
const TELEFONO_VISIBLE = "(+591) 000 00000"; // TODO: reemplazar

const servicios = [
  {
    titulo: "Amarres de Amor",
    descripcion: "¿Anhelas recuperar a tu ex o amarrar a esa persona especial? Con la sabiduría heredada del Tatabombori, mis amarres de amor garantizan resultados duraderos.",
    imagen: "https://picsum.photos/id/1011/900/700",
    mensaje: "Hola Maestro Juan Santiago, me interesa un Amarre de Amor. ¿Podría darme más información?",
    cta: "Solicitar un Amarre",
  },
  {
    titulo: "Limpias y Rituales de Protección",
    descripcion: "Rituales ancestrales del Norte de Potosí para liberar energías negativas, proteger tu hogar y atraer armonía a tu vida.",
    imagen: "https://picsum.photos/id/1015/900/700",
    mensaje: "Hola Maestro, quiero saber más sobre las Limpias y Rituales de Protección.",
    cta: "Consultar al Maestro",
  },
  {
    titulo: "Trabajos de Prosperidad",
    descripcion: "Rituales heredados de generación en generación para abrir caminos, atraer prosperidad y mejorar tu situación económica.",
    imagen: "https://picsum.photos/id/1016/900/700",
    mensaje: "Hola Maestro, me interesa un Trabajo de Prosperidad.",
    cta: "Solicitar información",
  },
];

const faq = [
  { pregunta: "¿Qué casos atiendes?", respuesta: "Recuperación de pareja, limpias, protección y trabajos de prosperidad." },
  { pregunta: "¿La consulta es confidencial?", respuesta: "Sí. Tu caso y toda la información que compartes son confidenciales." },
  { pregunta: "¿Atiendes a distancia?", respuesta: "Sí. Atiendo por WhatsApp a personas de todo el país." },
  { pregunta: "¿De dónde viene tu conocimiento?", respuesta: "Soy heredero del Tatabombori, una tradición ancestral del Norte de Potosí transmitida por generaciones." },
];

const tagsColumna1 = ["Amarres de Amor", "Limpias Espirituales", "Rituales de Protección", "Curanderismo Ancestral"];
const tagsColumna2 = ["Trabajos de Prosperidad", "Sabiduría del Tatabombori", "Norte de Potosí", "Magia Blanca"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a0505] text-[#f5e6d3]">
      {/* Hero */}
      <section className="relative flex flex-col items-center gap-4 overflow-hidden px-6 py-24 text-center">
        <Image
          src="https://picsum.photos/id/1043/1600/1200"
          alt="Fondo ritual"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a0505]/80" />
        <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">
          Curanderismo ancestral · Norte de Potosí
        </p>
        <h1 className="font-serif text-5xl font-bold uppercase tracking-wide text-[#c9a24b] drop-shadow-lg sm:text-6xl">
          Maestro Juan Santiago
        </h1>
        <p className="text-lg text-[#f5e6d3]/90">Heredero del Tatabombori</p>

        <h2 className="mt-4 max-w-xl font-serif text-2xl font-bold sm:text-3xl">
          ¿Quieres que tu ex regrese a tu lado sin rogarle?
        </h2>
        <p className="max-w-md text-[#f5e6d3]/80">
          Realizo amarres de amor, limpias y rituales de protección con la sabiduría ancestral heredada de generación en generación.
        </p>

        <WhatsAppButton
          numero={NUMERO}
          mensaje="Hola Maestro Juan Santiago, quiero recuperar a mi pareja."
          texto="Quiero recuperar a mi pareja"
          className="text-base px-8 py-4"
        />
        <p className="text-sm text-[#f5e6d3]/60">{TELEFONO_VISIBLE}</p>

        <ul className="mt-4 flex flex-col gap-2 text-sm text-[#f5e6d3]/90">
          <li>✓ Recupera la comunicación</li>
          <li>✓ Fortalece la relación</li>
          <li>✓ Vuelve a sentir su cariño</li>
        </ul>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="px-6 py-16">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold text-[#c9a24b]">
          Conoce mis servicios
        </h2>
        <div className="mx-auto flex max-w-4xl flex-col gap-16">
          {servicios.map((s, i) => (
            <div
              key={s.titulo}
              className={`flex flex-col items-center gap-6 sm:flex-row ${
                i % 2 === 1 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:w-1/2">
                <Image src={s.imagen} alt={s.titulo} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-3 text-center sm:w-1/2 sm:text-left">
                <h3 className="font-serif text-2xl font-bold text-[#c9a24b]">{s.titulo}</h3>
                <p className="text-[#f5e6d3]/80">{s.descripcion}</p>
                <div className="flex flex-col items-center gap-1 sm:items-start">
                  <WhatsAppButton numero={NUMERO} mensaje={s.mensaje} texto={s.cta} />
                  <span className="text-sm text-[#f5e6d3]/60">{TELEFONO_VISIBLE}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo iniciar */}
      <section className="bg-[#2b0d0d] px-6 py-16 text-center">
        <h2 className="mb-2 font-serif text-3xl font-bold text-[#c9a24b]">¿Cómo iniciar?</h2>
        <p className="mb-10 text-[#f5e6d3]/70">Háblame por WhatsApp en 3 pasos</p>
        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-2 text-3xl">1</div>
            <p className="font-semibold">Cuéntame tu caso</p>
          </div>
          <div>
            <div className="mb-2 text-3xl">2</div>
            <p className="font-semibold">Analizo tu situación</p>
          </div>
          <div>
            <div className="mb-2 text-3xl">3</div>
            <p className="font-semibold">Recibe orientación personalizada</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-1">
          <WhatsAppButton numero={NUMERO} mensaje="Hola Maestro, quiero hablar con usted." texto="Quiero hablar con el Maestro" className="text-base px-8 py-4" />
          <span className="text-sm text-[#f5e6d3]/60">{TELEFONO_VISIBLE}</span>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-16">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-[#c9a24b]">
          Preguntas Frecuentes
        </h2>
        <FaqAccordion items={faq} />
      </section>

      {/* Resultados / testimonios */}
      <section className="bg-[#2b0d0d] px-6 py-16 text-center">
        <h2 className="mb-2 font-serif text-3xl font-bold text-[#c9a24b]">
          Resultados que hablan por sí solos
        </h2>
        <p className="mb-8 text-[#f5e6d3]/70">Más de [X] personas ya confiaron en mi trabajo</p>
        <div className="mb-10 flex flex-col items-center gap-1">
          <WhatsAppButton numero={NUMERO} mensaje="Hola Maestro, quiero recibir información." texto="Quiero recibir información" />
          <span className="text-sm text-[#f5e6d3]/60">{TELEFONO_VISIBLE}</span>
        </div>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-[#c9a24b]/20 bg-[#1a0505] p-6 text-sm text-[#f5e6d3]/70">
              [Espacio para testimonio #{i}]
            </div>
          ))}
        </div>
      </section>

      {/* Tags / cierre */}
      <section className="px-6 py-16 text-center">
        <h2 className="mb-10 font-serif text-2xl font-bold text-[#c9a24b] sm:text-3xl">
          Recupera a tu ex pareja con la sabiduría del Tatabombori
        </h2>
        <div className="mx-auto flex max-w-md flex-col gap-2 text-sm text-[#f5e6d3]/80 sm:flex-row sm:justify-between">
          <ul className="flex flex-col gap-1">
            {tagsColumna1.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <ul className="flex flex-col gap-1">
            {tagsColumna2.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-8 text-center text-xs text-[#f5e6d3]/50">
        <p>* Servicio exclusivo para mayores de 18 años, según legislaciones vigentes.</p>
        <p>** No se garantiza ningún resultado específico y dichos resultados pueden variar según los casos.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#c9a24b]/20 px-6 py-6 text-center text-xs text-[#f5e6d3]/60">
        <p className="mt-4">© 2026 Maestro Juan Santiago</p>
      </footer>

      <FloatingWhatsApp numero={NUMERO} mensaje="Hola Maestro Juan Santiago, quisiera más información." />
    </main>
  );
}
