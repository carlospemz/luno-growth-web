import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import CarePage from "@/components/sections/care/CarePage";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "VINCENT Care · Próximo lanzamiento",
  description:
    "Una solución creada exclusivamente para consultorios, clínicas y especialistas. Todavía no está abierto. Entra a la lista de espera para ser de los primeros en enterarte.",
  openGraph: {
    title: "VINCENT Care · Próximo lanzamiento",
    description:
      "Una solución creada exclusivamente para consultorios, clínicas y especialistas. Todavía no está abierto.",
    url: "https://vincent.mx/care",
    siteName: "VINCENT Care",
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Care() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <CarePage />
        <SiteFooter />
      </main>
    </>
  );
}
