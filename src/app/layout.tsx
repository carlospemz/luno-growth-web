import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ═══════════════════════════════════════
   VINCENT — 3 fonts, 3 roles
   Headlines: Barlow Condensed ExtraBold (monumental impact)
   Body:      DM Sans (clean, legible)
   Data:      JetBrains Mono (verifiable, precise)
   ═══════════════════════════════════════ */

const barlow = Barlow_Condensed({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vincent.mx"),
  title: "VINCENT Growth · Tu negocio nunca duerme. Tú sí.",
  description:
    "Somos los artistas del futuro. Pintamos con código y con IA para que tu marca trabaje de noche y tú recuperes el día. Marca poética. Oferta quirúrgica.",
  applicationName: "VINCENT Growth",
  authors: [{ name: "VINCENT" }],
  keywords: [
    "VINCENT",
    "VINCENT Growth",
    "marketing con IA",
    "agencia Monterrey",
    "agencia Monclova",
    "Brand System",
    "Content Engine",
    "Demand Engine",
    "consultorios",
    "clínicas",
  ],
  openGraph: {
    title: "VINCENT Growth · Tu negocio nunca duerme. Tú sí.",
    description:
      "Somos los artistas del futuro. Pintamos con código y con IA para que tu marca trabaje de noche.",
    url: "https://vincent.mx",
    siteName: "VINCENT Growth",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VINCENT Growth · Tu negocio nunca duerme. Tú sí.",
    description:
      "Somos los artistas del futuro. Pintamos con código y con IA.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover" as const,
  themeColor: "#0B1E38",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlow.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
