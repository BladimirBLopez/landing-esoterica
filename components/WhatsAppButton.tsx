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
      className={`group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#e6c476] to-[#c9a24b] pl-2 pr-6 py-2 text-sm font-bold uppercase tracking-wider text-[#1a0505] shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_35px_-6px_rgba(230,196,118,0.9)] ring-2 ring-[#f5e6d3]/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_45px_-4px_rgba(230,196,118,1)] ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a0505] transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-[#e6c476]">
          <path d="M16.04 3C9.37 3 3.98 8.39 3.98 15.06c0 2.24.6 4.34 1.65 6.15L3 29l7.98-2.6a12.03 12.03 0 0 0 5.06 1.11h.01c6.67 0 12.06-5.39 12.06-12.06C28.11 8.79 22.71 3 16.04 3zm0 21.9h-.01a10 10 0 0 1-5.12-1.4l-.37-.22-3.8 1.24 1.26-3.71-.24-.38a9.9 9.9 0 0 1-1.52-5.27C6.24 9.5 10.7 5.04 16.05 5.04c2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 0 1 2.88 6.96c0 5.35-4.46 9.8-9.85 9.8zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.05 1.02-1.05 2.5 1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
        </svg>
      </span>
      <span>{texto}</span>
    </a>
  );
}
