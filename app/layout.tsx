import type { Metadata } from "next";
import { Playfair_Display, Sail } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const alexBrush = Sail({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Altar del Tata Bombori | Maestro Juan Santiago - Amarres de Amor",
  description: "Amarres de amor, unión de parejas, endulzamiento y rituales ancestrales con el Maestro Juan Santiago, heredero del Tatabombori. Consulta confidencial por WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${alexBrush.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
