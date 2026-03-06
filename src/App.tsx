/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValuePillars from './components/ValuePillars';
import ProductShowcase from './components/ProductShowcase';
import TechEngine from './components/TechEngine';
import HowItWorks from './components/HowItWorks';
import ForProfessionals from './components/ForProfessionals';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-obsidian text-black min-h-screen selection:bg-champagne selection:text-white">
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
