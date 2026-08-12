import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const signo = req.nextUrl.searchParams.get("sign");

  if (!signo) {
    return NextResponse.json({ error: "Falta el signo" }, { status: 400 });
  }

  try {
    const horoscopoRes = await fetch(
      `https://freehoroscopeapi.com/api/v1/get-horoscope/daily?sign=${signo}`
    );
    const horoscopoData = await horoscopoRes.json();
    const original = horoscopoData?.data?.horoscope ?? "";

    if (!original) {
      return NextResponse.json({ error: "Sin datos" }, { status: 500 });
    }

    const textoParaTraducir = original.slice(0, 480);

    const traduccionRes = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textoParaTraducir)}&langpair=en|es`
    );
    const traduccionData = await traduccionRes.json();
    const traducido = traduccionData?.responseData?.translatedText ?? original;

    return NextResponse.json({ texto: traducido });
  } catch {
    return NextResponse.json({ error: "Error al consultar" }, { status: 500 });
  }
}
