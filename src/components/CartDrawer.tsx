import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  ArrowLeft,
  CreditCard
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOrderCreated?: (order: Order) => void;
  onOpenTrackingWithId?: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCreated,
  onOpenTrackingWithId,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState<'Inside Dhaka' | 'Outside Dhaka'>('Inside Dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'bKash' | 'Nagad'>('Cash on Delivery');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : deliveryCity === 'Inside Dhaka' ? 80 : 150;
  const finalTotal = subtotal - discount + shipping;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'FESTIVE10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setPromoMessage('✨ 10% Festive Discount Applied Successfully!');
    } else {
      setPromoMessage('❌ Invalid promo code. Try "FESTIVE10"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) return;

    const newId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowTime = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: newId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      deliveryCity,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending COD' : 'Paid',
      items: cartItems.map((ci) => ({
        productId: ci.product.id,
        productName: ci.product.name,
        image: ci.product.image,
        size: ci.selectedSize,
        color: ci.selectedColor,
        price: ci.product.price,
        quantity: ci.quantity,
      })),
      subtotal,
      discount,
      shippingFee: shipping,
      totalAmount: finalTotal,
      status: 'Pending',
      courierName: deliveryCity === 'Inside Dhaka' ? 'Steadfast Courier' : 'Pathao Courier',
      trackingNumber: `ST-${Math.floor(100000 + Math.random() * 900000)}`,
      notes: orderNotes.trim() || undefined,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'Pending',
          timestamp: nowTime,
          description: `Order placed by ${customerName} (${paymentMethod} - Total ৳${finalTotal.toLocaleString()})`,
        },
      ],
    };

    if (onOrderCreated) {
      onOrderCreated(newOrder);
    }

    setCreatedOrder(newOrder);
    setCheckoutSuccess(true);
    setIsCheckingOut(false);
    onClearCart();
  };

  const handleWhatsAppCheckout = () => {
    const itemsList = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (Size: ${item.selectedSize}, Color: ${item.selectedColor}, Qty: ${item.quantity}) - ৳${item.product.price * item.quantity}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `Hello Bithi's Boutique! 🌸\nI would like to order the following luxury ensembles:\n\n${itemsList}\n\nSubtotal: ৳${subtotal.toLocaleString()}\nDiscount: ৳${discount.toLocaleString()}\nShipping: ৳${shipping}\n*Total Payable: ৳${finalTotal.toLocaleString()}*\n\nPlease confirm availability and payment details.`
    );

    window.open(`https://wa.me/8801818935353?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EADBC8]">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FCFAF7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B38F27]" />
              <h2 className="font-serif text-xl font-bold text-[#2C2623]">Your Shopping Bag ({cartItems.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 text-[#2C2623] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Free Shipping Progress Meter */}
            {cartItems.length > 0 && !checkoutSuccess && (
              <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs">
                <div className="flex justify-between text-[11px] font-semibold text-[#1E1916] mb-1.5">
                  <span>
                    {subtotal >= 5000
                      ? '✨ You have unlocked FREE Express Delivery!'
                      : `Add ৳${(5000 - subtotal).toLocaleString()} more for FREE Express Delivery`}
                  </span>
                  <span className="text-[#B38F27] font-mono">
                    {Math.min(100, Math.round((subtotal / 5000) * 100))}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-600 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {checkoutSuccess && createdOrder ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#C23330] font-bold">
                    Order Confirmed
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#2C2623] mt-1">
                    Thank You, {createdOrder.customerName}!
                  </h3>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                    <span className="text-stone-500 font-semibold">Order ID:</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">{createdOrder.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Shipping Partner:</span>
                    <span className="font-semibold text-stone-800">{createdOrder.courierName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Consignment Code:</span>
                    <span className="font-mono text-[#C23330] font-bold">{createdOrder.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Total Payable:</span>
                    <span className="font-mono font-bold text-stone-900">৳{createdOrder.totalAmount.toLocaleString()} ({createdOrder.paymentStatus})</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-stone-600 text-[11px]">
                    Delivery: {createdOrder.deliveryAddress} ({createdOrder.deliveryCity})
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {onOpenTrackingWithId && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenTrackingWithId(createdOrder.id);
                      }}
                      className="w-full py-3 bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-bold rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Track This Order Live</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setCheckoutSuccess(false);
                      setCreatedOrder(null);
                      onClose();
                    }}
                    className="w-full py-3 bg-[#2C2623] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-stone-800 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handlePlaceOrder} className="space-y-4 animate-fade-in text-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="p-1 rounded-lg hover:bg-stone-100 text-stone-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    Delivery & Contact Details
                  </h3>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Sadia Islam"
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#C23330]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#C23330]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Full Delivery Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <textarea
                      rows={2}
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Apartment, House, Road, Area..."
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#C23330]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Delivery City</label>
                    <select
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value as any)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#C23330] cursor-pointer"
                    >
                      <option value="Inside Dhaka">Inside Dhaka (৳80)</option>
                      <option value="Outside Dhaka">Outside Dhaka (৳150)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#C23330] cursor-pointer font-semibold"
                    >
                      <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                      <option value="bKash">bKash (Send Money)</option>
                      <option value="Nagad">Nagad</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Notes for Courier (Optional)</label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Call before delivery"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#C23330]"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] space-y-1">
                  <div className="flex justify-between text-stone-600">
                    <span>Items Subtotal:</span>
                    <span className="font-mono font-bold">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping Fee:</span>
                    <span className="font-mono font-bold">{shipping === 0 ? 'FREE' : `৳${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-stone-900 font-bold pt-1 border-t border-stone-200 text-xs">
                    <span>Total Payable:</span>
                    <span className="font-mono text-[#C23330]">৳{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Order & Generate Tracking</span>
                </button>
              </form>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-24 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#D4AF37] mx-auto opacity-50" />
                <h3 className="font-serif text-lg font-bold text-[#2C2623]">Your bag is currently empty</h3>
                <p className="text-xs text-gray-500">Explore our festive collection and add your favorite ensembles.</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-3 bg-[#2C2623] text-white text-xs font-bold rounded-xl"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-[#FCFAF7] border border-[#EADBC8] items-center">
                    <img
                      src={getImageUrl(item.product.image)}
                      alt={item.product.name}
                      onError={handleImageError}
                      className="w-16 h-20 object-cover rounded-xl flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm text-[#2C2623] truncate">{item.product.name}</h4>
                      <p className="text-[11px] text-gray-500">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                      <p className="text-xs font-bold text-[#2C2623] mt-1">৳{item.product.price.toLocaleString()}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-[#EADBC8] rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(idx, -1)}
                            className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-0.5 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(idx, 1)}
                            className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Box */}
                <div className="p-4 rounded-2xl bg-white border border-[#EADBC8] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B38F27]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Have a promo code? (Try FESTIVE10)</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 text-xs bg-[#FCFAF7] border border-[#EADBC8] rounded-xl px-3 py-2 uppercase focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-[#2C2623] text-white text-xs font-bold rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && <p className="text-[11px] font-medium text-emerald-600">{promoMessage}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {!checkoutSuccess && !isCheckingOut && cartItems.length > 0 && (
            <div className="p-6 bg-[#FCFAF7] border-t border-[#EADBC8] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Bag Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Festive Discount (10%)</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `৳${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2C2623] pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span>৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp Now</span>
                </button>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 rounded-xl bg-[#2C2623] hover:bg-[#C23330] text-[#FCFAF7] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
                >
                  <span>Secure Online Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
