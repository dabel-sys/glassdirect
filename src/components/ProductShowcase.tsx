import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    title: "Bespoke Shower Doors",
    subtitle: "Upgrade your bathroom.",
    image: "/images/Gemini_Generated_Image_6hdvd66hdvd66hdv.jpeg",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1 md:row-span-2"
  },
  {
    title: "Interior Glass Partitions",
    subtitle: "Let the light flow.",
    image: "/images/Gemini_Generated_Image_agulvdagulvdagul.jpeg",
    colSpan: "col-span-1",
    rowSpan: "row-span-1"
  },
  {
    title: "Patio Sliding Glass Walls",
    subtitle: "Extend your outdoor living.",
    image: "/images/Gemini_Generated_Image_lpzjholpzjholpzj.jpeg",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1"
  },
  {
    title: "Sauna & Steam Room Doors",
    subtitle: "Spa luxury at home.",
    image: "/images/Gemini_Generated_Image_zam84lzam84lzam8.jpeg",
    colSpan: "col-span-1",
    rowSpan: "row-span-1"
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-32 px-6 bg-charcoal relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight max-w-3xl">
            Transform every space.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-3xl ${product.colSpan} ${product.rowSpan}`}
            >
              <img 
                src={product.image} 
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-medium text-white mb-1">
                    {product.title}
                  </h3>
                  <p className="text-white/70 font-light mb-4">{product.subtitle}</p>
                </div>
                
                <div className="overflow-hidden">
                  <button className="flex items-center space-x-2 text-champagne font-medium text-sm uppercase tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <span>Configure this style</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
