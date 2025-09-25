import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, TwitterLogo } from "phosphor-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const social = socialRef.current;

    if (!section || !form || !social) return;

    // Set initial states
    gsap.set([form, social], { opacity: 0, y: 60 });

    // Create scroll-triggered animation
    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => {
        const tl = gsap.timeline();
        
        tl.to(form, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        })
        .to(social, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.5");
      }
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);

    // Success animation
    gsap.to(".submit-btn", {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const socialLinks = [
    { name: "GitHub", icon: <GithubLogo size={24} />, url: "https://github.com", color: "hover:text-foreground" },
    { name: "LinkedIn", icon: <LinkedinLogo size={24} />, url: "https://linkedin.com", color: "hover:text-blue-400" },
    { name: "Twitter", icon: <TwitterLogo size={24} />, url: "https://twitter.com", color: "hover:text-blue-500" }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="text-gradient-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 glass rounded-lg border border-input-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground/50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 glass rounded-lg border border-input-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground/50"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 glass rounded-lg border border-input-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground/50 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn w-full py-4 bg-gradient-primary text-primary-foreground rounded-lg font-semibold hover-lift glow-primary transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <PaperPlaneTilt size={20} className={isSubmitting ? "animate-pulse" : ""} />
            </button>
          </form>

          {/* Contact Info & Social */}
          <div ref={socialRef} className="space-y-8">
            {/* Contact Information */}
            <div className="glass rounded-2xl p-8 border border-card-glass-border/20">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Info</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Email</h4>
                  <a href="mailto:hello@zakisultan.com" className="text-secondary hover:text-primary transition-colors">
                    hello@zakisultan.com
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-secondary hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Location</h4>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-8 border border-card-glass-border/20">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Connect with me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 glass rounded-lg hover:glass-strong transition-all duration-300 text-muted-foreground ${social.color} hover-lift`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass rounded-2xl p-8 border border-card-glass-border/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-foreground font-medium">Available for Work</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Currently accepting new projects and collaborations. Let's build something incredible together!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-36 h-36 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default ContactSection;