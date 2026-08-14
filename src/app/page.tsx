import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProcessSection } from "@/components/process-section";
import { ProofSection } from "@/components/proof-section";
import { ValueSection } from "@/components/value-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueSection />
      <ProcessSection />
      <ProofSection />
      <FinalCta />
      <Footer />
    </>
  );
}
