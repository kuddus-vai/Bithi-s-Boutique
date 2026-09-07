import React from 'react';
import { Sparkles, Star, ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

interface SpotlightShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const SpotlightShowcase: React.FC<SpotlightShowcaseProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const spotlightProduct = products[0] || products[0];
  const sideProducts = products.slice(1, 4);

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-[#C23330] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED SHOWCASE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F]">
            PREMIUM PICKS
          </h2>
        </div>

        {/* 60 / 40 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Big Spotlight Card (7 cols) */}
          <div
            onClick={() => onSelectProduct(spotlightProduct)}
            className="lg:col-span-7 bg-[#1A1A1E] text-white rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl flex flex-col justify-end p-6 sm:p-10 min-h-[420px]"
          >
            {/* Background image with gradient overlay */}
            <img
              src={getImageUrl(spotlightProduct.image)}
              alt={spotlightProduct.name}
              onError={handleImageError}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="bg-[#C23330] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                SPOTLIGHT OF THE WEEK
              </span>
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>4.9 / 5.0</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-3">
              <span className="text-stone-300 text-xs tracking-wider uppercase font-mono">
                SKU: {spotlightProduct.sku}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {spotlightProduct.name}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 max-w-xl font-light">
                {spotlightProduct.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-xl sm:text-2xl text-white">
                    ৳{spotlightProduct.price.toLocaleString()} BDT
                  </span>
                  {spotlightProduct.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ৳{spotlightProduct.originalPrice.toLocaleString()} BDT
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(
                      spotlightProduct,
                      spotlightProduct.sizes[0] || 'Unstitched',
                      spotlightProduct.colors[0] || 'Original'
                    );
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-bold tracking-wide transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: 3 Stacked Mini Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {sideProducts.map((p) => {
              const isWishlisted = wishlistIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="bg-stone-50 hover:bg-white border border-stone-200 rounded-xl p-3 sm:p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-stone-300 cursor-pointer flex-1"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-stone-200 flex-shrink-0 relative">
                    <img
                      src={getImageUrl(p.image)}
                      alt={p.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(p);
                      }}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-[#C23330] transition-colors"
                    >
                      <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-[#C23330] text-[#C23330]' : ''}`} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <span className="text-[10px] font-mono text-stone-500 uppercase">
                      {p.sku}
                    </span>
                    <h4 className="font-medium text-xs sm:text-sm text-[#1F1F1F] line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">{p.fabric}</p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-[#1F1F1F]">
                          ৳{p.price.toLocaleString()} BDT
                        </span>
                        {p.originalPrice && (
                          <span className="text-[10px] text-stone-400 line-through">
                            ৳{p.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(p, p.sizes[0] || 'Unstitched', p.colors[0] || 'Original');
                        }}
                        className="p-1.5 rounded bg-stone-900 hover:bg-[#C23330] text-white text-xs transition-colors cursor-pointer"
                        title="Add to cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
