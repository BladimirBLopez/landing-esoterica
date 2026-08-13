type Testimonio = {
  id: string;
  nombre: string;
  texto: string;
  mediaUrl: string | null;
  mediaTipo: string | null;
};

export default function SeccionTestimonios({ testimonios }: { testimonios: Testimonio[] }) {
  if (testimonios.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#4a0916] to-[#2e0a1c] px-6 py-16">
      <div className="relative z-10 mx-auto mb-8 flex items-center justify-center gap-2 text-[#c9a24b]">
        <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
        <span>♥</span>
        <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
      </div>
      <h2
        className="mb-10 text-center text-4xl font-bold text-white"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Testimonios de Amarres de Amor
      </h2>

      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        {testimonios.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-[#c9a24b]/30 bg-[#3d0f1a] p-5"
          >
            <p className="text-[#f5e6d3]/90 leading-relaxed">&ldquo;{t.texto}&rdquo;</p>
            <p className="mt-3 text-sm font-semibold text-[#c9a24b]">— {t.nombre}</p>

            {t.mediaUrl && t.mediaTipo === "IMAGEN" && (
              <img
                src={t.mediaUrl}
                alt={`Testimonio de ${t.nombre} sobre amarre de amor con el Maestro Juan Santiago`}
                className="mt-3 rounded-lg max-h-64 mx-auto"
              />
            )}
            {t.mediaUrl && t.mediaTipo === "VIDEO" && (
              <video src={t.mediaUrl} controls className="mt-3 rounded-lg w-full" />
            )}
            {t.mediaUrl && t.mediaTipo === "AUDIO" && (
              <audio src={t.mediaUrl} controls className="mt-3 w-full" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
