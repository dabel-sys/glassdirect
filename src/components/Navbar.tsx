import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { useTheme } from '../theme/ThemeContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const languages: { code: Language; name: string }[] = [
    { code: 'EN', name: 'English' },
    { code: 'NL', name: 'Nederlands' },
    { code: 'DE', name: 'Deutsch' }
  ];

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
            <a href="#shower" className="hover:text-white transition-colors">{t.nav.shower}</a>
            <a href="#interior" className="hover:text-white transition-colors">{t.nav.interior}</a>
            <a href="#outdoor" className="hover:text-white transition-colors">{t.nav.outdoor}</a>
            <a href="#inspiration" className="hover:text-white transition-colors">{t.nav.inspiration}</a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Innovative Language Selector */}
            <div className="hidden md:flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md items-center">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    language === lang.code 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-white/50 hover:text-white/90'
                  }`}
                >
                  {lang.code}
                </button>
              ))}
            </div>

            <button className="hidden md:block px-5 py-2.5 rounded-full bg-champagne text-white text-sm font-semibold hover:bg-champagne/90 transition-colors shadow-[0_0_20px_rgba(196,164,124,0.3)]">
              {t.nav.start3d}
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
          {t.nav.start3d}
        </button>
      </div>
    </>
  );
}
