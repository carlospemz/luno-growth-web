import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import VincentSplit from "@/components/sections/VincentSplit";
import ForWhom from "@/components/sections/ForWhom";
import SocialProof from "@/components/sections/SocialProof";
import CoreOffers from "@/components/sections/CoreOffers";
import AddonsControlled from "@/components/sections/AddonsControlled";
import SalesSequence from "@/components/sections/SalesSequence";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Founders from "@/components/sections/Founders";
import ManifestoQuote from "@/components/sections/ManifestoQuote";
import FAQ from "@/components/sections/FAQ";
import Brief from "@/components/sections/Brief";
import Contact from "@/components/sections/Contact";
import MobileBar from "@/components/sections/MobileBar";
import PageBackdrop from "@/components/layout/PageBackdrop";
import UrgencyBanner from "@/components/sections/UrgencyBanner";

export default function Home() {
  return (
    <>
      {/* Persistent night-sky canvas behind everything */}
      <PageBackdrop />

      <UrgencyBanner />
      <Navbar />

      <main className="relative z-10 pb-14 md:pb-0">
        {/* Entrada narrativa */}
        <Hero />

        {/* Pieza firmante de la marca */}
        <VincentSplit />

        {/* Para quién trabaja Vincent (salud-first) */}
        <ForWhom />

        {/* Prueba social honesta */}
        <SocialProof />

        {/* Los 3 núcleos (PDF abril 2026) */}
        <CoreOffers />

        {/* Complementos controlados */}
        <AddonsControlled />

        {/* El mapa de la secuencia de venta */}
        <SalesSequence />

        {/* Método */}
        <Process />

        {/* Casos reales + teaser de Care */}
        <Work />

        {/* Fundadores */}
        <Founders />

        {/* Quote de Ángel — rompe a fondo crema */}
        <ManifestoQuote />

        {/* Preguntas con posicionamiento dual */}
        <FAQ />

        {/* Brief intake — captura industry bucket */}
        <Brief />

        {/* Contact + Footer */}
        <Contact />
      </main>

      {/* Floating WhatsApp CTA (mobile) */}
      <MobileBar />
    </>
  );
}
