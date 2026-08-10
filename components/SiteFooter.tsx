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
        <p className="mt-4">© 2026 Altar del Tata Bombori · Maestro Juan Santiago</p>
      </div>
    </footer>
  );
}
