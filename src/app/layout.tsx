import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LM Studio — Web Developer untuk UMKM | Landing Page, Toko Online, Aplikasi Web",
  description: "Jasa pembuatan website profesional untuk UMKM & bisnis lokal. Landing page, company profile, toko online, dan aplikasi web custom. Konsultasi gratis via WhatsApp.",
  keywords: ["web developer majalengka", "jasa website umkm", "landing page murah", "toko online", "company profile", "LM Studio", "pembuatan website cirebon", "web developer ciayumajakuning"],
  openGraph: {
    title: "LM Studio — Web Developer untuk UMKM Ciayumajakuning",
    description: "Jasa pembuatan website profesional untuk UMKM & bisnis lokal. Landing page, company profile, toko online, dan aplikasi web custom. Konsultasi gratis via WhatsApp.",
    url: "https://iamerck28-maker.github.io/saas-landing/",
    siteName: "LM Studio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://iamerck28-maker.github.io/saas-landing/firstcar-cover.jpg",
        width: 2000,
        height: 1650,
        alt: "LM Studio — Web Developer untuk UMKM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LM Studio — Web Developer untuk UMKM",
    description: "Jasa pembuatan website profesional untuk UMKM & bisnis lokal. Konsultasi gratis via WhatsApp.",
    images: ["https://iamerck28-maker.github.io/saas-landing/firstcar-cover.jpg"],
  },
  robots: "index, follow",
  icons: {
    icon: "/saas-landing/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://iamerck28-maker.github.io/saas-landing/",
              name: "LM Studio",
              description: "Jasa pembuatan website profesional untuk UMKM & bisnis lokal. Landing page, company profile, toko online, dan aplikasi web custom.",
              url: "https://iamerck28-maker.github.io/saas-landing/",
              telephone: "+6285176718017",
              email: "erik@lokermjl.com",
              areaServed: ["Cirebon", "Indramayu", "Majalengka", "Kuningan"],
              priceRange: "Rp 2.000.000 - Rp 10.000.000",
              foundingDate: "2024",
              foundingLocation: "Majalengka",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+6285176718017",
                contactType: "customer service",
                availableLanguage: ["Indonesian"],
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
