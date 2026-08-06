"use client";

import { useState } from "react";

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-[#c9a24b]/20">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between text-left font-medium text-[#f5e6d3]"
          >
            <span>{item.pregunta}</span>
            <span className="text-[#c9a24b]">{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && (
            <p className="mt-2 text-[#f5e6d3]/70">{item.respuesta}</p>
          )}
        </div>
      ))}
    </div>
  );
}
