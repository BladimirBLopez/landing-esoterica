import Image from "next/image";
import ScrollVideo from "@/components/ScrollVideo";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FaqAccordion from "@/components/FaqAccordion";
import ServicioDetallado from "@/components/ServicioDetallado";

const NUMERO = "59175928656";
const TELEFONO_VISIBLE = "+591 75928656";

const servicios = [
  {
    titulo: "Amarre de Amor",
    icono: "💜",
    descripcion: "¿Sientes que tu amor se está escapando? No dejes que se pierda lo tuyo. Hay momentos en que las energías se bloquean, aparecen dudas, celos, gente mala, y dos personas que se amaban empiezan a alejarse sin saber por qué. Eso no significa que se acabó — significa que necesita ayuda espiritual.",
    beneficios: [
      "Que piense solo en ti día y noche",
      "Que regrese arrepentido/a y con más amor que nunca",
      "Que se acabe la indiferencia y vuelva la pasión",
      "Que se vayan quienes se interponen en su camino",
      "Fortalecer el vínculo para que nada ni nadie los separe",
    ],
    notaFinal: "Trabajo con respeto, fe y experiencia. No fuerzo voluntades — despierto lo que ya existe.",
    duracion: "7 a 21 días",
    imagen: "https://res.cloudinary.com/dkq95jus0/image/upload/amarre-amor",
    mensaje: "Hola Maestro Juan Santiago, me interesa un Amarre de Amor. ¿Podría darme más información?",
    cta: "Solicitar un Amarre",
    color: "#4a1420",
  },
  {
    titulo: "Unión de Parejas",
    icono: "🔗",
    descripcion: "¿Se alejan sin razón? ¿Pelean por todo? ¿Sientes que se está rompiendo el vínculo? Este trabajo es para que nada ni nadie los separe.",
    beneficios: [
      "Une corazones y voluntades",
      "Acaba con la indiferencia",
      "Elimina distancias y orgullos",
      "Cierra caminos a terceros",
      "Fortalece el amor para que sea inquebrantable",
    ],
    notaFinal: "Trabajo espiritual serio y personalizado.",
    duracion: "7 a 21 días",
    imagen: "https://res.cloudinary.com/dkq95jus0/image/upload/union-parejas",
    mensaje: "Hola Maestro, me interesa el trabajo de Unión de Parejas.",
    cta: "Consultar por Unión",
    color: "#3d2814",
  },
  {
    titulo: "Endulzamiento",
    icono: "🍯",
    descripcion: "¿Todo se vuelve peleas y malas palabras? ¿Se volvió frío/a, cortante o indiferente? ¿El orgullo no deja que se arreglen las cosas? Este trabajo suaviza, reconcilia y endulza tu relación.",
    beneficios: [
      "Ablanda el corazón endurecido",
      "Convierte la dureza en dulzura y cariño",
      "Baja el orgullo, la rabia y las malas contestaciones",
      "Abre el diálogo y la comprensión mutua",
      "Recupera la ternura y la buena convivencia",
    ],
    notaFinal: "Trabajo serio, personalizado y con elementos dulces sagrados.",
    duracion: "5 a 14 días",
    imagen: "https://res.cloudinary.com/dkq95jus0/image/upload/endulzamiento-amor",
    mensaje: "Hola Maestro, quiero saber más sobre el Endulzamiento.",
    cta: "Consultar Endulzamiento",
    color: "#3d2b0a",
  },
  {
    titulo: "Retorno del Ser Amado",
    icono: "🔄",
    descripcion: "¿Se fue y no da señales? ¿Dice que ya no vuelve? ¿Está con otra persona? ¿El orgullo no lo/la deja volver? Este trabajo es para que regrese arrepentido, enamorado y para siempre.",
    beneficios: [
      "Rompe barreras y orgullos",
      "Que te extrañe día y noche",
      "Que sienta que sin ti no puede estar",
      "Que regrese arrepentido/a y buscándote",
      "Que se alejen quienes estorban",
    ],
    notaFinal: "Trabajo espiritual serio y personalizado.",
    duracion: "7 a 21 días",
    imagen: "https://res.cloudinary.com/dkq95jus0/image/upload/retorno-ser-amado",
    mensaje: "Hola Maestro, me interesa el Retorno del Ser Amado.",
    cta: "Solicitar Retorno",
    color: "#4a1414",
  },
  {
    titulo: "Alejamiento de Terceros",
    icono: "⚔️",
    descripcion: "¿Hay otra/o metiéndose? ¿Chismes, consejas o envidias dañando tu relación? ¿Alguien quiere separarlos? ¿Tu pareja se deja influenciar por otros? Este trabajo es para que se aleje quien se mete en tu amor, definitivamente.",
    beneficios: [
      "Alejar a rivales, pretendientes o amantes que se interponen",
      "Cortar chismes, malas consejas y personas que influyen mal",
      "Apartar envidias, ojos malos y energías dañinas",
      "Fortalecer la fidelidad y la unión entre ustedes",
      "Crear una barrera espiritual para que nadie los separe",
    ],
    incluyeTitulo: "¿Qué incluye el trabajo?",
    incluye: [
      "Corte energético: rompe la conexión e influencia con quien se interpone",
      "Protección y sellado del vínculo para que nadie más pueda entrar",
      "Elementos de limpieza: hierbas consagradas, velas de corte, aceites de protección",
      "Oración de apartamiento y bloqueo permanente contra nuevas intromisiones",
    ],
    notaFinal: "Trabajo espiritual serio y poderoso.",
    duracion: "5 a 14 días",
    imagen: "https://res.cloudinary.com/dkq95jus0/image/upload/alejamiento-tercero",
    mensaje: "Hola Maestro, me interesa el Alejamiento de Terceros.",
    cta: "Consultar Alejamiento",
    color: "#1e1830",
  },
];

const resumenServicios = [
  { titulo: "Amarre de Amor", texto: "Une corazones, despierta el sentimiento, fortalece el vínculo.", duracion: "7–21 días" },
  { titulo: "Unión de Parejas", texto: "Consolida, sella y protege. Un vínculo tan fuerte que nadie los separa.", duracion: "7–21 días" },
  { titulo: "Endulzamiento", texto: "Ablanda corazones endurecidos, cambia frialdad por dulzura y diálogo.", duracion: "5–14 días" },
  { titulo: "Retorno del Ser Amado", texto: "Rompe orgullos y bloqueos. Que regrese arrepentido/a y para quedarse.", duracion: "7–21 días" },
  { titulo: "Alejamiento de Terceros", texto: "Aparta rivales, chismes y malas influencias. Protege tu relación.", duracion: "5–14 días" },
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
      {/* Hero (pantalla completa, con video de fondo) */}
      <section className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden px-6 py-24 text-center">
        <ScrollVideo
          src="https://assets.mixkit.co/videos/3461/3461-720.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a0505]/80" />

        {/* Bandera de Potosi, esquina superior derecha, mas grande e inclinada */}
        <div className="absolute -right-2 top-4 z-10 h-32 w-44 rotate-12 opacity-90 drop-shadow-lg">
          <Image
            src="https://res.cloudinary.com/dkq95jus0/image/upload/bandera-potosi"
            alt="Bandera de Potosí"
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">
            Sabiduría Ancestral · Norte de Potosí
          </p>
          <h1 className="text-6xl leading-tight text-[#c9a24b] sm:text-7xl" style={{ fontFamily: "var(--font-script)", textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.9)" }}>
            Maestro Juan Santiago
          </h1>
          <p className="text-lg text-[#f5e6d3]/90">Maestro Curandero · Heredero del Tatabombori</p>

          <h2 className="mt-4 max-w-xl text-3xl font-bold text-white sm:text-4xl" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.9)" }}>
            ¿Sientes que tu amor se está escapando?
          </h2>

          <WhatsAppButton
            numero={NUMERO}
            mensaje="Hola Maestro Juan Santiago, quiero recuperar a mi pareja."
            texto="Quiero recuperar a mi pareja"
            className="text-base px-8 py-4"
          />
          <a href={`tel:+${NUMERO}`} className="text-sm font-semibold tracking-wide text-[#f5e6d3]/80 hover:text-[#c9a24b]">
            📞 {TELEFONO_VISIBLE}
          </a>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-[#1a0505]" />
      </section>

      {/* Sobre el Altar: nicho con foto nitida + tarjeta solida con pasos tipo mecha */}
      <section className="relative overflow-hidden bg-[#2a0a12] px-6 pb-10 pt-8">
        <Image
          src="https://res.cloudinary.com/dkq95jus0/image/upload/aguayo-2"
          alt="Aguayo andino"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#170a06]/85" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#1a0505] to-transparent" />

        {/* Nicho con la foto */}
        <div className="relative mx-auto h-80 w-full max-w-sm">
          <div className="absolute -inset-6 rounded-full bg-[#ff9d42]/20 blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-t-full border-2 border-[#c9a24b]/50 shadow-2xl">
            <Image
              src="https://res.cloudinary.com/dkq95jus0/image/upload/altar-principal-2"
              alt="Altar del Tata Bombori"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_25px_rgba(0,0,0,0.55)]" />
          </div>
        </div>

        {/* Tarjeta solida superpuesta */}
        <div className="relative z-20 mx-auto -mt-10 max-w-xl rounded-3xl border border-[#c9a24b]/30 bg-[#3d0f1a] px-6 py-10 text-center shadow-2xl">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Bienvenido al Altar del Tata Bombori
          </h2>
          <p className="mx-auto max-w-md text-[#f5e6d3]/90">
            Donde la sabiduría ancestral de las Sagradas Hojas de Coca y la verdad revelada por las Cartas del Tarot se unen para ver tu situación, orientarte y trabajar con justicia y fe verdadera.
          </p>

          <div className="relative mx-auto mt-10 flex max-w-xs flex-col gap-7 border-l-2 border-[#c9a24b]/50 pl-6 text-left">
            <div className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[#c9a24b] shadow-[0_0_8px_2px_rgba(201,162,75,0.6)]" />
              <p className="text-sm text-[#f5e6d3]/90">🌿 Consultamos en Hojas de Coca y Tarot</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[#c9a24b] shadow-[0_0_8px_2px_rgba(201,162,75,0.6)]" />
              <p className="text-sm text-[#f5e6d3]/90">📖 Te decimos qué dicen y qué necesitas</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[#c9a24b] shadow-[0_0_8px_2px_rgba(201,162,75,0.6)]" />
              <p className="text-sm text-[#f5e6d3]/90">🕯️ Trabajamos desde el Altar del Tata Bombori</p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-b from-transparent to-[#2b0d0d]" />
      </section>

      {/* Servicios (con video de fondo) */}
      <section id="servicios" className="relative overflow-hidden px-6 py-16">
        <ScrollVideo
          src="https://assets.mixkit.co/active_storage/video_items/99990/1718655073/99990-video-720.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#4a1620]/40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#2b0d0d] to-transparent" />

        <div className="relative z-10">
          <h2 className="mb-2 text-center text-4xl font-bold text-white">
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
              icono={s.icono}
              descripcion={s.descripcion}
              beneficios={s.beneficios}
              incluyeTitulo={s.incluyeTitulo}
              incluye={s.incluye}
              notaFinal={s.notaFinal}
              duracion={s.duracion}
              imagen={s.imagen}
              numero={NUMERO}
              mensaje={s.mensaje}
              cta={s.cta}
              colorFondo={s.color}
            />
          ))}
        </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-b from-transparent to-[#2a0a1a]" />
      </section>

      {/* Video con sonido y controles */}
      <section className="relative bg-[#2b0d0d] px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#2b0d0d] to-transparent" />
        <h2 className="mb-2 text-4xl font-bold text-white">
          Conoce al Maestro Juan Santiago
        </h2>
        <p className="mb-8 text-[#f5e6d3]/70">
          Toca play para ver y escuchar
        </p>
        <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-[#c9a24b]/30 shadow-2xl">
          <ScrollVideo
            src="https://res.cloudinary.com/dkq95jus0/video/upload/hero-video-1"
            poster="https://res.cloudinary.com/dkq95jus0/video/upload/so_0/hero-video-1.jpg"
            className="w-full"
            muted={false}
            loop={false}
            controls={true}
            autoPlayOnView={false}
          />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative bg-[#2a0a1a] px-6 py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#2a0a1a] to-transparent" />
        <h2 className="mb-10 text-center text-4xl font-bold text-white">
          Preguntas Frecuentes
        </h2>
        <FaqAccordion items={faq} />
      </section>

      {/* Resumen final + CTA (estilo caja con borde) */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-xl rounded-3xl border-2 border-[#c9a24b] bg-[#1a0505] px-6 py-10">
          <h2 className="mb-8 text-3xl font-bold uppercase leading-snug text-white sm:text-4xl">
            ¡Haz tu consulta! Recupera a tu ser amado. Resultados que hablan por sí solos
          </h2>

          <div className="mx-auto flex max-w-sm flex-col gap-3 text-left">
            {resumenServicios.map((r) => (
              <div key={r.titulo} className="flex items-start gap-2">
                <span className="mt-0.5 text-[#c9a24b]">✔</span>
                <span className="text-[#f5e6d3]/90">
                  <span className="font-semibold">{r.titulo}</span>
                  <span className="text-xs text-[#f5e6d3]/60"> · {r.duracion}</span>
                </span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-md text-sm text-[#f5e6d3]/70">
            🔒 100% Confidencial. Trabajo serio y con fe.
            <br />
            Para cualquier trabajo solo necesito: nombres completos, fechas de nacimiento y tu situación.
          </p>

          <div className="mt-8 flex justify-center">
            <WhatsAppButton
              numero={NUMERO}
              mensaje="Hola Maestro Juan Santiago, quiero empezar hoy mismo."
              texto="Escríbeme ahora y empezamos hoy mismo"
              className="text-base px-8 py-4"
            />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-8 text-center text-xs text-[#f5e6d3]/50">
        <p>* Servicio exclusivo para mayores de 18 años, según legislaciones vigentes.</p>
        <p>** No se garantiza ningún resultado específico y dichos resultados pueden variar según los casos.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#c9a24b]/20 px-6 py-6 text-center text-xs text-[#f5e6d3]/60">
        <div className="relative mx-auto mb-4 h-10 w-16">
          <Image
            src="https://res.cloudinary.com/dkq95jus0/image/upload/bandera-bolivia"
            alt="Bandera de Bolivia"
            fill
            className="object-contain"
          />
        </div>
        <a href={`tel:+${NUMERO}`} className="block text-sm font-semibold text-[#c9a24b]">
          📞 {TELEFONO_VISIBLE}
        </a>
        <p className="mt-4">© 2026 Altar del Tata Bombori · Maestro Juan Santiago</p>
      </footer>

      <FloatingWhatsApp
        numero={NUMERO}
        mensaje={`🤝 Bienvenido de parte del Maestro Juan Santiago

¡Hola! Gracias por contactarme. Soy el Maestro Juan Santiago, especialista en:
✨ Amarres de amor • Unión de parejas
✨ Retornos de seres amados
✨ Endulzamiento de relaciones
✨ Alejamiento de personas y terceros

Con 25 años de experiencia y sabiduría tradicional, trabajo con respeto, seriedad y confidencialidad absoluta. Cuéntame con claridad tu situación y lo que deseas lograr. Estoy aquí para orientarte.

🙏 Bendiciones.`}
      />
    </main>
  );
}
