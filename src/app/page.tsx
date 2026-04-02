import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ForWhom from "@/components/sections/ForWhom";
import Pricing from "@/components/sections/Pricing";
import AllInOne from "@/components/sections/AllInOne";
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
        <ForWhom />
        <AllInOne />
        <Pricing />
        <Process />
        <FAQ />
        <Brief />
        <Contact />
      </main>
      <MobileBar />
    </>
  );
}
