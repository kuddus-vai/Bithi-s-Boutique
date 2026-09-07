import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-[#EADBC8] my-8 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B38F27] fill-current" />
            <h2 className="font-serif text-2xl font-bold text-[#2C2623]">Your Wishlist ({wishlistProducts.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-[#2C2623] transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-[#D4AF37] mx-auto opacity-50" />
              <h3 className="font-serif text-lg font-bold text-[#2C2623]">Your wishlist is empty</h3>
              <p className="text-xs text-gray-500">Tap the heart icon on any outfit to save it for later.</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-[#2C2623] text-white text-xs font-bold rounded-xl"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-2xl bg-[#FCFAF7] border border-[#EADBC8] items-center cursor-pointer group hover:border-[#D4AF37] transition-all"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    onError={handleImageError}
                    className="w-16 h-20 object-cover rounded-xl flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#B38F27]">{product.category}</span>
                    <h4 className="font-serif font-bold text-sm text-[#2C2623] truncate group-hover:text-[#B38F27] transition-colors">{product.name}</h4>
                    <p className="text-xs font-bold text-[#2C2623] mt-1">৳{product.price.toLocaleString()}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveWishlist(product);
                      }}
                      className="text-xs text-red-600 hover:underline mt-2 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
