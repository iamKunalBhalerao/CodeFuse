import CallToAction from "@/components/call-to-action";
import FeatureInfoSection from "@/components/FeatureInfo";
import Features from "@/components/Features";
import Footer from "@/components/footer";
import HeroSection from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeatureInfoSection />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
