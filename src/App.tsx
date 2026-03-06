/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValuePillars from './components/ValuePillars';
import ProductShowcase from './components/ProductShowcase';
import TechEngine from './components/TechEngine';
import HowItWorks from './components/HowItWorks';
import ForProfessionals from './components/ForProfessionals';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-obsidian text-white min-h-screen selection:bg-champagne selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ValuePillars />
        <ProductShowcase />
        <TechEngine />
        <HowItWorks />
        <ForProfessionals />
      </main>
      <Footer />
    </div>
  );
}
