import type { Metadata } from "next";
import { Playfair_Display, Sail, Cinzel } from "next/font/google";
import "./globals.css";
import MenuNav from "@/components/MenuNav";

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

const SITE_URL = "https://www.juansantiagoamarres.online";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Altar del Tata Bombori - Maestro Juan Santiago",
  image: OG_IMAGE,
  url: SITE_URL,
  telephone: "+59175928656",
  priceRange: "Bs 50 - Bs 450",
  description: "Amarres de amor, unión de parejas, endulzamiento, retorno del ser amado, alejamiento de terceros y consultas de Tarot y Hojas de Coca con el Maestro Juan Santiago, heredero del Tatabombori.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Norte de Potosí",
    addressRegion: "Potosí",
    addressCountry: "BO",
  },
  areaServed: "BO",
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${alexBrush.variable} ${cinzel.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <MenuNav />
        {children}
      </body>
    </html>
  );
}
