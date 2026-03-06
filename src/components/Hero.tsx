import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

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
  const introScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.2]);
  const introFilter = useTransform(scrollYProgress, [0, 0.08], ["blur(0px)", "blur(10px)"]);

  // Phase 1: Door Opening & Entering (0.10 - 0.30)
  const t1Opacity = useTransform(scrollYProgress, [0.10, 0.15, 0.25, 0.30], [0, 1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0.10, 0.30], [50, -50]);
  const t1Scale = useTransform(scrollYProgress, [0.10, 0.30], [0.8, 1.3]);
  const t1Filter = useTransform(scrollYProgress, [0.10, 0.15, 0.25, 0.30], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // Phase 2: Hallway Reveal - Left Side (0.35 - 0.55)
  const t2Opacity = useTransform(scrollYProgress, [0.32, 0.38, 0.50, 0.55], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.32, 0.55], [50, -50]);
  const t2Scale = useTransform(scrollYProgress, [0.32, 0.55], [0.8, 1.3]);
  const t2Filter = useTransform(scrollYProgress, [0.32, 0.38, 0.50, 0.55], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // Phase 3: Hallway Reveal - Right Side (0.60 - 0.80)
  const t3Opacity = useTransform(scrollYProgress, [0.58, 0.64, 0.74, 0.78], [0, 1, 1, 0]);
  const t3Y = useTransform(scrollYProgress, [0.58, 0.78], [50, -50]);
  const t3Scale = useTransform(scrollYProgress, [0.58, 0.78], [0.8, 1.3]);
  const t3Filter = useTransform(scrollYProgress, [0.58, 0.64, 0.74, 0.78], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // Phase 4: Conclusion (0.78 - 1.00)
  const t4Opacity = useTransform(scrollYProgress, [0.78, 0.84, 1], [0, 1, 1]);
  const t4Y = useTransform(scrollYProgress, [0.78, 1], [50, 0]);
  const t4Scale = useTransform(scrollYProgress, [0.78, 1], [0.8, 1]);
  const t4Filter = useTransform(scrollYProgress, [0.78, 0.84, 1], ["blur(10px)", "blur(0px)", "blur(0px)"]);

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
          style={{ opacity: introOpacity, y: introY, scale: introScale, filter: introFilter }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 text-white drop-shadow-sm">
            {t.hero.title1}<br className="hidden md:block" />
            <span className="text-white/70">{t.hero.title2}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>
        </motion.div>

        {/* Phase 1 - Centered (Door Opening) */}
        <motion.div 
          style={{ opacity: t1Opacity, y: t1Y, scale: t1Scale, filter: t1Filter }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-center px-6 text-center pointer-events-none"
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-md">{t.hero.phase1Title}</h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">{t.hero.phase1Desc}</p>
          </div>
        </motion.div>

        {/* Phase 2 - Centered (Hallway Reveal) */}
        <motion.div 
          style={{ opacity: t2Opacity, y: t2Y, scale: t2Scale, filter: t2Filter }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-center px-6 text-center pointer-events-none"
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-md">{t.hero.phase2Title}</h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">{t.hero.phase2Desc}</p>
          </div>
        </motion.div>

        {/* Phase 3 - Centered (Moving down hallway) */}
        <motion.div 
          style={{ opacity: t3Opacity, y: t3Y, scale: t3Scale, filter: t3Filter }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-center px-6 text-center pointer-events-none"
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-md">{t.hero.phase3Title}</h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">{t.hero.phase3Desc}</p>
          </div>
        </motion.div>

        {/* Phase 4 - Conclusion & CTA */}
        <motion.div 
          style={{ opacity: t4Opacity, y: t4Y, scale: t4Scale, filter: t4Filter }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] mb-6 text-white drop-shadow-md">
              {t.hero.phase4Title}
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
              {t.hero.phase4Desc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-champagne text-white text-lg font-medium hover:bg-champagne/90 transition-colors shadow-[0_0_30px_rgba(196,164,124,0.3)]">
                {t.hero.btnOpen3D}
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-sm">
                {t.hero.btnInspiration}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="text-xs uppercase tracking-widest text-white/50 font-medium">{t.hero.scroll}</div>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
