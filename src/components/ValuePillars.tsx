import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Factory, Truck, Eye } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ValuePillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const pillars = [
    {
      title: t.pillars.p1Title,
      text: t.pillars.p1Desc,
      icon: Factory
    },
    {
      title: t.pillars.p2Title,
      text: t.pillars.p2Desc,
      icon: Truck
    },
    {
      title: t.pillars.p3Title,
      text: t.pillars.p3Desc,
      icon: Eye
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-32 px-6 relative z-20 bg-[var(--color-obsidian)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 0.4 + index * 0.1],
              [100, 0]
            );
            const opacity = useTransform(
              scrollYProgress,
              [0.1, 0.4 + index * 0.1],
              [0, 1]
            );

            return (
              <motion.div
                key={index}
                style={{ y, opacity }}
                className="glass-panel rounded-3xl p-10 flex flex-col items-start hover:bg-white/[0.02] transition-colors duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                  <pillar.icon className="w-8 h-8 text-champagne" />
                </div>
                <h3 className="text-2xl font-medium mb-4 tracking-tight text-white">
                  {pillar.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light">
                  {pillar.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
