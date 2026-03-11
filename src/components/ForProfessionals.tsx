import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ForProfessionals() {
  const { t } = useLanguage();

  return (
    <section className="py-32 px-6 bg-obsidian relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-charcoal p-12 md:p-20 flex flex-col items-center text-center border border-white/5 rounded-[3rem] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-2xl">
            <Briefcase className="w-10 h-10 text-champagne" />
          </div>
          
          <h2 className="relative z-10 text-4xl md:text-5xl font-medium tracking-tighter leading-tight mb-6 text-white">
            {t.pro.title}
          </h2>
          
          <p className="relative z-10 text-xl text-white/50 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            {t.pro.desc}
          </p>
          
          <button className="relative z-10 px-10 py-5 rounded-full border border-champagne text-champagne text-lg font-medium hover:bg-champagne hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(196,164,124,0.1)]">
            {t.pro.btnApply}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
