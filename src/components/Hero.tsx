import React, { useState } from 'react';
import { Sparkles, ArrowRight, ChevronRight, ChevronLeft, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, CategoryItem } from '../types';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

interface HeroProps {
  onExploreClick: () => void;
  onSelectCategory: (cat: string) => void;
  onSelectProduct?: (product: Product) => void;
  categories?: CategoryItem[];
  products?: Product[];
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onSelectCategory,
  onSelectProduct,
  categories,
  products = PRODUCTS,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide items
  const heroSlides = [
    {
      badge: '★ WINTER & FESTIVE DROP 2026',
      title: 'Roheenaz Luxury & Morja Vol. 7',
      subtitle: 'Exclusive Designer Lawn Drop',
      desc: 'Handcrafted resham needlework, digital printed silk dupattas, and pure breathable Swiss lawn crafted for festive grand celebrations.',
      priceTag: 'Starting From ৳4,850 BDT',
      product: products[0] || PRODUCTS[0],
      bgAccent: 'from-black/90 via-black/70 to-transparent',
    },
    {
      badge: '★ GULLJEE SIGNATURE EDIT',
      title: 'Morja Vol. 7 Festive Lawn',
      subtitle: 'Original Artisanal Needlecraft',
      desc: 'Master embroidery on supreme luxury lawn with heavy organza borders and jacquard woven dupatta ensembles.',
      priceTag: 'Special Offer: ৳5,200 BDT',
      product: products.find((p) => p.category.includes('Morja')) || products[10] || PRODUCTS[10],
      bgAccent: 'from-stone-950/90 via-stone-900/70 to-transparent',
    },
    {
      badge: '★ CELEBRITY BRIDAL EDITION',
      title: 'Roheenaz Haute Couture',
      subtitle: 'Royal Terracotta & Antique Gold',
      desc: 'Dense floral resham needlework with multi-angle photography so you see the exact stitch precision before doorstep delivery.',
      priceTag: 'Exclusive 20% OFF: ৳5,450 BDT',
      product: products[1] || PRODUCTS[1],
      bgAccent: 'from-neutral-950/90 via-neutral-900/70 to-transparent',
    },
  ];

  const currentHero = heroSlides[currentSlide];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const defaultSidebarCategories = [
    { name: 'Roheenaz Luxury Edition', count: 10, query: 'Roheenaz Luxury Edition' },
    { name: 'Morja Vol. 7 by Gulljee', count: 7, query: 'Morja Vol. 7 by Gulljee' },
    { name: 'Pure Swiss Lawn 3-Piece', count: 14, query: 'Pure Luxury Lawn' },
    { name: 'Embroidered Chiffon & Silk', count: 6, query: 'Embroidered Chiffon' },
    { name: 'Festive Wedding Collection', count: 17, query: 'All Collections' },
    { name: 'Unstitched Master Luxury', count: 17, query: 'All Collections' },
    { name: 'Digital Printed Dupattas', count: 12, query: 'Pure Luxury Lawn' },
  ];

  const sidebarCategories =
    categories && categories.length > 0
      ? categories.slice(0, 8).map((c) => {
          const matchCount = products.filter(
            (p) =>
              p.category.toLowerCase().trim() === c.name.toLowerCase().trim() ||
              p.category.toLowerCase().includes(c.name.toLowerCase()) ||
              c.name.toLowerCase().includes(p.category.toLowerCase())
          ).length;
          return {
            name: c.name,
            count: matchCount > 0 ? matchCount : 1,
            query: c.name,
          };
        })
      : defaultSidebarCategories;

  return (
    <section className="bg-[#F9F8F5] py-6 sm:py-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Vertical Categories Sidebar (Hidden on mobile, visible on desktop) */}
          <div className="hidden lg:block lg:col-span-3 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Red Top Header */}
            <div className="bg-[#C23330] text-white px-5 py-3.5 flex items-center justify-between font-bold text-xs uppercase tracking-wider">
              <span>CATEGORIES</span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">EXPLORE</span>
            </div>

            {/* List */}
            <div className="divide-y divide-stone-100">
              {sidebarCategories.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectCategory(item.query);
                    onExploreClick();
                  }}
                  className="w-full text-left px-5 py-3 text-xs text-stone-700 hover:bg-stone-50 hover:text-[#C23330] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span className="font-medium truncate mr-2">{item.name}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0 text-stone-400 group-hover:text-[#C23330]">
                    <span className="text-[11px] text-stone-400 font-mono">({item.count})</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom button in sidebar */}
            <div className="p-4 bg-stone-50/70 border-t border-stone-100">
              <button
                onClick={onExploreClick}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-[#C23330] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>সকল পোশাক ব্রাউজ করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Main Hero Banner */}
          <div className="lg:col-span-9">
            <div className="relative rounded-2xl overflow-hidden bg-[#121214] text-white shadow-xl min-h-[420px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
              {/* Background Product Image with Smooth Transition */}
              <img
                src={getImageUrl(currentHero.product.image)}
                alt={currentHero.title}
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70 transition-all duration-700 ease-in-out"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${currentHero.bgAccent}`} />

              {/* Top Row: Badge & Carousel Controls */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C23330] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>{currentHero.badge}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#C23330] border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="w-8 h-8 rounded-full bg-black/40 hover:bg-[#C23330] border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Content */}
              <div className="relative z-10 my-auto max-w-xl space-y-4 pt-6 pb-6">
                <div>
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                    {currentHero.title}
                  </h1>
                  <p className="font-serif italic text-xl sm:text-2xl text-[#FFC766] mt-1">
                    {currentHero.subtitle}
                  </p>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                  {currentHero.desc}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onExploreClick}
                    className="px-6 py-3.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>Shop Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#FFC766]">
                    {currentHero.priceTag}
                  </div>
                </div>
              </div>

              {/* Bottom Indicators */}
              <div className="relative z-10 flex items-center gap-2 pt-4 border-t border-white/10">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? 'w-8 bg-[#C23330]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
