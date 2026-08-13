import type { Metadata } from "next";
import SeccionTestimonios from "@/components/SeccionTestimonios";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SiteFooter from "@/components/SiteFooter";

import { NUMERO } from "@/lib/constantes";

export const metadata: Metadata = {
  title: "Testimonios | Amarres de Amor Maestro Juan Santiago Bolivia",
  description: "Testimonios reales de clientes del Maestro Juan Santiago sobre amarres de amor, retorno del ser amado y trabajos espirituales exitosos en Bolivia.",
};

async function obtenerTestimonios() {
  try {
    const res = await fetch("https://juan-santiago-admin.vercel.app/api/testimonios", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.testimonios ?? [];
  } catch {
    return [];
  }
}

export default async function TestimoniosPage() {
  const testimonios = await obtenerTestimonios();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#4a0916] to-[#2e0a1c] text-[#f5e6d3]">
      <SeccionTestimonios testimonios={testimonios} />

      <SiteFooter />

      <FloatingWhatsApp
        numero={NUMERO}
        mensaje="¡Hola! Vi los testimonios y quiero saber más sobre los servicios del Maestro Juan Santiago."
      />
    </main>
  );
}
