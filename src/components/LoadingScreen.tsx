import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([progressBarRef.current, textRef.current, percentRef.current], {
      opacity: 0,
      y: 20
    });

    // Animation sequence
    tl.to([textRef.current, percentRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2
    })
    .to(progressBarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5
    })
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
      }
    })
    .to([textRef.current, percentRef.current, progressBarRef.current?.parentElement], {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.5
    })
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        onLoadingComplete();
      }
    });

  }, [onLoadingComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Logo/Text */}
        <div 
          ref={textRef}
          className="text-6xl md:text-8xl font-bold text-gradient-glow tracking-tight"
        >
          MILAD
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-80 md:w-96">
          {/* Progress Bar Background */}
          <div className="h-1 glass rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-primary w-0 glow-primary"
            />
          </div>
          
          {/* Progress Percentage */}
          <div 
            ref={percentRef}
            className="text-center mt-4 text-lg font-medium text-muted-foreground"
          >
            0%
          </div>
        </div>
        
        {/* Floating Glow Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;