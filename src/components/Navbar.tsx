import { motion } from 'motion/react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pb-4 pt-[max(1rem,env(safe-area-inset-top))]"
      >
        <div className="max-w-7xl mx-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="text-xl font-semibold tracking-tight text-white">
            GlassDirect Europe
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-white/70">
            <a href="#shower" className="hover:text-white transition-colors">Shower & Bath</a>
            <a href="#interior" className="hover:text-white transition-colors">Interior Doors</a>
            <a href="#outdoor" className="hover:text-white transition-colors">Outdoor Living</a>
            <a href="#inspiration" className="hover:text-white transition-colors">Inspiration</a>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#pro" className="hidden md:block text-xs font-medium text-white/50 hover:text-white transition-colors uppercase tracking-wider">
              Pro/Trade Portal
            </a>
            <button className="hidden md:block px-5 py-2.5 rounded-full bg-champagne text-white text-sm font-semibold hover:bg-champagne/90 transition-colors shadow-[0_0_20px_rgba(196,164,124,0.3)]">
              Design in 3D
            </button>
            <button className="lg:hidden p-2 text-white/70 hover:text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 pb-[env(safe-area-inset-bottom)]">
        <button className="w-full py-4 rounded-full bg-champagne text-white text-base font-semibold hover:bg-champagne/90 transition-colors shadow-[0_0_30px_rgba(196,164,124,0.4)]">
          Design in 3D
        </button>
      </div>
    </>
  );
}
