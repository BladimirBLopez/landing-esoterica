import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cartaRes = await fetch("https://tarot-api-3hv5.onrender.com/api/v1/cards/random?n=1");
    const cartaData = await cartaRes.json();
    const carta = cartaData?.cards?.[0];

    if (!carta) {
      return NextResponse.json({ error: "Sin datos" }, { status: 500 });
    }

    const nombreOriginal = carta.name;
    const significadoOriginal = (carta.meaning_up ?? "").slice(0, 400);

    const [nombreRes, significadoRes] = await Promise.all([
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(nombreOriginal)}&langpair=en|es`),
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(significadoOriginal)}&langpair=en|es`),
    ]);

    const nombreData = await nombreRes.json();
    const significadoData = await significadoRes.json();

    const nombre = nombreData?.responseData?.translatedText ?? nombreOriginal;
    const significado = significadoData?.responseData?.translatedText ?? significadoOriginal;

    return NextResponse.json({ nombre, significado });
  } catch {
    return NextResponse.json({ error: "Error al consultar" }, { status: 500 });
  }
}
