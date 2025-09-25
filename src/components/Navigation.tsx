import { useState, useEffect } from "react";
import { List, X, Code, User, Briefcase, Envelope } from "phosphor-react";
import { gsap } from "gsap";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(".mobile-menu", 
        { opacity: 0, x: "100%" }, 
        { opacity: 1, x: "0%", duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(".mobile-menu-item", 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isMenuOpen]);

  const navItems = [
    { id: "hero", label: "Home", icon: <Code size={20} /> },
    { id: "about", label: "About", icon: <User size={20} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={20} /> },
    { id: "contact", label: "Contact", icon: <Envelope size={20} /> },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "glass-strong py-4" : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-gradient-primary cursor-pointer hover-glow"
            onClick={() => scrollToSection("hero")}
          >
            ZS
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-primary transition-all duration-300 hover:glow-primary px-4 py-2 rounded-lg glass hover:glass-strong"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-full font-medium hover-lift glow-primary"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 glass rounded-lg hover:glass-strong transition-all duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={toggleMenu} />
          <div className="mobile-menu absolute right-0 top-0 h-full w-80 glass-strong p-8">
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-bold text-gradient-primary">ZS</div>
              <button onClick={toggleMenu} className="p-2 glass rounded-lg">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-menu-item w-full flex items-center space-x-4 p-4 glass rounded-lg hover:glass-strong transition-all duration-300 text-left"
                >
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </button>
              ))}
              <button 
                onClick={() => scrollToSection("contact")}
                className="mobile-menu-item w-full mt-8 px-6 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover-lift glow-primary"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;