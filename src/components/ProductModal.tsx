import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, Sparkles, Check, MessageCircle, Ruler } from 'lucide-react';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Unstitched 3pc');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const allImages = [product.image, ...product.additionalImages];

  const getAngleLabel = (idx: number) => {
    if (idx === 0) return '1. Model Silhouette';
    if (idx === 1) return '2. Resham Embroidery Detail';
    if (idx === 2) return '3. Dupatta & Draping';
    if (idx === 3) return '4. Back / Border Styling';
    return `View #${idx + 1}`;
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Bithi's Boutique! I am interested in inquiring and ordering:\n\n*${product.name}*\nCollection: ${product.category}\nSKU: ${product.sku}\nColor: ${selectedColor}\nSize/Cut: ${selectedSize}\nQuantity: ${quantity}\nPrice: ৳${(product.price * quantity).toLocaleString()}\n\nPlease provide delivery confirmation and bKash/Nagad/COD payment details.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#EADBC8] my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1E1916] shadow-md transition-colors cursor-pointer border border-[#EADBC8]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 p-6 sm:p-10 gap-8">
          {/* Left Column: Image Gallery with Perspective Tabs */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 border border-[#EADBC8] relative group">
              <img
                src={getImageUrl(activeImage)}
                alt={product.name}
                onError={handleImageError}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#1E1916]/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium border border-white/20">
                {getAngleLabel(allImages.indexOf(activeImage))}
              </div>
            </div>

            {/* Thumbnail perspectives strip */}
            {allImages.length > 1 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Select Angle Perspective ({allImages.length} Views):
                </span>
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`h-20 w-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer relative ${
                        activeImage === img ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-stone-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getImageUrl(img)}
                        alt=""
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 font-bold">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#B38F27] font-bold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#B38F27]">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1916]">{product.name}</h2>

              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-[#1E1916]">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                  Ready to Dispatch
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{product.description}</p>

              {/* Fabric & Authentic Package Inclusions */}
              <div className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#EADBC8] text-xs text-[#1E1916] space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-[#B38F27]">
                  <Sparkles className="w-3.5 h-3.5" /> 3-Piece Designer Ensemble Inclusions
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-stone-700">
                  <p>• <strong>Shirt:</strong> {product.category.includes('Roheenaz') ? 'Pure Swiss/Luxury Lawn' : 'Pure Lawn Heavy Resham'}</p>
                  <p>• <strong>Dupatta:</strong> {product.category.includes('Roheenaz') ? 'Pure Chiffon / Silk Drape' : 'Luxury Draped Jacquard / Voile'}</p>
                  <p>• <strong>Trouser:</strong> Dyed Cotton Cambric</p>
                  <p>• <strong>SKU:</strong> {product.sku}</p>
                </div>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E1916]">
                    Color / Style: <span className="font-normal text-stone-600">{selectedColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'bg-[#1E1916] text-white border-[#1E1916]'
                            : 'bg-white text-stone-700 border-[#EADBC8] hover:border-[#D4AF37]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection & Size Guide trigger */}
              {product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-[#1E1916]">
                      Select Size / Stitching Option:
                    </label>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[11px] text-[#B38F27] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{showSizeGuide ? 'Hide Measurements' : 'Size & Stitching Guide'}</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#1E1916] text-white border-[#1E1916] shadow-sm'
                            : 'bg-white text-stone-700 border-[#EADBC8] hover:border-[#D4AF37]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Size Guide Accordion */}
                  {showSizeGuide && (
                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-stone-600 space-y-1.5 animate-fade-in">
                      <p className="font-bold text-[#1E1916]">Standard Stitched Measurements (Inches):</p>
                      <div className="grid grid-cols-4 gap-1 text-center font-mono">
                        <span className="bg-white p-1 rounded border">XS: 34" Bust</span>
                        <span className="bg-white p-1 rounded border">S: 36" Bust</span>
                        <span className="bg-white p-1 rounded border">M: 38" Bust</span>
                        <span className="bg-white p-1 rounded border">L: 42" Bust</span>
                      </div>
                      <p className="text-[10px] text-stone-500">Unstitched option can be tailored to any custom size.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-semibold text-[#1E1916]">Quantity:</span>
                <div className="flex items-center border border-[#EADBC8] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1 text-sm font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-[#1E1916]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1 text-sm font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#1E1916] text-[#FCFAF7] hover:bg-[#D4AF37] hover:text-[#1E1916]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Bag — ৳{(product.price * quantity).toLocaleString()}
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#B38F27] border-[#B38F27] text-white shadow'
                      : 'border-[#EADBC8] text-[#1E1916] hover:bg-stone-50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Direct WhatsApp Order Link */}
              <a
                href={`https://wa.me/8801818935353?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-emerald-600 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Direct VIP Order via WhatsApp (01818-935353)</span>
              </a>

              <div className="grid grid-cols-2 gap-3 text-[11px] text-stone-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#B38F27]" />
                  <span>Express Dispatch in 24 hrs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B38F27]" />
                  <span>100% Original Gulljee Brand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

