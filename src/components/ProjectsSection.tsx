import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GithubLogo } from "phosphor-react";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "3D Portfolio Website",
      description: "Immersive portfolio with Three.js integration and GSAP animations",
      tech: ["React", "Three.js", "GSAP", "TypeScript"],
      image: "/lovable-uploads/0a4c2d7b-9330-4b44-a319-aee997e307df.png",
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "Gaming UI Dashboard",
      description: "Futuristic gaming interface with real-time data visualization",
      tech: ["React", "D3.js", "WebGL", "Socket.io"],
      image: "/lovable-uploads/7644f90d-250a-48cb-91ce-c350dc0a6c85.png",
      github: "#",
      live: "#"
    },
    {
      id: 3,
      title: "Web Animation Tools",
      description: "Interactive animation learning platform with live code editor",
      tech: ["Vue.js", "GSAP", "Monaco", "WebComponents"],
      image: "/lovable-uploads/a3ac2b81-1e9c-4896-84a1-17e00359ceb6.png",
      github: "#",
      live: "#"
    },
    {
      id: 4,
      title: "Developer Portfolio",
      description: "Clean, animated portfolio showcasing creative development work",
      tech: ["Next.js", "Framer Motion", "Tailwind", "MDX"],
      image: "/lovable-uploads/82e28abc-28c1-4db5-a3f0-8bbf844bd5bb.png",
      github: "#",
      live: "#"
    },
    {
      id: 5,
      title: "AuthKit Interface",
      description: "Modern authentication system with glassmorphic design",
      tech: ["React", "Auth0", "Chakra UI", "TypeScript"],
      image: "/lovable-uploads/a0a5cdb2-b1c8-4077-9648-ea9d448ea86b.png",
      github: "#",
      live: "#"
    },
    {
      id: 6,
      title: "Interactive 3D Web",
      description: "Cutting-edge web experience with advanced 3D interactions",
      tech: ["React", "R3F", "Cannon", "Zustand"],
      image: "/lovable-uploads/beaa65ac-ea4b-4abd-8aab-ed5784750739.png",
      github: "#",
      live: "#"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const projectElements = projectsRef.current?.children;

    if (!section || !projectElements) return;

    // Set initial states
    gsap.set(projectElements, { opacity: 0, y: 80, scale: 0.9 });

    // Create scroll-triggered animation
    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 25%",
      onEnter: () => {
        gsap.to(projectElements, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        });
      }
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of immersive digital experiences crafted with cutting-edge 
            technologies and creative innovation
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group glass rounded-2xl overflow-hidden hover:glass-strong hover-lift transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Links */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.github}
                    className="p-2 glass rounded-lg hover:glass-strong transition-all duration-300"
                  >
                    <GithubLogo size={20} />
                  </a>
                  <a
                    href={project.live}
                    className="p-2 glass rounded-lg hover:glass-strong transition-all duration-300"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs glass rounded-full text-muted-foreground border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 py-3 glass border border-primary/30 rounded-lg text-foreground hover:glass-strong hover:border-primary/60 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2">
                  View Project
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-primary text-primary-foreground rounded-full font-semibold hover-lift glow-primary transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
    </section>
  );
};

export default ProjectsSection;