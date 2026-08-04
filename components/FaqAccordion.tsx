"use client";

import { useState } from "react";

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-gray-200">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between text-left font-medium"
          >
            <span>{item.pregunta}</span>
            <span>{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && (
            <p className="mt-2 text-gray-600">{item.respuesta}</p>
          )}
        </div>
      ))}
    </div>
  );
}
