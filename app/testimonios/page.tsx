import type { Metadata } from "next";
import SeccionTestimonios from "@/components/SeccionTestimonios";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SiteFooter from "@/components/SiteFooter";

const NUMERO = "59175928656";

export const metadata: Metadata = {
  title: "Testimonios | Amarres de Amor Maestro Juan Santiago Bolivia",
  description: "Testimonios reales de clientes del Maestro Juan Santiago sobre amarres de amor, retorno del ser amado y trabajos espirituales exitosos en Bolivia.",
};

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#4a0916] to-[#2e0a1c] text-[#f5e6d3]">
      <SeccionTestimonios />

      <SiteFooter />

      <FloatingWhatsApp
        numero={NUMERO}
        mensaje="¡Hola! Vi los testimonios y quiero saber más sobre los servicios del Maestro Juan Santiago."
      />
    </main>
  );
}
