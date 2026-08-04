import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FaqAccordion from "@/components/FaqAccordion";

const NUMERO = "51900000000"; // TODO: reemplazar con el número real

const servicios = [
  {
    titulo: "Amarres de Amor",
    descripcion: "¿Anhelas recuperar a tu ex o amarrar a esa persona especial? Mis Amarres de Amor garantizan resultados duraderos.",
    imagen: "https://picsum.photos/id/1011/900/700",
    mensaje: "Hola, me interesa un Amarre de Amor. ¿Podría darme más información?",
    cta: "Solicitar un Amarre",
  },
  {
    titulo: "Hechizos de Amor",
    descripcion: "Para influir positivamente en tus relaciones y atraer el amor que mereces, mis Hechizos de Amor son una herramienta poderosa.",
    imagen: "https://picsum.photos/id/1015/900/700",
    mensaje: "Hola, quiero saber más sobre los Hechizos de Amor.",
    cta: "Preguntar a la Maestra",
  },
  {
    titulo: "Rituales para el Amor",
    descripcion: "Transforma tu vida sentimental con poderosos rituales diseñados para atraer el amor verdadero y fortalecer las relaciones.",
    imagen: "https://picsum.photos/id/1016/900/700",
    mensaje: "Hola, me interesa hacer un Ritual para el Amor.",
    cta: "Hacer un Ritual",
  },
];

const faq = [
  { pregunta: "¿Qué casos atiendes?", respuesta: "Recuperar a tu ex, conflictos de pareja y amarres de amor." },
  { pregunta: "¿La consulta es confidencial?", respuesta: "Sí. Tu caso y toda la información que compartes son confidenciales." },
  { pregunta: "¿Atiendes a distancia?", respuesta: "Sí. Atiendo por WhatsApp a personas de cualquier lugar." },
  { pregunta: "¿Cada caso es diferente?", respuesta: "Sí. Analizo tu situación y te oriento según tu caso particular." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a0505] text-[#f5e6d3]">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#c9a24b]/20 bg-[#1a0505]/95 px-6 py-4 backdrop-blur">
        <span className="font-serif text-xl font-bold tracking-wide text-[#c9a24b]">Maestra [Nombre]</span>
        <a href={`tel:+${NUMERO}`} className="hidden text-sm text-[#f5e6d3]/70 sm:block">
          (+51) 900 000 000
        </a>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center gap-5 px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">
          Amarres de amor en Perú
        </p>
        <h1 className="max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
          ¿Quieres que tu ex regrese a tu lado sin rogarle?
        </h1>
        <p className="max-w-md text-[#f5e6d3]/80">
          Realizo amarres de amor efectivos y rituales enfocados en ayudarte a recuperar tu pareja.
        </p>
        <WhatsAppButton
          numero={NUMERO}
          mensaje="Hola, quiero recuperar a mi pareja."
          texto="Quiero recuperar a mi pareja"
          className="text-base px-8 py-4"
        />
        <p className="text-sm text-[#f5e6d3]/60">(+51) 900 000 000</p>

        <ul className="mt-4 flex flex-col gap-2 text-left text-sm text-[#f5e6d3]/90">
          <li>✓ Recupera la comunicación</li>
          <li>✓ Fortalece la relación</li>
          <li>✓ Vuelve a sentir su cariño</li>
        </ul>
      </section>

      {/* Servicios - imagen + texto alternado */}
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
                <div>
                  <WhatsAppButton numero={NUMERO} mensaje={s.mensaje} texto={s.cta} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo iniciar */}
      <section className="bg-[#2b0d0d] px-6 py-16 text-center">
        <h2 className="mb-3 font-serif text-3xl font-bold text-[#c9a24b]">¿Cómo iniciar?</h2>
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
        <div className="mt-10">
          <WhatsAppButton numero={NUMERO} mensaje="Hola, quiero hablar con usted." texto="Quiero hablar con Mary" className="text-base px-8 py-4" />
        </div>
      </section>

      {/* Resultados / testimonios */}
      <section className="px-6 py-16 text-center">
        <h2 className="mb-2 font-serif text-3xl font-bold text-[#c9a24b]">
          Resultados que hablan por sí solos
        </h2>
        <p className="mb-10 text-[#f5e6d3]/70">Más de [X] personas ya confiaron en mi trabajo</p>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-[#c9a24b]/20 bg-[#2b0d0d] p-6 text-sm text-[#f5e6d3]/70">
              [Espacio para captura de testimonio #{i}]
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#2b0d0d] px-6 py-16">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-[#c9a24b]">
          Preguntas Frecuentes
        </h2>
        <FaqAccordion items={faq} />
      </section>

      {/* CTA final */}
      <section className="flex flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#c9a24b]">
          ¡Haz un Amarre! Recupera a tu ex pareja
        </h2>
        <WhatsAppButton numero={NUMERO} mensaje="Hola, quiero empezar mi caso." texto="Empezar mi caso hoy" className="text-base px-8 py-4" />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#c9a24b]/20 px-6 py-8 text-center text-xs text-[#f5e6d3]/50">
        <p>* Servicio exclusivo para mayores de 18 años, según legislaciones vigentes.</p>
        <p>** No se garantiza ningún resultado específico y dichos resultados pueden variar según los casos.</p>
        <p className="mt-4">© 2026 Maestra [Nombre]</p>
      </footer>

      <FloatingWhatsApp numero={NUMERO} mensaje="Hola, quisiera más información." />
    </main>
  );
}
