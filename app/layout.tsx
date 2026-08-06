import type { Metadata } from "next";
import { Playfair_Display, Sail, Cinzel } from "next/font/google";
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

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const SITE_URL = "https://juansantiagoamarres.online";
const OG_IMAGE = "https://res.cloudinary.com/dkq95jus0/image/upload/og-banner-juansantiago.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Altar del Tata Bombori | Maestro Juan Santiago - Amarres de Amor",
  description: "Amarres de amor, unión de parejas, endulzamiento y rituales ancestrales con el Maestro Juan Santiago, heredero del Tatabombori. Consulta confidencial por WhatsApp.",
  openGraph: {
    title: "Altar del Tata Bombori | Maestro Juan Santiago",
    description: "Amarres de amor, unión de parejas, endulzamiento y rituales ancestrales. Consulta confidencial por WhatsApp.",
    url: SITE_URL,
    siteName: "Altar del Tata Bombori",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Maestro Juan Santiago - Altar del Tata Bombori",
      },
    ],
    locale: "es_BO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altar del Tata Bombori | Maestro Juan Santiago",
    description: "Amarres de amor, unión de parejas, endulzamiento y rituales ancestrales. Consulta confidencial por WhatsApp.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${alexBrush.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
