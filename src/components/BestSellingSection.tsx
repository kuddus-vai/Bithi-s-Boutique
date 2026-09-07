import React, { useState } from 'react';
import { Sparkles, Heart, ShoppingBag, ArrowRight, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface BestSellingSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onViewAllClick: () => void;
}

export const BestSellingSection: React.FC<BestSellingSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onViewAllClick,
}) => {
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Pick top 5 bestsellers matching screenshot layout
  const bestsellers = products
    .filter((p) => p.isBestseller || p.rating >= 4.8)
    .slice(0, 5);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0] || 'Unstitched 3-Piece', product.colors[0] || 'Original');
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#C23330] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TOP TRENDING</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F]">
              BEST SELLING PRODUCTS
            </h2>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-semibold tracking-wide transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {bestsellers.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPercent = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Discount Badge */}
                  {discountPercent && (
                    <span className="absolute top-2.5 left-2.5 bg-[#C23330] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-[#C23330] text-white'
                        : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-[#C23330]'
                    } shadow-sm cursor-pointer`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* SKU Badge */}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                    {product.sku}
                  </div>
                </div>

                {/* Details */}
                <div className="p-3.5 flex flex-col flex-1 justify-between space-y-2.5">
                  <div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-stone-600 ml-0.5">
                        {product.rating} ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-medium text-xs sm:text-sm text-[#1F1F1F] line-clamp-2 leading-snug group-hover:text-[#C23330] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Size chips */}
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.slice(0, 3).map((size) => (
                      <span
                        key={size}
                        className="text-[9px] px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded border border-stone-200"
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-sm sm:text-base text-[#1F1F1F]">
                        ৳{product.price.toLocaleString()} BDT
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-stone-400 line-through">
                          ৳{product.originalPrice.toLocaleString()} BDT
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        addedProductId === product.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1F1F1F] text-white hover:bg-[#C23330]'
                      }`}
                    >
                      {addedProductId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>+ Add To Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
