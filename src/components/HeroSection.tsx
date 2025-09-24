import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Download } from "phosphor-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Initial state - elements are invisible with blur
    gsap.set([headlineRef.current, subtitleRef.current, buttonsRef.current, splineRef.current], {
      opacity: 0,
      y: 60,
      filter: "blur(10px)"
    });

    // Animate elements in sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    }, "-=1");

    // Floating animation for background elements
    gsap.to(".floating-orb", {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });

  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Spline 3D Model */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/rollingrectangles-uyiZwIVWFe8ZN0mGcyaWLBI4/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Neon Orbs */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="floating-orb absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
        <div className="floating-orb absolute top-3/4 right-1/4 w-24 h-24 bg-accent/30 rounded-full blur-xl" />
        <div className="floating-orb absolute top-1/2 left-1/6 w-20 h-20 bg-secondary/25 rounded-full blur-xl" />
        <div className="floating-orb absolute bottom-1/4 right-1/3 w-28 h-28 bg-primary/15 rounded-full blur-xl" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient-glow">Milad</span>
            <br />
            <span className="text-foreground/90">Web Developer</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences that inspire and engage through 
            <span className="text-secondary"> innovative design</span> and 
            <span className="text-accent"> cutting-edge technology</span>
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection("projects")}
              className="group px-8 py-4 bg-gradient-primary text-primary-foreground rounded-full font-semibold hover-lift glow-primary flex items-center gap-3 transition-all duration-300"
            >
              View My Work
              <ArrowRight 
                size={20} 
                className="group-hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
            <button className="px-8 py-4 glass border border-primary/30 text-foreground rounded-full font-semibold hover:glass-strong hover-lift flex items-center gap-3 transition-all duration-300">
              Download CV
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 glass rounded-full border border-primary/30 flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Spline Container for Animation Control */}
      <div ref={splineRef} className="absolute inset-0 pointer-events-none" />
    </section>
  );
};

export default HeroSection;