import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Code, GithubLogo, LinkedinLogo, TwitterLogo } from "phosphor-react";

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Set initial state
    gsap.set(footer.children, { opacity: 0, y: 30 });

    // Create scroll-triggered animation
    ScrollTrigger.create({
      trigger: footer,
      start: "top 90%",
      onEnter: () => {
        gsap.to(footer.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        });
      }
    });

    // Floating particles animation
    gsap.to(".footer-particle", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "random"
      }
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: <GithubLogo size={20} />, url: "https://github.com" },
    { name: "LinkedIn", icon: <LinkedinLogo size={20} />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <TwitterLogo size={20} />, url: "https://twitter.com" }
  ];

  return (
    <footer ref={footerRef} className="relative py-20 overflow-hidden border-t border-border/20">
      {/* Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="footer-particle absolute top-1/4 left-1/6 w-2 h-2 bg-primary/40 rounded-full" />
        <div className="footer-particle absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-secondary/40 rounded-full" />
        <div className="footer-particle absolute top-1/2 right-1/4 w-1 h-1 bg-accent/40 rounded-full" />
        <div className="footer-particle absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-primary/30 rounded-full" />
        <div className="footer-particle absolute top-1/3 right-1/6 w-1.5 h-1.5 bg-secondary/30 rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div 
              className="text-3xl font-bold text-gradient-primary mb-4 cursor-pointer hover-glow transition-all duration-300"
              onClick={scrollToTop}
            >
              MiladiCode
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Crafting digital experiences that inspire and engage through innovative design 
              and cutting-edge technology. Let's build the future together.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:glass-strong hover-lift transition-all duration-300 text-muted-foreground hover:text-primary"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Services</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-secondary transition-colors duration-300 cursor-pointer">
                Web Development
              </li>
              <li className="hover:text-secondary transition-colors duration-300 cursor-pointer">
                UI/UX Design
              </li>
              <li className="hover:text-secondary transition-colors duration-300 cursor-pointer">
                3D Web Experiences
              </li>
              <li className="hover:text-secondary transition-colors duration-300 cursor-pointer">
                Animation & Motion
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© 2024 Made with</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>by</span>
              <span className="text-primary font-medium">MiladiCode</span>
            </div>

            {/* Tech Stack Badge */}
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <Code size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                Built with React + GSAP + Three.js
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 glass rounded-full hover:glass-strong hover-lift glow-primary transition-all duration-300 z-30"
        aria-label="Scroll to top"
      >
        <svg 
          className="w-5 h-5 text-primary" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 15l7-7 7 7" 
          />
        </svg>
      </button>
    </footer>
  );
};

export default FooterSection;