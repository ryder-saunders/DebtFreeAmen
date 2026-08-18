import { FinalCta } from "./_components/final-cta";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { ProcessSection } from "./_components/process-section";
import { ProofSection } from "./_components/proof-section";
import { ValueSection } from "./_components/value-section";

export default function GhlCloneWithBrandingPage() {
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
