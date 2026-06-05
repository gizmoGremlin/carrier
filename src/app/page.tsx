import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Pillars } from "@/components/Pillars";
import { HowItWorks } from "@/components/HowItWorks";
import { Comparison } from "@/components/Comparison";
import { UseCases } from "@/components/UseCases";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WaitlistProvider } from "@/components/Waitlist";

export default function Home() {
  return (
    <WaitlistProvider>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Pillars />
        <HowItWorks />
        <Comparison />
        <UseCases />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </WaitlistProvider>
  );
}
