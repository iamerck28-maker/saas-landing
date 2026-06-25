import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LM Studio — Web Developer untuk UMKM | Landing Page, Toko Online, Aplikasi Web",
  description: "Jasa pembuatan website profesional untuk UMKM & bisnis lokal. Landing page, company profile, toko online, dan aplikasi web custom. Konsultasi gratis via WhatsApp.",
  keywords: ["web developer majalengka", "jasa website umkm", "landing page murah", "toko online", "company profile", "LM Studio"],
  openGraph: {
    title: "LM Studio — Web Developer untuk UMKM",
    description: "Jasa pembuatan website profesional untuk UMKM & bisnis lokal. Konsultasi gratis via WhatsApp.",
    url: "https://iamerck28-maker.github.io/saas-landing/",
    siteName: "LM Studio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LM Studio — Web Developer untuk UMKM",
    description: "Jasa pembuatan website profesional untuk UMKM & bisnis lokal. Konsultasi gratis via WhatsApp.",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
