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
  // The video is 7 seconds long.
  // 0.00 - 0.15: Door opens
  // 0.15 - 0.30: Moving through the door
  // 0.30 - 1.00: Moving down the hallway revealing various doors

  const introOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.08], [0, -50]);
  const introScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.95]);

  // Phase 1: Door Opening & Entering (0.10 - 0.30)
  const t1Opacity = useTransform(scrollYProgress, [0.10, 0.15, 0.25, 0.30], [0, 1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0.10, 0.30], [50, -50]);

  // Phase 2: Hallway Reveal - Left Side (0.35 - 0.55)
  const t2Opacity = useTransform(scrollYProgress, [0.32, 0.38, 0.50, 0.55], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.32, 0.55], [50, -50]);

  // Phase 3: Hallway Reveal - Right Side (0.60 - 0.80)
  const t3Opacity = useTransform(scrollYProgress, [0.58, 0.64, 0.74, 0.78], [0, 1, 1, 0]);
  const t3Y = useTransform(scrollYProgress, [0.58, 0.78], [50, -50]);

  // Phase 4: Conclusion (0.78 - 1.00)
  const t4Opacity = useTransform(scrollYProgress, [0.78, 0.84, 1], [0, 1, 1]);
  const t4Y = useTransform(scrollYProgress, [0.78, 1], [50, 0]);
  const t4Scale = useTransform(scrollYProgress, [0.78, 1], [0.95, 1]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS/Safari fix: Force load and play/pause to unlock the video playhead
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        video.pause();
      }).catch(() => {
        video.pause();
      });
    } else {
      video.pause();
    }

    let targetTime = 0;
    let currentTime = 0;
    let lastVideoTime = -1;
    let animationFrameId: number;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video.duration) {
        targetTime = latest * video.duration;
      }
    });

    const smoothScroll = () => {
      // Only scrub if we have metadata (readyState >= 1)
      if (video.readyState >= 1 && video.duration) {
        // Lerp (Linear Interpolation) for smoother scrubbing
        currentTime += (targetTime - currentTime) * 0.08;
        
        // Snap to 30fps (0.0333s) to help the browser's video decoder find exact frames
        const snappedTime = Number((Math.round(currentTime * 30) / 30).toFixed(3));
        
        if (snappedTime !== lastVideoTime) {
          video.currentTime = snappedTime;
          lastVideoTime = snappedTime;
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
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        
        {/* Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video 
            ref={videoRef}
            muted 
            playsInline 
            autoPlay
            preload="auto"
            className="w-full h-full object-cover will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            <source src="/images/hero3d.mp4" type="video/mp4" />
            <img 
              src="https://picsum.photos/seed/architecture/1920/1080" 
              alt="Modern Architecture" 
              className="w-full h-full object-cover" 
            />
          </video>
          {/* Soft black overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Intro Content */}
        <motion.div 
          style={{ opacity: introOpacity, y: introY, scale: introScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 text-white drop-shadow-sm">
            Premium custom glass.<br className="hidden md:block" />
            <span className="text-white/70">Designed by you.<br className="hidden md:block" /> Built for your home.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl mx-auto">
            Experience millimeter-perfect precision and factory-direct pricing.
          </p>
        </motion.div>

        {/* Phase 1 - Left Aligned (Door Opening) */}
        <motion.div 
          style={{ opacity: t1Opacity, y: t1Y }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-24 pointer-events-none"
        >
          <div className="max-w-3xl text-left">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-md">Seamless Integration.</h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">Precision-cut glass that fits your space flawlessly. Watch as your custom design opens up new possibilities.</p>
          </div>
        </motion.div>

        {/* Phase 2 - Right Aligned (Hallway Reveal) */}
        <motion.div 
          style={{ opacity: t2Opacity, y: t2Y }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-end px-8 md:px-24 pointer-events-none"
        >
          <div className="max-w-3xl text-right">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-md">Endless Configurations.</h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">From crystal clear to frosted privacy glass. Choose the perfect finish, hardware, and dimensions for your project.</p>
          </div>
        </motion.div>

        {/* Phase 3 - Left Aligned (Moving down hallway) */}
        <motion.div 
          style={{ opacity: t3Opacity, y: t3Y }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-24 pointer-events-none"
        >
          <div className="max-w-3xl text-left">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-md">Crafted for Wellness.</h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">Whether it's a luxury sauna, a bespoke shower, or an elegant interior door, we deliver factory-direct perfection.</p>
          </div>
        </motion.div>

        {/* Phase 4 - Conclusion & CTA */}
        <motion.div 
          style={{ opacity: t4Opacity, y: t4Y, scale: t4Scale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 text-white drop-shadow-md">
              Design Your Sanctuary.
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
              Step into a new dimension of light and space. Configure your perfect glass solution in real-time 3D today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-champagne text-white text-lg font-medium hover:bg-champagne/90 transition-colors shadow-[0_0_30px_rgba(196,164,124,0.3)]">
                Start your 3D Design
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-sm">
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
          <div className="text-xs uppercase tracking-widest text-white/50 font-medium">Scroll to explore</div>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
