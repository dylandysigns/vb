import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LessonCards } from "./components/LessonCards";
import { Pricing } from "./components/Pricing";
import { WhyBeckers } from "./components/WhyBeckers";
import { AboutSection } from "./components/AboutSection";
import { Locations } from "./components/Locations";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { PackageProvider } from "./components/PackageContext";

export default function App() {
  return (
    <PackageProvider>
      <div className="min-h-screen bg-white" style={{ fontFamily: "'zeitung', 'Inter', sans-serif" }}>
        <Header />
        <main>
          <HeroSection />
          <LessonCards />
          <Pricing />
          <WhyBeckers />
          <AboutSection />
          <Locations />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </PackageProvider>
  );
}
