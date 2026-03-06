import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-obsidian relative z-20 pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Massive CTA Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-[3rem] p-16 md:p-24 text-center mb-32 relative overflow-hidden group border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-tight mb-12 relative z-10 text-white">
            {t.footer.title1}<br/>{t.footer.title2}
          </h2>
          
          <button className="relative z-10 px-12 py-6 rounded-full bg-champagne text-white text-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_rgba(196,164,124,0.4)]">
            {t.footer.btnStart}
          </button>
        </motion.div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-white/40 font-light">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
            <a href="#" className="hover:text-white transition-colors">{t.footer.links[0]}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.links[1]}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.links[2]}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.links[3]}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.links[4]}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.links[5]}</a>
            <a href="#" className="hover:text-champagne transition-colors font-medium">{t.footer.links[6]}</a>
          </div>
          
          <div className="text-center md:text-right mt-8 md:mt-0">
            <p className="mb-2">© {new Date().getFullYear()} {t.footer.rights}</p>
            <p className="text-xs opacity-50">{t.footer.note}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
