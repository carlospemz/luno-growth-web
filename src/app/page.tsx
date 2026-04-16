import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import VincentSplit from "@/components/sections/VincentSplit";
import InteriorShell from "@/components/layout/InteriorShell";
import CoreOffers from "@/components/sections/CoreOffers";
import AddonsControlled from "@/components/sections/AddonsControlled";
import SalesSequence from "@/components/sections/SalesSequence";
import SocialProof from "@/components/sections/SocialProof";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import HealthFocus from "@/components/sections/HealthFocus";
import CareTeaser from "@/components/sections/CareTeaser";
import Founders from "@/components/sections/Founders";
import FAQ from "@/components/sections/FAQ";
import Brief from "@/components/sections/Brief";
import Contact from "@/components/sections/Contact";
import SiteFooter from "@/components/sections/SiteFooter";
import MobileBar from "@/components/sections/MobileBar";

/**
 * Canonical scroll journey per VINCENT-GROWTH-COPY-IA-047:
 *
 *   1.  Hero
 *   2.  Split (noche / día)
 *   3.  Tres sistemas (CoreOffers)
 *   4.  Complementos (AddonsControlled)
 *   5.  Cómo se combina (SalesSequence)
 *   6.  Promesas + Método (SocialProof + Process)
 *   7.  Casos (Work)
 *   8.  Foco salud (HealthFocus)
 *   9.  Teaser Vincent Care (CareTeaser)
 *   10. Founders
 *   11. FAQ
 *   12. Brief + Contact
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative z-10 pb-14 md:pb-0">
        {/* 1 · Hero */}
        <Hero />

        {/* 2 · Split — noche/día, pieza firmante */}
        <VincentSplit />

        <InteriorShell>
          {/* 3 · Tres sistemas */}
          <CoreOffers />

          {/* 4 · Complementos */}
          <AddonsControlled />

          {/* 5 · Cómo se combina */}
          <SalesSequence />

          {/* 6 · Promesas + método */}
          <SocialProof />
          <Process />

          {/* 7 · Casos */}
          <Work />

          {/* 8 · Foco salud */}
          <HealthFocus />

          {/* 9 · Teaser Vincent Care */}
          <CareTeaser />

          {/* 10 · Founders */}
          <Founders />

          {/* 11 · FAQ */}
          <FAQ />

          {/* 12 · Brief + Contact */}
          <Brief />
          <Contact />
        </InteriorShell>

        <SiteFooter />
      </main>

      <MobileBar />
    </>
  );
}
