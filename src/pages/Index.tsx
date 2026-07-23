import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import StorySection from "@/sections/StorySection";
import Features from "@/sections/Features";
import AppScreenshots from "@/sections/AppScreenshots";
import Process from "@/sections/Process";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <Hero />
    <HowItWorks />
    <StorySection />
    <Features />
    <AppScreenshots />
    <Process />
    <Testimonials />
    <FAQ />
    <CTA />
    <Footer />
  </div>
);

export default Index;
