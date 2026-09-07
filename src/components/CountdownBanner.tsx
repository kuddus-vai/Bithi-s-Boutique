import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface CountdownBannerProps {
  onExploreClick: () => void;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ onExploreClick }) => {
  // 14 days, 22 hours, 30 mins, 45 seconds countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 22,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const featuredOutfit = PRODUCTS[0];
  const secondaryOutfit = PRODUCTS[10];

  return (
    <section className="py-12 bg-[#F6F4EF] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141416] rounded-2xl overflow-hidden text-white shadow-2xl relative">
          {/* Ambient glow effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C23330]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C23330]/20 border border-[#C23330]/40 text-[#FF5A57] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIMITED TIME DEAL!</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
                Step into confidence with our <br className="hidden sm:inline" />
                <span className="text-[#FFC766]">Luxury Designer Lawn</span> Collection
              </h2>

              <p className="text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto lg:mx-0">
                Buy Now Discount is Running — Flat 20% Off on Selected Luxury Weaves! Authentic Pakistani Roheenaz & Morja Vol. 7 sets with doorstep cash on delivery across Bangladesh.
              </p>

              {/* Countdown Boxes */}
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center min-w-[65px] sm:min-w-[76px]">
                  <span className="block font-bold text-xl sm:text-2xl text-white font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                    Days
                  </span>
                </div>

                <span className="text-stone-500 font-bold text-lg">:</span>

                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center min-w-[65px] sm:min-w-[76px]">
                  <span className="block font-bold text-xl sm:text-2xl text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                    Hours
                  </span>
                </div>

                <span className="text-stone-500 font-bold text-lg">:</span>

                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center min-w-[65px] sm:min-w-[76px]">
                  <span className="block font-bold text-xl sm:text-2xl text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">
                    Mins
                  </span>
                </div>

                <span className="text-stone-500 font-bold text-lg">:</span>

                <div className="bg-[#C23330] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center min-w-[65px] sm:min-w-[76px] shadow-lg shadow-[#C23330]/30">
                  <span className="block font-bold text-xl sm:text-2xl text-white font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-red-200 uppercase tracking-wider font-medium">
                    Secs
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onExploreClick}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-[#C23330]/30 cursor-pointer"
                >
                  <span>Buy Now!</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side Visual Showcase */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src={featuredOutfit.image}
                  alt={featuredOutfit.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute bottom-4 left-4 right-4 bg-white/15 backdrop-blur-md border border-white/20 p-3.5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white truncate">{featuredOutfit.name}</p>
                      <p className="text-[11px] text-stone-300">Pure Swiss Lawn & Resham Zari</p>
                    </div>
                    <span className="font-bold text-sm text-[#FFC766]">
                      ৳{featuredOutfit.price.toLocaleString()} BDT
                    </span>
                  </div>
                </div>

                {/* Secondary badge */}
                <div className="absolute top-4 right-4 bg-[#C23330] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Special Offer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
