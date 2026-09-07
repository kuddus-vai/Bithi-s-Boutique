import React, { useState } from 'react';
import { Product, CategoryItem } from '../types';
import { CATEGORIES } from '../data/products';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Filter, Check } from 'lucide-react';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

interface ProductCatalogProps {
  products: Product[];
  categories?: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Derive active category tabs dynamically
  const categoryTabs = categories && categories.length > 0
    ? ['All Collections', ...categories.map((c) => c.name)]
    : Array.from(CATEGORIES);

  // Filter products
  const filteredProducts = products.filter((p) => {
    let matchesCategory = false;
    if (selectedCategory === 'All Collections') {
      matchesCategory = true;
    } else if (selectedCategory === 'Pure Luxury Lawn') {
      matchesCategory = p.fabric.toLowerCase().includes('lawn') || p.category.toLowerCase().includes('lawn');
    } else if (selectedCategory === 'Embroidered Chiffon') {
      matchesCategory = p.fabric.toLowerCase().includes('chiffon') || p.description.toLowerCase().includes('chiffon');
    } else if (selectedCategory === 'Festive Wedding Collection') {
      matchesCategory = p.category === selectedCategory || p.isBestseller || p.price >= 5500;
    } else {
      matchesCategory =
        p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim() ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(p.category.toLowerCase());
    }

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0] || 'Unstitched', product.colors[0] || 'Original');
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <section id="catalog" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[#C23330] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR CATALOG</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1F1F]">
            EXPLORE OUR PRODUCTS
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            অরিজিনাল পাকিস্তানি লাক্সারি লন ও ব্রাইডাল এক্সক্লুসিভ কালেকশন (১৭টি ইউনিক ডিজাইন)
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C23330] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter and Count Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-200 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">সকল পোশাক:</span>
            <span>মোট {sortedProducts.length}টি প্রিমিয়াম ড্রেস পাওয়া গেছে</span>
            {searchQuery && (
              <span className="text-stone-500 font-medium">
                (খোঁজা হচ্ছে: "{searchQuery}")
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-medium text-stone-700">সাজান:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:border-[#C23330] cursor-pointer"
            >
              <option value="featured">ডিফল্ট সাজানো (Featured)</option>
              <option value="price-low">দাম: কম থেকে বেশি (Low to High)</option>
              <option value="price-high">দাম: বেশি থেকে কম (High to Low)</option>
              <option value="rating">সর্বোচ্চ রেটিং (Customer Rating)</option>
            </select>
          </div>
        </div>

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="py-16 text-center text-stone-500 space-y-3">
            <p className="text-base font-medium">কোনো পোশাক খুঁজে পাওয়া যায়নি।</p>
            <button
              onClick={() => onSelectCategory('All Collections')}
              className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold"
            >
              সকল কালেকশন দেখুন
            </button>
          </div>
        )}

        {/* 5-Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {sortedProducts.map((product) => {
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
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    onError={handleImageError}
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
