import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
