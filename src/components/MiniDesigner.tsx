import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Maximize } from 'lucide-react';

const MATERIALS = [
  { id: 'black', name: 'Mat Zwart', color: 'bg-zinc-900', border: 'border-zinc-800' },
  { id: 'oak', name: 'Eikenhout', color: 'bg-[#6b4423]', border: 'border-[#4a2f18]' },
  { id: 'steel', name: 'Geborsteld Staal', color: 'bg-slate-400', border: 'border-slate-500' },
  { id: 'white', name: 'Zuiver Wit', color: 'bg-gray-100', border: 'border-gray-300' },
];

const GLASS_TYPES = [
  { id: 'clear', name: 'Helder Glas', style: 'bg-white/5 backdrop-blur-sm' },
  { id: 'frosted', name: 'Matglas', style: 'bg-white/40 backdrop-blur-md' },
  { id: 'smoked', name: 'Rookglas', style: 'bg-black/40 backdrop-blur-md' },
];

const HANDLES = [
  { id: 'minimal', name: 'Minimalistisch' },
  { id: 'classic', name: 'Klassiek' },
];

export default function MiniDesigner() {
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [glass, setGlass] = useState(GLASS_TYPES[0]);
  const [handle, setHandle] = useState(HANDLES[0]);

  return (
    <section className="py-32 px-6 lg:px-12 bg-obsidian relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Ontwerp jouw <span className="text-champagne">perfecte deur.</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Experimenteer met materialen en afwerkingen. Ontdek de mogelijkheden voordat je de volledige 3D-studio instapt.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visualizer */}
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-zinc-900/30 rounded-3xl border border-white/5 flex items-center justify-center p-8 overflow-hidden">
            {/* Background glow based on material */}
            <div className={`absolute inset-0 opacity-20 blur-3xl transition-colors duration-700 ${material.color}`} />
            
            {/* The Door */}
            <motion.div 
              layout
              className={`relative w-full max-w-[280px] aspect-[1/2.2] rounded-sm shadow-2xl transition-colors duration-500 border-8 ${material.color} ${material.border} flex flex-col p-2 gap-2`}
            >
              {/* Glass Panels */}
              <div className={`flex-1 rounded-sm transition-all duration-500 ${glass.style}`} />
              <div className={`flex-1 rounded-sm transition-all duration-500 ${glass.style}`} />
              <div className={`flex-1 rounded-sm transition-all duration-500 ${glass.style}`} />
              <div className={`flex-1 rounded-sm transition-all duration-500 ${glass.style}`} />

              {/* Handle */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                {handle.id === 'minimal' ? (
                  <div className="w-1.5 h-32 bg-zinc-800 rounded-full shadow-sm transition-colors duration-300" />
                ) : (
                  <div className="w-3 h-24 bg-zinc-300 rounded-sm shadow-md flex items-center justify-center transition-colors duration-300">
                    <div className="w-1 h-16 bg-zinc-400 rounded-full" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="space-y-12">
            {/* Material Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium text-white">Materiaal</h3>
                <span className="text-sm text-zinc-500">{material.name}</span>
              </div>
              <div className="flex gap-4">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${m.color} ${
                      material.id === m.id ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-transparent hover:scale-105'
                    }`}
                    aria-label={m.name}
                  />
                ))}
              </div>
            </div>

            {/* Glass Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium text-white">Glas type</h3>
                <span className="text-sm text-zinc-500">{glass.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {GLASS_TYPES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGlass(g)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      glass.id === g.id 
                        ? 'bg-white text-black border-white' 
                        : 'bg-zinc-900/50 text-zinc-400 border-white/10 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Handle Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium text-white">Deurbeslag</h3>
                <span className="text-sm text-zinc-500">{handle.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {HANDLES.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHandle(h)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      handle.id === h.id 
                        ? 'bg-white text-black border-white' 
                        : 'bg-zinc-900/50 text-zinc-400 border-white/10 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {h.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 border-t border-white/10">
              <button className="w-full group relative flex items-center justify-center gap-3 bg-champagne text-obsidian px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Maximize className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Open 3D Studio</span>
                <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-sm text-zinc-500 mt-4">
                Jouw configuratie wordt meegenomen naar de studio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
