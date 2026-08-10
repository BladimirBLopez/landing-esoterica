import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const pregunta = typeof body?.pregunta === "string" ? body.pregunta.slice(0, 150) : "";

    const cartaRes = await fetch("https://tarot-api-3hv5.onrender.com/api/v1/cards/random?n=1");
    const cartaData = await cartaRes.json();
    const carta = cartaData?.cards?.[0];

    if (!carta) {
      return NextResponse.json({ error: "Sin datos" }, { status: 500 });
    }

    const nombreOriginal = carta.name;
    const significadoOriginal = (carta.meaning_up ?? "").slice(0, 500);

    const prompt = `Eres un asistente que ayuda a interpretar cartas de Tarot para el sitio web de un Maestro esoterico especializado en amarres y temas de amor en Bolivia.

Carta sacada (nombre en ingles): "${nombreOriginal}"
Significado tradicional (en ingles): "${significadoOriginal}"
${pregunta ? `Pregunta de la persona: "${pregunta}"` : "La persona no escribio una pregunta especifica, enfocate en temas de amor."}

Responde UNICAMENTE con un JSON valido, sin texto adicional, sin markdown, con esta forma exacta:
{"nombre": "nombre de la carta traducido al espanol", "pista": "1-2 frases cortas, calidas y misteriosas que den una primera impresion conectada a la pregunta, en espanol", "resto": "2-3 frases mas profundas que amplien la interpretacion conectada a la pregunta, en espanol, que inviten a contactar al Maestro para mas detalle"}

No uses saltos de linea dentro de los valores. No prometas resultados garantizados. Manten un tono calido, mistico y cercano.`;

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY ?? "",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    const geminiData = await geminiRes.json();
    const textoRaw: string = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const limpio = textoRaw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(limpio);

    return NextResponse.json({
      nombre: parsed.nombre ?? nombreOriginal,
      pista: parsed.pista ?? "",
      resto: parsed.resto ?? "",
    });
  } catch {
    return NextResponse.json({ error: "Error al consultar" }, { status: 500 });
  }
}
