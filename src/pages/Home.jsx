import { useState, useCallback } from "react";
import Navigation from "../components/luxury/Navigation";
import Footer from "../components/luxury/Footer";
import LoadingOverlay from "../components/luxury/LoadingOverlay";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import AboutSection from "../components/home/AboutSection";
import TreatmentsSection from "../components/home/TreatmentsSection";
import AestheticMedicineSection from "../components/home/AestheticMedicineSection";
import ResultsSection from "../components/home/ResultsSection";
import TreatmentShowcase from "../components/home/TreatmentShowcase";
import CTASection from "../components/home/CTASection";
import InstagramSlider from "../components/home/InstagramSlider";
import InternationalPatientSection from "../components/home/InternationalPatientSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
     <LoadingOverlay onComplete={handleComplete} />
      <Navigation loaded={loaded}  />
     
      <main>
        <HeroSection loaded={loaded} />
        <StatsSection />
        <AboutSection />
        <TreatmentsSection />
       
        <AestheticMedicineSection />
        <ResultsSection />
        
        <InternationalPatientSection />
        <InstagramSlider />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}