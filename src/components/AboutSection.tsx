import React from 'react';
import { Sparkles, Award, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C23330]/10 text-[#C23330] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EST. 2020 • DHAKA, BANGLADESH</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F1F1F] leading-tight">
              Our Story & Commitment to <br className="hidden sm:inline" />
              <span className="text-[#C23330]">Authentic Quality</span>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
              Bithi's Boutique was established on <strong>24 April 2019</strong> in Dhaka with a singular, uncompromising mission: to bring 100% authentic, directly imported Pakistani luxury designer wear to Bangladesh. For over 7 years, we have partnered directly with acclaimed fashion houses — including <strong>Roheenaz Luxury Edition</strong> and <strong>Morja Vol. 7 by Gulljee</strong> — eliminating middlemen, counterfeit replicas, and compromise.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
              Every single 3-piece ensemble showcased in our boutique is photographed in authentic multi-angle high resolution: showing the true fabric drape, intricate resham zari embroidery, and pure digital silk/chiffon dupattas. With doorstep delivery and cash-on-delivery across all 64 districts of Bangladesh, you can touch and inspect every thread before payment.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#C23330]/10 text-[#C23330] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1F1F1F]">100% Original</h4>
                <p className="text-[11px] text-stone-500">Direct from manufacturer with verified brand tags.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#C23330]/10 text-[#C23330] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1F1F1F]">Pristine Fabric</h4>
                <p className="text-[11px] text-stone-500">Pure Swiss lawn, resham zari and digital printed silk.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#C23330]/10 text-[#C23330] flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1F1F1F]">Trusted Service</h4>
                <p className="text-[11px] text-stone-500">Fast Cash on Delivery and hassle-free exchange.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-stone-200">
              <div>
                <span className="block font-serif font-bold text-2xl sm:text-3xl text-[#1F1F1F]">
                  7+ Years
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500">Est. 24 Apr 2019</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-2xl sm:text-3xl text-[#1F1F1F]">
                  50,000+
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500">Happy Patrons in BD</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-2xl sm:text-3xl text-[#1F1F1F]">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500">Authentic Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-200 relative group">
              <img
                src={PRODUCTS[0].image}
                alt="Bithi's Boutique Craftsmanship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Quality Seal Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-stone-200 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#C23330] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-sm text-[#1F1F1F]">100% Quality Guaranteed</h5>
                  <p className="text-[11px] text-stone-500">Authorized importer of Roheenaz & Gulljee lawn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
