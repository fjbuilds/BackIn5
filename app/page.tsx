import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BuiltFor from "@/components/BuiltFor";
import BeforeAfter from "@/components/BeforeAfter";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import CtaBand from "@/components/CtaBand";
import Faqs from "@/components/Faqs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero variant="transcript" />
        <BuiltFor />
        <BeforeAfter />
        <HowItWorks />
        <Comparison />
        <Pricing />
        <CtaBand />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
