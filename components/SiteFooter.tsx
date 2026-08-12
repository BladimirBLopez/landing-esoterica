import { NUMERO, TELEFONO_VISIBLE } from "@/lib/constantes";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#c9a24b]/20 px-6 py-6 text-center text-xs text-[#f5e6d3]/60">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#c9a24b 2px, transparent 2px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10">
        <a href={`tel:+${NUMERO}`} className="block text-sm font-semibold text-[#c9a24b]">
          📞 {TELEFONO_VISIBLE}
        </a>
        <a
          href="https://www.facebook.com/maestrojuansantiagopotosi"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#c9a24b] hover:text-[#f0d78c] transition"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/>
          </svg>
          Síguenos en Facebook
        </a>
        <a
          href="https://maps.app.goo.gl/cRwJzs7ADLNs1UQC7"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block hover:text-[#c9a24b] transition"
        >
          📍 América 528-538, Villa Imperial de Potosí, Bolivia
        </a>
        <p className="mt-4">© 2026 Altar del Tata Bombori · Maestro Juan Santiago</p>
      </div>
    </footer>
  );
}
