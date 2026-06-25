import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LM Studio — Web Developer untuk UMKM",
  description: "Layanan Web untuk UMKM Ciayumajakuning. Landing page, company profile, toko online, dan aplikasi web custom.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}