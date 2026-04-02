import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import WhatYouGet from "@/components/sections/WhatYouGet";
import Pricing from "@/components/sections/Pricing";
import Addons from "@/components/sections/Addons";
import Maintenance from "@/components/sections/Maintenance";
import WaaS from "@/components/sections/WaaS";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import Brief from "@/components/sections/Brief";
import Contact from "@/components/sections/Contact";
import MobileBar from "@/components/sections/MobileBar";
import PageBackdrop from "@/components/layout/PageBackdrop";


export default function Home() {
  return (
    <>
      <PageBackdrop />
      <Navbar />
      <main className="relative z-10 pb-14 md:pb-0">
        <Hero />
        <Work />
        <WhatYouGet />
        <Pricing />
        <Addons />
        <Maintenance />
        <WaaS />
        <Process />
        <FAQ />
        <Brief />
        <Contact />
      </main>
      <MobileBar />
    </>
  );
}
