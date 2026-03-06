import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Animation sequences mapped to scroll progress (0 to 1)
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.12], [0, -100]);

  const t1Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0.15, 0.35], [100, -100]);

  const t2Opacity = useTransform(scrollYProgress, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.35, 0.55], [100, -100]);

  const t3Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const t3Y = useTransform(scrollYProgress, [0.55, 0.75], [100, -100]);

  const t4Opacity = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);
  const t4Y = useTransform(scrollYProgress, [0.75, 1], [100, 0]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video doesn't play automatically
    video.pause();

    let targetTime = 0;
    let currentTime = 0;
    let animationFrameId: number;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video.duration) {
        targetTime = latest * video.duration;
      }
    });

    const smoothScroll = () => {
      if (video.duration) {
        // Lerp (Linear Interpolation) for smoother scrubbing
        // Lowered to 0.05 for an even smoother, more premium feel with the new video
        currentTime += (targetTime - currentTime) * 0.05;
        
        // Only update the video time if the difference is large enough to avoid decoder thrashing
        if (Math.abs(currentTime - video.currentTime) > 0.01) {
          video.currentTime = currentTime;
        }
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[600vh] w-full bg-obsidian">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            ref={videoRef}
            muted 
            playsInline 
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/images/hero3d.mp4" type="video/mp4" />
            <img 
              src="https://picsum.photos/seed/architecture/1920/1080" 
              alt="Modern Architecture" 
              className="w-full h-full object-cover" 
            />
          </video>
        </div>

        {/* Intro Content */}
        <motion.div 
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 text-black">
            Premium custom glass.<br className="hidden md:block" />
            <span className="text-black/60">Designed by you.<br className="hidden md:block" /> Built for your home.</span>
          </h1>
          <p className="text-xl md:text-2xl text-black/60 font-light max-w-3xl mx-auto">
            Experience millimeter-perfect precision and factory-direct pricing.
          </p>
        </motion.div>

        {/* Phase 1 - Left Aligned */}
        <motion.div 
          style={{ opacity: t1Opacity, y: t1Y }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-24 pointer-events-none"
        >
          <div className="max-w-lg text-left glass-panel p-8 rounded-3xl border border-black/5 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-4">Uncompromising Clarity</h2>
            <p className="text-lg text-black/60 font-light leading-relaxed">Starting with 8mm toughened safety glass, cut to the millimeter for an absolutely perfect fit in your space.</p>
          </div>
        </motion.div>

        {/* Phase 2 - Right Aligned */}
        <motion.div 
          style={{ opacity: t2Opacity, y: t2Y }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-end px-8 md:px-24 pointer-events-none"
        >
          <div className="max-w-lg text-left glass-panel p-8 rounded-3xl border border-black/5 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-4">Engineered Perfection</h2>
            <p className="text-lg text-black/60 font-light leading-relaxed">Fitted with solid brass hardware, featuring a flawless chrome finish that resists wear and corrosion.</p>
          </div>
        </motion.div>

        {/* Phase 3 - Left Aligned */}
        <motion.div 
          style={{ opacity: t3Opacity, y: t3Y }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-24 pointer-events-none"
        >
          <div className="max-w-lg text-left glass-panel p-8 rounded-3xl border border-black/5 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-4">Effortless Motion</h2>
            <p className="text-lg text-black/60 font-light leading-relaxed">Experience a smooth, silent, and perfectly balanced opening mechanism designed for daily luxury.</p>
          </div>
        </motion.div>

        {/* Phase 4 - Conclusion & CTA */}
        <motion.div 
          style={{ opacity: t4Opacity, y: t4Y }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="glass-panel p-10 md:p-16 rounded-[3rem] border border-black/5 shadow-2xl max-w-4xl w-full">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1.1] mb-6 text-black">
              Your Vision, Realized.
            </h2>
            <p className="text-xl text-black/60 font-light mb-10 max-w-2xl mx-auto">
              Step into a new dimension of light and space. Design your perfect fit in real-time 3D today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-champagne text-white text-lg font-medium hover:bg-champagne/90 transition-colors shadow-[0_0_30px_rgba(196,164,124,0.3)]">
                Start your 3D Design
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-black/10 text-black text-lg font-medium hover:bg-black/5 transition-colors">
                Explore Collections
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="text-xs uppercase tracking-widest text-black/40 font-medium">Scroll to explore</div>
          <div className="w-px h-12 bg-gradient-to-b from-black/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
