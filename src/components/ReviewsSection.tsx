import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#B38F27] font-bold">Client Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2623]">Loved by 54,000+ Patrons</h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Read authentic reviews from our discerning clients who cherish our handcrafted ethnic wear across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#EADBC8] shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="absolute top-4 right-4 text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-[#B38F27]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">"{rev.comment}"</p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 relative z-10">
                <p className="font-serif font-bold text-base text-[#2C2623]">{rev.author}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-0.5">
                  <span>{rev.location}</span>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Buyer
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[#B38F27] mt-1 font-medium">Purchased: {rev.productName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
