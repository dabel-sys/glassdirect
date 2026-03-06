import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-obsidian relative z-20 pt-32 pb-12 px-6 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Massive CTA Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-[3rem] p-16 md:p-24 text-center mb-32 relative overflow-hidden group border border-black/10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-tight mb-12 relative z-10">
            Ready to bring your<br/>vision to life?
          </h2>
          
          <button className="relative z-10 px-12 py-6 rounded-full bg-champagne text-white text-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_rgba(196,164,124,0.4)]">
            Launch 3D Configurator
          </button>
        </motion.div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-black/40 font-light">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
            <a href="#" className="hover:text-black transition-colors">Measuring Guides</a>
            <a href="#" className="hover:text-black transition-colors">Installation Videos</a>
            <a href="#" className="hover:text-black transition-colors">FAQ</a>
            <a href="#" className="hover:text-black transition-colors">Contact Us</a>
            <a href="#" className="hover:text-black transition-colors">Shipping & Returns</a>
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-champagne transition-colors font-medium">Trade Login</a>
          </div>
          
          <div className="text-center md:text-right mt-8 md:mt-0">
            <p className="mb-2">© {new Date().getFullYear()} GlassDirect Europe. All rights reserved.</p>
            <p className="text-xs opacity-50">Note: Custom-made products are non-returnable.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
