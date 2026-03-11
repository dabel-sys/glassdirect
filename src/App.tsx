/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValuePillars from './components/ValuePillars';
import ProductShowcase from './components/ProductShowcase';
import TechEngine from './components/TechEngine';
import HowItWorks from './components/HowItWorks';
import ForProfessionals from './components/ForProfessionals';
import MiniDesigner from './components/MiniDesigner';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function SmoothScrollSetup() {
  const lenis = useLenis((scroll) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export default function App() {
  return (
    <ReactLenis root autoRaf={false} options={{
      lerp: 0.07,
      wheelMultiplier: 1,
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
    }}>
      <SmoothScrollSetup />
      <div className="bg-[var(--color-obsidian)] text-[var(--color-white-dynamic)] min-h-screen selection:bg-champagne selection:text-[var(--color-black-dynamic)]">
        <Navbar />
        <main>
          <Hero />
          <ValuePillars />
          <ProductShowcase />
          <TechEngine />
          <HowItWorks />
          <ForProfessionals />
          <MiniDesigner />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
