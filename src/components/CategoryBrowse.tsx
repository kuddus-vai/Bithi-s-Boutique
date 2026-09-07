import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CategoryItem, Product } from '../types';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

interface CategoryBrowseProps {
  onSelectCategory: (cat: string) => void;
  categories?: CategoryItem[];
  products?: Product[];
}

export const CategoryBrowse: React.FC<CategoryBrowseProps> = ({
  onSelectCategory,
  categories,
  products = PRODUCTS,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const defaultCategories = [
    {
      id: 'roheenaz',
      name: 'Roheenaz Luxury',
      categoryQuery: 'Roheenaz Luxury Edition',
      count: '10 Ensembles',
      image: products.find((p) => p.category.includes('Roheenaz'))?.image || products[0]?.image || '',
    },
    {
      id: 'morja',
      name: 'Morja Vol. 7',
      categoryQuery: 'Morja Vol. 7 by Gulljee',
      count: '7 Ensembles',
      image: products.find((p) => p.category.includes('Morja'))?.image || products[10]?.image || '',
    },
    {
      id: 'swiss-lawn',
      name: 'Pure Swiss Lawn',
      categoryQuery: 'Pure Luxury Lawn',
      count: '14 Suits',
      image: products[2]?.image || products[0]?.image || '',
    },
    {
      id: 'chiffon',
      name: 'Chiffon Dupatta',
      categoryQuery: 'Embroidered Chiffon',
      count: '8 Suits',
      image: products[4]?.image || products[1]?.image || '',
    },
    {
      id: 'cotton',
      name: 'Cotton Dupatta',
      categoryQuery: 'Pure Luxury Lawn',
      count: '6 Suits',
      image: products[6]?.image || products[2]?.image || '',
    },
    {
      id: 'festive',
      name: 'Festive Bridal',
      categoryQuery: 'All Collections',
      count: '17 Suits',
      image: products[9]?.image || products[3]?.image || '',
    },
    {
      id: 'silk',
      name: 'Silk Collection',
      categoryQuery: 'Roheenaz Luxury Edition',
      count: '5 Suits',
      image: products[12]?.image || products[4]?.image || '',
    },
  ];

  const displayCategories =
    categories && categories.length > 0
      ? categories.map((c) => {
          const matchProducts = products.filter(
            (p) =>
              p.category.toLowerCase().trim() === c.name.toLowerCase().trim() ||
              p.category.toLowerCase().includes(c.name.toLowerCase()) ||
              c.name.toLowerCase().includes(p.category.toLowerCase())
          );
          const previewImg =
            c.image || matchProducts[0]?.image || products[0]?.image || '';
          return {
            id: c.id,
            name: c.name,
            categoryQuery: c.name,
            count: matchProducts.length > 0 ? `${matchProducts.length} Ensembles` : 'Curated Edit',
            image: previewImg,
          };
        })
      : defaultCategories;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryQuery: string) => {
    onSelectCategory(categoryQuery);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#C23330] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CATEGORIES</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F]">
              Browse By Category
            </h2>
          </div>

          {/* Slider Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-[#C23330] hover:text-white hover:border-[#C23330] transition-colors cursor-pointer shadow-sm"
              aria-label="Previous categories"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-[#C23330] hover:text-white hover:border-[#C23330] transition-colors cursor-pointer shadow-sm"
              aria-label="Next categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.categoryQuery)}
              className="flex-shrink-0 flex flex-col items-center text-center group cursor-pointer w-32 sm:w-36"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 border-2 border-stone-200 group-hover:border-[#C23330] transition-all duration-300 shadow-sm group-hover:shadow-md">
                <img
                  src={getImageUrl(cat.image)}
                  alt={cat.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-medium text-xs sm:text-sm text-[#1F1F1F] mt-3 group-hover:text-[#C23330] transition-colors leading-tight">
                {cat.name}
              </h3>
              <span className="text-[11px] text-stone-500 mt-0.5">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
