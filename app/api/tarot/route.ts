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
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
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

    const geminiTextoCrudo = await geminiRes.text();
    let geminiData;
    try {
      geminiData = JSON.parse(geminiTextoCrudo);
    } catch {
      return NextResponse.json({ error: "Gemini no devolvio JSON", status: geminiRes.status, raw: geminiTextoCrudo.slice(0, 500) }, { status: 500 });
    }

    const textoRaw: string = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!textoRaw) {
      return NextResponse.json({ error: "Gemini sin texto", geminiData }, { status: 500 });
    }

    const limpio = textoRaw.replace(/```json|```/g, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(limpio);
    } catch {
      return NextResponse.json({ error: "No se pudo parsear la respuesta de Gemini", raw: limpio.slice(0, 500) }, { status: 500 });
    }

    return NextResponse.json({
      nombre: parsed.nombre ?? nombreOriginal,
      pista: parsed.pista ?? "",
      resto: parsed.resto ?? "",
    });
  } catch (err) {
    return NextResponse.json({ error: "Error al consultar", detalle: String(err) }, { status: 500 });
  }
}
