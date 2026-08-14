path1 = "app/layout.tsx"
with open(path1, "r") as f:
    c1 = f.read()

old1 = '''import { Playfair_Display, Sail, Cinzel } from "next/font/google";
import "./globals.css";
import MenuNav from "@/components/MenuNav";
import { Analytics } from "@vercel/analytics/next";

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
});'''
new1 = '''import { Playfair_Display, Sail, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import MenuNav from "@/components/MenuNav";
import { Analytics } from "@vercel/analytics/next";

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});'''
assert c1.count(old1) == 1
c1 = c1.replace(old1, new1)

old2 = '''      className={`${playfair.variable} ${alexBrush.variable} ${cinzel.variable} h-full antialiased`}'''
new2 = '''      className={`${playfair.variable} ${alexBrush.variable} ${cinzel.variable} ${inter.variable} h-full antialiased`}'''
assert c1.count(old2) == 1
c1 = c1.replace(old2, new2)

with open(path1, "w") as f:
    f.write(c1)

path2 = "components/SeccionCitas.tsx"
with open(path2, "r") as f:
    c2 = f.read()

old3 = '''        <div
          className="rounded-2xl bg-[#1a0a10]/70 backdrop-blur-md shadow-[0_20px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden text-left border border-[#c9a24b]/20 border-t-4 border-t-[#c9a24b]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >'''
new3 = '''        <div
          className="rounded-2xl bg-[#1a0a10]/70 backdrop-blur-md shadow-[0_20px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden text-left border border-[#c9a24b]/20 border-t-4 border-t-[#c9a24b]"
          style={{ fontFamily: "var(--font-inter)" }}
        >'''
assert c2.count(old3) == 1
c2 = c2.replace(old3, new3)

with open(path2, "w") as f:
    f.write(c2)

print("OK 12")
