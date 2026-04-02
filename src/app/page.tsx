import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ForWhom from "@/components/sections/ForWhom";
import SocialProof from "@/components/sections/SocialProof";
import AllInOne from "@/components/sections/AllInOne";
import Pricing from "@/components/sections/Pricing";
import Founders from "@/components/sections/Founders";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import Brief from "@/components/sections/Brief";
import Contact from "@/components/sections/Contact";
import MobileBar from "@/components/sections/MobileBar";
import PageBackdrop from "@/components/layout/PageBackdrop";
import UrgencyBanner from "@/components/sections/UrgencyBanner";


export default function Home() {
  return (
    <>
      <PageBackdrop />
      <UrgencyBanner />
      <Navbar />
      <main className="relative z-10 pb-14 md:pb-0">
        <Hero />
        <ForWhom />
        <SocialProof />
        <AllInOne />
        <Pricing />
        <Founders />
        <Process />
        <FAQ />
        <Brief />
        <Contact />
      </main>
      <MobileBar />
    </>
  );
}
