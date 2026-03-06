import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video doesn't play automatically
    video.pause();

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video.duration) {
        // Use requestAnimationFrame to ensure smooth updates
        requestAnimationFrame(() => {
          video.currentTime = latest * video.duration;
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-obsidian">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            ref={videoRef}
            muted 
            playsInline 
            preload="auto"
            className="w-full h-full object-cover opacity-40"
          >
            {/* Replace this src with the URL of your uploaded video */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-building-with-glass-facade-4172-large.mp4" type="video/mp4" />
            {/* Fallback image */}
            <img 
              src="https://picsum.photos/seed/architecture/1920/1080" 
              alt="Modern Architecture" 
              className="w-full h-full object-cover" 
            />
          </video>
          {/* Gradient overlays for text readability and blending into the next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/20 to-obsidian" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/50" />
        </div>

        {/* Content */}
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20"
        >
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 text-black"
          >
            Premium custom glass.<br className="hidden md:block" />
            <span className="text-black/60">Designed by you.<br className="hidden md:block" /> Built for your home.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-black/60 font-light mb-12 max-w-3xl mx-auto"
          >
            Experience millimeter-perfect precision and factory-direct pricing, without the traditional showroom markup. Design your perfect fit in real-time 3D.
          </motion.p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-champagne text-white text-lg font-medium hover:bg-champagne/90 transition-colors shadow-[0_0_30px_rgba(196,164,124,0.3)]">
              Start your 3D Design
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-black text-lg font-medium hover:bg-black/5 transition-colors">
              Explore Collections
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="text-xs uppercase tracking-widest text-black/40 font-medium">Scroll to explore</div>
          <div className="w-px h-12 bg-gradient-to-b from-black/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
