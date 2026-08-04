interface FloatingWhatsAppProps {
  numero: string;
  mensaje: string;
}

export default function FloatingWhatsApp({ numero, mensaje }: FloatingWhatsAppProps) {
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 shadow-lg hover:bg-green-700 transition-colors"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.605 1.906 6.47L4 29l7.72-1.87A11.94 11.94 0 0 0 16.001 27C22.63 27 28 21.627 28 15S22.63 3 16.001 3zm0 21.6a9.55 9.55 0 0 1-4.87-1.33l-.35-.21-4.58 1.11 1.13-4.46-.23-.36A9.56 9.56 0 1 1 16.001 24.6z"/>
      </svg>
    </a>
  );
}
