interface WhatsAppButtonProps {
  numero: string;
  mensaje: string;
  texto: string;
  className?: string;
}

export default function WhatsAppButton({
  numero,
  mensaje,
  texto,
  className = "",
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition-colors ${className}`}
    >
      {texto}
    </a>
  );
}
