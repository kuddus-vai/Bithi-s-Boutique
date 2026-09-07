import React, { useState } from 'react';
import { Sparkles, Heart, ShoppingBag, ArrowRight, Star, Check, MessageCircle, PlusCircle, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface CategoryShowcaseProps {
  title: string;
  subtitle: string;
  description?: string;
  categoryImage?: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onViewAllClick: () => void;
  onOpenAdmin?: () => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  title,
  subtitle,
  description,
  categoryImage,
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onViewAllClick,
  onOpenAdmin,
}) => {
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const displayProducts = products.slice(0, 5);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0] || 'Unstitched', product.colors[0] || 'Original');
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#C23330] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{subtitle}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F]">
              {title}
            </h2>
            {description && (
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl line-clamp-1">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {products.length > 0 && (
              <button
                onClick={onViewAllClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-[#C23330] text-white text-xs font-semibold tracking-wide transition-colors shadow-sm cursor-pointer"
              >
                <span>View All ({products.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Products or Elegant Curation Banner */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {displayProducts.map((product) => {
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
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Discount */}
                    {discountPercent && (
                      <span className="absolute top-2.5 left-2.5 bg-[#C23330] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        {discountPercent}% OFF
                      </span>
                    )}

                    {/* Wishlist */}
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
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* SKU */}
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                      {product.sku}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3.5 flex flex-col flex-1 justify-between space-y-2.5">
                    <div>
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

                      <h3 className="font-medium text-xs sm:text-sm text-[#1F1F1F] line-clamp-2 leading-snug group-hover:text-[#C23330] transition-colors">
                        {product.name}
                      </h3>
                    </div>

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
                            : 'bg-stone-900 text-white hover:bg-[#C23330]'
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
        ) : (
          /* Empty/Curation State for Newly Added Categories */
          <div className="relative rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-stone-700">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#C23330]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 w-full md:w-auto">
                {categoryImage ? (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-[#D4AF37]/40 flex-shrink-0 shadow-md">
                    <img
                      src={categoryImage}
                      alt={title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                )}

                <div className="space-y-1.5 text-left">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Exclusive Collection in Curation</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                    {description ||
                      'New authentic designer ensembles are being prepared for this exclusive collection. Contact our Dhaka studio for bespoke orders and fabric inquiries.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
                <a
                  href={`https://wa.me/8801818935353?text=${encodeURIComponent(
                    `Hello Bithi's Boutique! I am inquiring about pieces in the "${title}" collection.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>

                {onOpenAdmin && (
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Products in Admin</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
