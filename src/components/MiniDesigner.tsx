import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Maximize } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function MiniDesigner() {
  const { t } = useLanguage();

  const MATERIALS = [
    { 
      id: 'black-steel', 
      name: t.miniDesigner.materials.blackSteel, 
      style: { backgroundColor: '#18181b' } 
    },
    { 
      id: 'brushed-aluminium', 
      name: t.miniDesigner.materials.aluminium, 
      style: { background: 'linear-gradient(135deg, #9ca3af 0%, #f3f4f6 50%, #9ca3af 100%)' } 
    },
    { 
      id: 'messing', 
      name: t.miniDesigner.materials.messing, 
      style: { background: 'linear-gradient(135deg, #c5a059 0%, #f3d373 50%, #a67c33 100%)' } 
    },
  ];

  const GLASS_TYPES = [
    { id: 'clear', name: t.miniDesigner.glass.clear, style: 'bg-[#ffffff]/10 backdrop-blur-[2px]' },
    { id: 'frosted', name: t.miniDesigner.glass.frosted, style: 'bg-[#ffffff]/60 backdrop-blur-xl' },
    { id: 'smoked', name: t.miniDesigner.glass.smoked, style: 'bg-[#000000]/60 backdrop-blur-md' },
  ];

  const HANDLES = [
    { id: 'minimal', name: t.miniDesigner.handles.minimal },
    { id: 'classic', name: t.miniDesigner.handles.classic },
  ];

  const [material, setMaterial] = useState(MATERIALS[0]);
  const [glass, setGlass] = useState(GLASS_TYPES[0]);
  const [handle, setHandle] = useState(HANDLES[0]);

  return (
    <section className="py-32 px-6 lg:px-12 bg-[var(--color-obsidian)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            {t.miniDesigner.title1} <span className="text-champagne">{t.miniDesigner.title2}</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {t.miniDesigner.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photorealistic Visualizer */}
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-[#18181b] rounded-3xl border border-[#ffffff]/10 flex items-center justify-center overflow-hidden shadow-2xl">
            
            {/* Background Room Scene (what you see through the door) */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity duration-1000"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop')` }}
            />
            
            {/* Floor gradient for grounding */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#000000]/90 via-[#000000]/40 to-transparent z-0" />

            {/* The Door Render */}
            <motion.div 
              layout
              className="relative w-full max-w-[260px] aspect-[1/2.2] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10"
            >
              {/* Glass Panels Container (Behind the frame) */}
              <div className="absolute inset-0 flex flex-col p-3 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative flex-1 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
                    {/* Glass Material */}
                    <div className={`absolute inset-0 transition-all duration-700 ${glass.style}`} />
                    
                    {/* Glass Reflection Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ffffff]/10 to-transparent opacity-60 transform -skew-x-12 translate-x-1/4 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#ffffff]/5 to-transparent opacity-30 transform skew-x-12 -translate-x-1/4 pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Frame Parts (Outer) */}
              <div className="absolute top-0 bottom-0 left-0 w-3 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.5)] transition-all duration-700" style={material.style} />
              <div className="absolute top-0 bottom-0 right-0 w-3 shadow-[inset_2px_0_5px_rgba(0,0,0,0.5)] transition-all duration-700" style={material.style} />
              <div className="absolute top-0 left-0 right-0 h-3 shadow-[inset_0_-2px_5px_rgba(0,0,0,0.5)] transition-all duration-700" style={material.style} />
              <div className="absolute bottom-0 left-0 right-0 h-3 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] transition-all duration-700" style={material.style} />
              
              {/* Frame Parts (Mullions) */}
              <div className="absolute inset-0 p-3 flex flex-col pointer-events-none">
                <div className="flex-1" />
                <div className="h-2 w-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),inset_0_-1px_3px_rgba(0,0,0,0.5)] transition-all duration-700" style={material.style} />
                <div className="flex-1" />
                <div className="h-2 w-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),inset_0_-1px_3px_rgba(0,0,0,0.5)] transition-all duration-700" style={material.style} />
                <div className="flex-1" />
                <div className="h-2 w-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),inset_0_-1px_3px_rgba(0,0,0,0.5)] transition-all duration-700" style={material.style} />
                <div className="flex-1" />
              </div>

              {/* Handle */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center z-20">
                {handle.id === 'minimal' ? (
                  <div 
                    className="w-2.5 h-36 rounded-sm shadow-[10px_0_20px_rgba(0,0,0,0.5)] transition-all duration-700" 
                    style={{ 
                      ...material.style,
                      filter: 'brightness(0.7) contrast(1.2)' 
                    }} 
                  />
                ) : (
                  <div 
                    className="w-4 h-28 rounded-sm shadow-[10px_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-700" 
                    style={{ 
                      ...material.style,
                      filter: 'brightness(0.8) contrast(1.1)' 
                    }}
                  >
                    <div className="w-1.5 h-20 bg-[#000000]/40 rounded-full shadow-inner" />
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
                <h3 className="text-lg font-medium text-[var(--color-white-dynamic)]">{t.miniDesigner.material}</h3>
                <span className="text-sm text-zinc-500">{material.name}</span>
              </div>
              <div className="flex gap-4">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m)}
                    className={`w-14 h-14 rounded-full border-2 transition-all duration-300 ${
                      material.id === m.id ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'border-transparent hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                    style={m.style}
                    aria-label={m.name}
                  />
                ))}
              </div>
            </div>

            {/* Glass Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-medium text-[var(--color-white-dynamic)]">{t.miniDesigner.glassType}</h3>
                <span className="text-sm text-zinc-500">{glass.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {GLASS_TYPES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGlass(g)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      glass.id === g.id 
                        ? 'bg-[var(--color-white-dynamic)] text-[var(--color-black-dynamic)] border-[var(--color-white-dynamic)]' 
                        : 'bg-[var(--color-zinc-900-dynamic)]/50 text-[var(--color-zinc-400-dynamic)] border-[var(--color-white-dynamic)]/10 hover:bg-[var(--color-zinc-800-dynamic)] hover:text-[var(--color-white-dynamic)]'
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
                <h3 className="text-lg font-medium text-[var(--color-white-dynamic)]">{t.miniDesigner.hardware}</h3>
                <span className="text-sm text-zinc-500">{handle.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {HANDLES.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHandle(h)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      handle.id === h.id 
                        ? 'bg-[var(--color-white-dynamic)] text-[var(--color-black-dynamic)] border-[var(--color-white-dynamic)]' 
                        : 'bg-[var(--color-zinc-900-dynamic)]/50 text-[var(--color-zinc-400-dynamic)] border-[var(--color-white-dynamic)]/10 hover:bg-[var(--color-zinc-800-dynamic)] hover:text-[var(--color-white-dynamic)]'
                    }`}
                  >
                    {h.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 border-t border-[var(--color-white-dynamic)]/10">
              <button className="w-full group relative flex items-center justify-center gap-3 bg-champagne text-[var(--color-black-dynamic)] px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-[#ffffff]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Maximize className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{t.miniDesigner.btnOpen3D}</span>
                <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-sm text-zinc-500 mt-4">
                {t.miniDesigner.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
