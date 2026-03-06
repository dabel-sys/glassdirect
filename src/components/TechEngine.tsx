import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const features = [
  "Instant Live Pricing: Watch the exact price update as you design. No hidden fees.",
  "Customize Every Detail: Choose Clear, Frosted, or Smoke glass.",
  "Premium Hardware: Select Matte Black, Brushed Gold, or Chrome finishes.",
  "Smart Safety Checks: Our system automatically calculates glass thickness and weight limits."
];

export default function TechEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-obsidian relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-6">
            Order custom glass with zero stress.
          </h2>
          <p className="text-xl text-black/50 font-light mb-10">
            Say goodbye to complex quotation processes and waiting weeks for a price. Our proprietary 3D technology puts you in complete control.
          </p>
          
          <ul className="space-y-6">
            {features.map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4 text-black/70 text-lg font-light"
              >
                <CheckCircle2 className="w-6 h-6 text-champagne shrink-0 mt-0.5" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="order-1 lg:order-2 relative h-[600px] flex items-center justify-center perspective-[1000px]">
          {/* Main Device Mockup */}
          <motion.div 
            style={{ rotateX, rotateY, y: y1 }}
            className="relative w-full max-w-md aspect-[4/3] rounded-[2rem] border-[8px] border-gray-100 bg-white shadow-[0_0_100px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            <img 
              src="https://picsum.photos/seed/configurator/800/600" 
              alt="Configurator Interface"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
            
            {/* UI Overlay */}
            <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-4">
              <div className="h-2 w-1/3 bg-black/10 rounded-full mb-3" />
              <div className="h-2 w-2/3 bg-black/5 rounded-full" />
            </div>
          </motion.div>

          {/* Floating Mobile AR Mockup */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 w-32 md:w-40 aspect-[9/19] rounded-[2rem] border-[6px] border-gray-100 bg-white shadow-2xl overflow-hidden"
          >
            <img 
              src="https://picsum.photos/seed/ar/400/800" 
              alt="AR Projection"
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-2 border-champagne/50 m-4 rounded-lg border-dashed" />
          </motion.div>

          {/* Floating CTA */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute -left-4 md:-left-10 bottom-20 glass-panel rounded-2xl p-6 shadow-2xl border border-black/5"
          >
            <button className="text-sm font-medium text-black hover:text-champagne transition-colors flex items-center space-x-2">
              <span>Try the 3D Designer (Free)</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
