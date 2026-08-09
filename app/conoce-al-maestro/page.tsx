import type { Metadata } from "next";
import ScrollVideo from "@/components/ScrollVideo";
import RevealOnScroll from "@/components/RevealOnScroll";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const NUMERO = "59175928656";

export const metadata: Metadata = {
  title: "Conoce al Maestro Juan Santiago | Curandero Heredero del Tatabombori",
  description: "Conoce la historia del Maestro Juan Santiago, curandero del Norte de Potosí, Bolivia, heredero del Tatabombori. Más de 25 años de experiencia en amarres de amor y trabajos espirituales.",
};

export default function ConoceAlMaestroPage() {
  return (
    <main className="min-h-screen bg-[#1a0505] text-[#f5e6d3]">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#4a0916] to-[#6b1330] px-6 py-16 text-center">
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute -left-8 top-10 h-40 w-40 text-[#c9a24b] opacity-[0.08]">
          <path fill="currentColor" d="M12 21s-6.7-4.35-9.3-8.1C1.1 10.6 1.6 7.4 4.2 5.9c2.2-1.3 4.9-.6 6.3 1.4l1.5 2 1.5-2c1.4-2 4.1-2.7 6.3-1.4 2.6 1.5 3.1 4.7 1.5 7-2.6 3.75-9.3 8.1-9.3 8.1z"/>
        </svg>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute -right-10 bottom-10 h-52 w-52 text-[#c9a24b] opacity-[0.08]">
          <path fill="currentColor" d="M12 21s-6.7-4.35-9.3-8.1C1.1 10.6 1.6 7.4 4.2 5.9c2.2-1.3 4.9-.6 6.3 1.4l1.5 2 1.5-2c1.4-2 4.1-2.7 6.3-1.4 2.6 1.5 3.1 4.7 1.5 7-2.6 3.75-9.3 8.1-9.3 8.1z"/>
        </svg>
        <div className="relative z-10 mx-auto mb-6 flex items-center justify-center gap-2 text-[#c9a24b]">
          <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
          <span>♥</span>
          <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
        </div>
        <RevealOnScroll>
          <h1 className="mb-2 text-4xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>
            Conoce al Maestro Juan Santiago
          </h1>
        </RevealOnScroll>
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

      <FloatingWhatsApp
        numero={NUMERO}
        mensaje="¡Hola! Quiero saber más sobre el Maestro Juan Santiago y sus servicios."
      />
    </main>
  );
}
