import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "./LoadingScreen";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "auto";
    
    // Initialize main content animations
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, filter: "blur(10px)" },
        { 
          opacity: 1, 
          filter: "blur(0px)", 
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.3
        }
      );
    }

    // Refresh ScrollTrigger after content loads
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}

      {/* Main Content */}
      <div 
        ref={mainRef}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Navigation />
        
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        
        <FooterSection />
      </div>
    </div>
  );
};

export default PortfolioPage;