import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const steps = [
  {
    num: "1",
    title: "Measure & Design",
    desc: "Use our intuitive 3D designer and simple video guides to configure your setup."
  },
  {
    num: "2",
    title: "Precision Manufacturing",
    desc: "Custom cut and tempered at our high-tech European facility for millimeter-perfect accuracy."
  },
  {
    num: "3",
    title: "Direct Delivery",
    desc: "Safely packaged and delivered directly to your doorstep, ready for simple DIY installation or your local contractor."
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-charcoal relative z-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-20 text-center">
          From your screen to your doorstep.
        </h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2" />
          
          {/* Animated Glowing Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-champagne -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(196,164,124,0.5)]"
            style={{ scaleY: pathLength }}
          />

          <div className="space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                  
                  {/* Number Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-obsidian border-2 border-champagne flex items-center justify-center text-champagne font-medium z-10 shadow-[0_0_20px_rgba(196,164,124,0.2)]">
                    {step.num}
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="glass-panel p-8 rounded-3xl border border-black/5 hover:border-champagne/30 transition-colors duration-500"
                    >
                      <h3 className="text-2xl font-medium mb-4">{step.title}</h3>
                      <p className="text-black/60 font-light leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
