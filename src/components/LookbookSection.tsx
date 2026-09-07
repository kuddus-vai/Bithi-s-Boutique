import React, { useState } from 'react';
import { LOOKBOOK_IMAGES } from '../data/products';
import { Sparkles, Instagram, X, Eye } from 'lucide-react';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

export const LookbookSection: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<typeof LOOKBOOK_IMAGES[0] | null>(null);

  return (
    <section id="lookbook" className="py-20 sm:py-28 bg-[#1A1613] text-[#FCFAF7] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <a
            href="https://instagram.com/bithis.boutique"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-wider uppercase border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@bithis.boutique • Follow Us on Instagram</span>
          </a>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">The Editorial Lookbook</h2>
          <p className="text-xs sm:text-sm text-stone-300">
            Immersive editorial perspectives featuring authentic needlework, resham thread density, and signature drapes from Roheenaz Luxury & Morja Vol. 7.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKBOOK_IMAGES.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveLightbox(item)}
              className="group relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl cursor-pointer bg-[#25201C]"
            >
              <img
                src={getImageUrl(item.url)}
                alt={item.title}
                onError={handleImageError}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Editorial Capture #{idx + 1}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">{item.title}</h3>
                <p className="text-xs text-stone-300 mt-1 font-light">{item.subtitle}</p>

                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Full-Res</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#1A1613] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[3/4] w-full bg-black">
              <img
                src={getImageUrl(activeLightbox.url)}
                alt={activeLightbox.title}
                onError={handleImageError}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-[#1A1613]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Authentic Morja Vol. 7 Campaign
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">{activeLightbox.title}</h3>
              <p className="text-xs text-stone-300 mt-1">{activeLightbox.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

