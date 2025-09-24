import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../assets/milad-profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "React", icon: "⚛️", level: 95 },
    { name: "TypeScript", icon: "📘", level: 90 },
    { name: "GSAP", icon: "🎭", level: 88 },
    { name: "Node.js", icon: "🟢", level: 85 },
    { name: "Three.js", icon: "🎯", level: 82 },
    { name: "CSS/Tailwind", icon: "🎨", level: 93 }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skillElements = skillsRef.current?.children;

    if (!section || !image || !content || !skillElements) return;

    // Set initial states
    gsap.set([image, content], { opacity: 0, y: 60 });
    gsap.set(skillElements, { opacity: 0, scale: 0.8 });

    // Create scroll-triggered animation
    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => {
        const tl = gsap.timeline();
        
        tl.to(image, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        })
        .to(content, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.7")
        .to(skillElements, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.5");
      }
    });

    // Profile image hover animation
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.05,
        rotateY: 5,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        rotateY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    image.addEventListener("mouseenter", handleMouseEnter);
    image.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ScrollTrigger.killAll();
      image.removeEventListener("mouseenter", handleMouseEnter);
      image.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="relative w-80 h-80 rounded-full overflow-hidden glass border-2 border-primary/30 hover:border-primary/60 transition-all duration-300">
                <img 
                  src={profileImage}
                  alt="Milad Abdi - Creative Web Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full animate-float" />
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-accent rounded-full animate-float" style={{ animationDelay: "1s" }} />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gradient-primary">About</span> Me
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I specialize in frontend development with a passion for creating 
                  <span className="text-secondary"> immersive digital experiences</span> that 
                  push the boundaries of what's possible on the web.
                </p>
                <p>
                  With expertise in modern frameworks and cutting-edge animation libraries, 
                  I bring ideas to life through <span className="text-accent">clean code</span>, 
                  <span className="text-primary"> stunning visuals</span>, and seamless user interactions.
                </p>
                <p>
                  Every project is backed by <span className="text-secondary">clean code</span>, 
                  clear communication, and a commitment to delivering exceptional results on time, 
                  every time.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Tech Stack</h3>
              <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="group glass rounded-xl p-4 hover:glass-strong hover-lift transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="font-semibold text-foreground">{skill.name}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 delay-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground mt-1 block">
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default AboutSection;