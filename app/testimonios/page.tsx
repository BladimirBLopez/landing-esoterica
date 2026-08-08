import SeccionTestimonios from "@/components/SeccionTestimonios";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const NUMERO = "59175928656";

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#4a0916] to-[#2e0a1c] text-[#f5e6d3]">
      <SeccionTestimonios />

      <FloatingWhatsApp
        numero={NUMERO}
        mensaje="¡Hola! Vi los testimonios y quiero saber más sobre los servicios del Maestro Juan Santiago."
      />
    </main>
  );
}
