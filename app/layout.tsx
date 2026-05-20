import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syed Osman — Full-Stack AI Engineer",
  description:
    "Full-stack developer and AI engineer. Building intelligent products with multi-agent systems, RAG pipelines, and LLMs. Available for roles and contracts.",
  keywords: ["AI engineer", "full-stack developer", "React", "Python", "LLM", "multi-agent"],
  authors: [{ name: "Syed Osman" }],
  openGraph: {
    title: "Syed Osman — Full-Stack AI Engineer",
    description: "I build software that builds software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
