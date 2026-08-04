import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ServicioCard from "@/components/ServicioCard";
import FaqAccordion from "@/components/FaqAccordion";

const NUMERO = "51900000000"; // TODO: reemplazar con el número real

const servicios = [
  {
    titulo: "Amarres de Amor",
    descripcion: "Rituales enfocados en recuperar a esa persona especial y fortalecer el vínculo entre ambos.",
    imagen: "https://picsum.photos/id/1011/800/600",
    mensaje: "Hola, me interesa un Amarre de Amor. ¿Podría darme más información?",
  },
  {
    titulo: "Hechizos de Amor",
    descripcion: "Trabajos energéticos para atraer el amor que mereces y mejorar tus relaciones actuales.",
    imagen: "https://picsum.photos/id/1015/800/600",
    mensaje: "Hola, quiero saber más sobre los Hechizos de Amor.",
  },
  {
    titulo: "Rituales para el Amor",
    descripcion: "Ceremonias personalizadas para transformar tu vida sentimental y atraer el amor verdadero.",
    imagen: "https://picsum.photos/id/1016/800/600",
    mensaje: "Hola, me interesa hacer un Ritual para el Amor.",
  },
];

const faq = [
  { pregunta: "¿Qué casos atiendes?", respuesta: "Recuperación de pareja, conflictos amorosos y amarres de amor." },
  { pregunta: "¿La consulta es confidencial?", respuesta: "Sí, toda la información que compartes es totalmente confidencial." },
  { pregunta: "¿Atiendes a distancia?", respuesta: "Sí, atiendo por WhatsApp a personas de cualquier lugar." },
  { pregunta: "¿Cómo se coordina el pago?", respuesta: "El método de pago se coordina directamente por WhatsApp." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-[#f5e9d3]">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#d4af37]/20 bg-[#1a0b2e]/90 px-6 py-4 backdrop-blur">
        <span className="font-serif text-xl font-bold text-[#d4af37]">Maestra [Nombre]</span>
        <WhatsAppButton numero={NUMERO} mensaje="Hola, quisiera más información." texto="WhatsApp" className="text-sm px-4 py-2" />
      </header>

      <section className="flex flex-col items-center gap-6 px-6 py-20 text-center">
        <h1 className="font-serif text-4xl font-bold leading-tight text-[#f5e9d3] sm:text-5xl">
          Recupera el amor <br /> que crees perdido
        </h1>
        <p className="max-w-md text-[#f5e9d3]/80">
          Rituales y amarres de amor con años de experiencia ayudando a recuperar relaciones y atraer el amor verdadero.
        </p>
        <WhatsAppButton numero={NUMERO} mensaje="Hola, quiero recuperar a mi pareja." texto="Quiero recuperar a mi pareja" className="text-base px-8 py-4" />
      </section>

      <section className="flex flex-wrap justify-center gap-6 border-y border-[#d4af37]/20 bg-[#2d1b4e]/50 px-6 py-8 text-sm">
        <span>🔒 100% Confidencial</span>
        <span>💫 Atención personalizada</span>
        <span>✨ Resultados comprobados</span>
      </section>

      <section id="servicios" className="px-6 py-20">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-[#d4af37]">Mis Servicios</h2>
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {servicios.map((s) => (
            <ServicioCard key={s.titulo} {...s} numero={NUMERO} />
          ))}
        </div>
      </section>

      <section className="bg-[#2d1b4e]/50 px-6 py-20 text-center">
        <h2 className="mb-10 font-serif text-3xl font-bold text-[#d4af37]">¿Cómo iniciar?</h2>
        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-3">
          <div><div className="mb-2 text-3xl">1️⃣</div><p>Cuéntame tu caso</p></div>
          <div><div className="mb-2 text-3xl">2️⃣</div><p>Analizo tu situación</p></div>
          <div><div className="mb-2 text-3xl">3️⃣</div><p>Recibe orientación personalizada</p></div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="mb-4 font-serif text-3xl font-bold text-[#d4af37]">Resultados que hablan por sí solos</h2>
        <p className="mb-10 text-[#f5e9d3]/80">Más de [X] personas ya confiaron en mi trabajo</p>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-[#2d1b4e] p-6 text-sm text-[#f5e9d3]/70">
              [Espacio para testimonio #{i}]
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-[#2d1b4e]/50 px-6 py-20">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-[#d4af37]">Preguntas Frecuentes</h2>
        <FaqAccordion items={faq} />
      </section>

      <section className="flex flex-col items-center gap-6 px-6 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#d4af37]">¿Lista para recuperar tu amor?</h2>
        <WhatsAppButton numero={NUMERO} mensaje="Hola, quiero empezar mi caso." texto="Empezar mi caso hoy" className="text-base px-8 py-4" />
      </section>

      <footer className="border-t border-[#d4af37]/20 px-6 py-8 text-center text-xs text-[#f5e9d3]/60">
        <p>* Servicio exclusivo para mayores de 18 años, según legislaciones vigentes.</p>
        <p>** No se garantiza ningún resultado específico y los resultados pueden variar según cada caso.</p>
        <p className="mt-4">© 2026 Maestra [Nombre]</p>
      </footer>

      <FloatingWhatsApp numero={NUMERO} mensaje="Hola, quisiera más información." />
    </main>
  );
}
