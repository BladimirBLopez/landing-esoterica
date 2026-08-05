import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FaqAccordion from "@/components/FaqAccordion";
import ServicioDetallado from "@/components/ServicioDetallado";

const NUMERO = "59175928656";
const TELEFONO_VISIBLE = "(+591) 75928656";

const servicios = [
  {
    icono: "💜",
    titulo: "Amarre de Amor",
    descripcion: "Une corazones, despierta el sentimiento y fortalece el vínculo. No fuerzo voluntades — despierto lo que ya existe.",
    detalleExtra: "Este trabajo te ayuda a: que piense solo en ti día y noche, que regrese arrepentido/a y con más amor que nunca, que se acabe la indiferencia y vuelva la pasión, que se alejen quienes se interponen en su camino, y a fortalecer el vínculo para que nada ni nadie los separe.",
    duracion: "7 a 21 días",
    imagen: "https://picsum.photos/id/1011/900/700",
    mensaje: "Hola Maestro Juan Santiago, me interesa un Amarre de Amor. ¿Podría darme más información?",
    cta: "Solicitar un Amarre",
  },
  {
    icono: "🔗",
    titulo: "Unión de Parejas",
    descripcion: "Consolida, sella y protege. Elimina distancias, orgullos y peleas. Un vínculo tan fuerte que nada ni nadie los separa.",
    detalleExtra: "Este trabajo une corazones y voluntades, acaba con la indiferencia, elimina distancias y orgullos, cierra el camino a terceros, y fortalece el amor para que sea inquebrantable.",
    duracion: "7 a 21 días",
    imagen: "https://picsum.photos/id/1015/900/700",
    mensaje: "Hola Maestro, me interesa el trabajo de Unión de Parejas.",
    cta: "Consultar por Unión",
  },
  {
    icono: "🍯",
    titulo: "Endulzamiento",
    descripcion: "Ablanda corazones endurecidos. Cambia dureza, malas contestaciones y frialdad por dulzura, cariño y diálogo.",
    detalleExtra: "Este trabajo ablanda el corazón endurecido, convierte la dureza en dulzura y cariño, baja el orgullo, la rabia y las malas contestaciones, abre el diálogo y la comprensión mutua, y recupera la ternura y la buena convivencia.",
    duracion: "5 a 14 días",
    imagen: "https://picsum.photos/id/1016/900/700",
    mensaje: "Hola Maestro, quiero saber más sobre el Endulzamiento.",
    cta: "Consultar Endulzamiento",
  },
  {
    icono: "🔄",
    titulo: "Retorno del Ser Amado",
    descripcion: "Rompe orgullos, confusiones y bloqueos. Que regrese arrepentido/a, enamorado/a y para quedarse.",
    detalleExtra: "Este trabajo rompe barreras y orgullos, hace que te extrañe día y noche, que sienta que sin ti no puede estar, que regrese arrepentido/a y buscándote, y aleja a quienes estorban en el camino.",
    duracion: "7 a 21 días",
    imagen: "https://picsum.photos/id/1025/900/700",
    mensaje: "Hola Maestro, me interesa el Retorno del Ser Amado.",
    cta: "Solicitar Retorno",
  },
  {
    icono: "⚔️",
    titulo: "Alejamiento de Terceros",
    descripcion: "Aparta rivales, pretendientes, chismes y malas influencias. Bloquea intrusos y protege tu relación con una barrera espiritual.",
    detalleExtra: "Incluye: corte energético para romper la conexión con quien se interpone, protección y sellado del vínculo, elementos de limpieza (hierbas consagradas, velas de corte, aceites de protección), oración de apartamiento, y bloqueo permanente contra nuevas intromisiones.",
    duracion: "5 a 14 días",
    imagen: "https://picsum.photos/id/1039/900/700",
    mensaje: "Hola Maestro, me interesa el Alejamiento de Terceros.",
    cta: "Consultar Alejamiento",
  },
];

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
    respuesta: "Sí, se atiende por WhatsApp a cualquier persona, sin importar dónde se encuentre.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a0505] text-[#f5e6d3]">
      {/* Hero */}
      <section className="relative flex flex-col items-center gap-4 overflow-hidden px-6 py-24 text-center">
        <Image
          src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=1600&q=80"
          alt="Fondo místico"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a0505]/80" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">
            Altar del Tata Bombori · Norte de Potosí
          </p>
          <h1 className="text-6xl leading-tight text-[#c9a24b] drop-shadow-lg sm:text-7xl" style={{ fontFamily: "var(--font-script)" }}>
            Maestro Juan Santiago
          </h1>
          <p className="text-lg text-[#f5e6d3]/90">Heredero del Tatabombori</p>

          <h2 className="mt-4 max-w-xl text-2xl font-bold sm:text-3xl">
            ¿Sientes que tu amor se está escapando?
          </h2>
          <p className="max-w-md text-[#f5e6d3]/80">
            No dejes que se pierda lo tuyo. Trabajo con respeto, fe y experiencia — no fuerzo voluntades, despierto lo que ya existe.
          </p>

          <WhatsAppButton
            numero={NUMERO}
            mensaje="Hola Maestro Juan Santiago, quiero recuperar a mi pareja."
            texto="Quiero recuperar a mi pareja"
            className="text-base px-8 py-4"
          />

          <ul className="mt-4 flex flex-col gap-2 text-sm text-[#f5e6d3]/90">
            <li>✓ Que piense solo en ti día y noche</li>
            <li>✓ Que regrese arrepentido/a y con más amor que nunca</li>
            <li>✓ Que se acabe la indiferencia y vuelva la pasión</li>
          </ul>
        </div>
      </section>

      {/* Sobre el Altar */}
      <section className="bg-[#1e1030] px-6 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#c9a24b]">
          Bienvenido al Altar del Tata Bombori
        </h2>
        <p className="mx-auto max-w-2xl text-[#f5e6d3]/80">
          Donde la sabiduría ancestral de las Sagradas Hojas de Coca y la verdad revelada por las Cartas del Tarot se unen para ver tu situación, orientarte y trabajar con justicia y fe verdadera.
        </p>
        <div className="relative mx-auto mt-10 h-64 w-full max-w-2xl overflow-hidden rounded-2xl">
          <Image src="https://picsum.photos/id/1040/900/600" alt="Altar del Tata Bombori" fill className="object-cover" />
        </div>
      </section>

      {/* Primero consultamos */}
      <section className="bg-[#0f2027] px-6 py-16 text-center">
        <h2 className="mb-2 text-3xl font-bold text-[#c9a24b]">Primero consultamos, después trabajamos</h2>
        <p className="mx-auto mb-10 max-w-xl text-[#f5e6d3]/80">
          No se hace nada sin saber qué dicen las señales. Primero leemos tu caso en las Sagradas Hojas de Coca y en el Tarot para ver:
        </p>
        <div className="mx-auto grid max-w-2xl gap-4 text-left sm:grid-cols-2">
          <p>✅ Si hay amor verdadero o bloqueos</p>
          <p>✅ Si terceros están interfiriendo</p>
          <p>✅ Qué trabajos necesita exactamente tu caso</p>
          <p>✅ Si es posible y cuánto tiempo tomará</p>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-[#2b0d0d] px-6 py-16">
        <h2 className="mb-2 text-center text-3xl font-bold text-[#c9a24b]">
          Servicios del Altar del Tata Bombori
        </h2>
        <p className="mb-12 text-center text-[#f5e6d3]/70">
          Trabajo espiritual serio y personalizado
        </p>
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          {servicios.map((s) => (
            <ServicioDetallado
              key={s.titulo}
              titulo={s.titulo}
              descripcion={s.descripcion}
              detalleExtra={s.detalleExtra}
              duracion={s.duracion}
              imagen={s.imagen}
              numero={NUMERO}
              mensaje={s.mensaje}
              cta={s.cta}
            />
          ))}
        </div>
      </section>

      {/* Requisitos */}
      <section className="bg-[#2a1810] px-6 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold text-[#c9a24b]">
          Para tu consulta y trabajo solo necesito
        </h2>
        <div className="mx-auto flex max-w-md flex-col gap-3 text-left text-[#f5e6d3]/90">
          <p>📋 Nombres completos de ambos</p>
          <p>📋 Fechas de nacimiento</p>
          <p>📋 Tu situación actual</p>
        </div>
        <p className="mx-auto mt-8 max-w-md text-sm text-[#f5e6d3]/70">
          🔒 100% Confidencial. Trabajo serio, con fe y respeto.
        </p>
        <div className="mt-8 flex flex-col items-center gap-1">
          <WhatsAppButton
            numero={NUMERO}
            mensaje="Hola Maestro, quiero empezar mi consulta."
            texto="Empezar mi consulta hoy"
            className="text-base px-8 py-4"
          />
          <span className="text-sm text-[#f5e6d3]/60">{TELEFONO_VISIBLE}</span>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#141029] px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#c9a24b]">
          Preguntas Frecuentes
        </h2>
        <FaqAccordion items={faq} />
      </section>

      {/* CTA final */}
      <section className="flex flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#c9a24b]">
          Empezamos por la consulta y vemos tu camino
        </h2>
        <p className="max-w-md text-[#f5e6d3]/80">
          Cada día que pasa sin actuar es tiempo que pierdes. Escríbeme ahora mismo.
        </p>
        <WhatsAppButton
          numero={NUMERO}
          mensaje="Hola Maestro Juan Santiago, quiero recibir información."
          texto="Quiero recibir información"
          className="text-base px-8 py-4"
        />
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-8 text-center text-xs text-[#f5e6d3]/50">
        <p>* Servicio exclusivo para mayores de 18 años, según legislaciones vigentes.</p>
        <p>** No se garantiza ningún resultado específico y dichos resultados pueden variar según los casos.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#c9a24b]/20 px-6 py-6 text-center text-xs text-[#f5e6d3]/60">
        <p className="mt-4">© 2026 Altar del Tata Bombori · Maestro Juan Santiago</p>
      </footer>

      <FloatingWhatsApp
        numero={NUMERO}
        mensaje="Hola Maestro Juan Santiago, soy del Altar del Tata Bombori. Cuéntame: ¿quieres recuperar a tu ex, fortalecer tu relación o necesitas un amarre de amor?"
      />
    </main>
  );
}
