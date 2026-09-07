import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import { 
  Search, 
  X, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    setHasSearched(true);
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === query ||
        o.customerPhone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, '')) ||
        o.trackingNumber.toLowerCase() === query
    );
    setSearchedOrder(found || null);
  };

  const handleQuickSelect = (order: Order) => {
    setSearchInput(order.id);
    setSearchedOrder(order);
    setHasSearched(true);
  };

  const handleCopyTracking = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusColors: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
    Pending: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
    Confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
    Processing: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
    Dispatched: { bg: 'bg-indigo-100', text: 'text-indigo-800', dot: 'bg-indigo-500' },
    'Out for Delivery': { bg: 'bg-cyan-100', text: 'text-cyan-800', dot: 'bg-cyan-500' },
    Delivered: { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
    Cancelled: { bg: 'bg-rose-100', text: 'text-rose-800', dot: 'bg-rose-500' },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C23330] text-white flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                অর্ডার ও ডেলিভারি ট্র্যাকিং (Live Order Tracking)
              </h3>
              <p className="text-[11px] text-stone-500">
                Track your parcel live across Steadfast, Pathao & RedX networks.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. BB-892401) or Mobile Number..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#C23330]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-semibold shadow transition-all cursor-pointer flex-shrink-0"
            >
              Track Order
            </button>
          </div>

          {/* Quick Demo Samples */}
          <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-stone-500 pt-1">
            <span className="font-semibold text-stone-600">Sample tracking:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => handleQuickSelect(o)}
                className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono cursor-pointer"
              >
                {o.id} ({o.status})
              </button>
            ))}
          </div>
        </form>

        {/* Result Area */}
        {hasSearched && !searchedOrder && (
          <div className="p-6 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
            <Package className="w-10 h-10 text-stone-400 mx-auto" />
            <h4 className="font-serif text-base font-bold text-stone-800">
              No Order Found
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We could not find an active order matching "<span className="font-mono text-stone-700">{searchInput}</span>". Please check your Order ID or contact our WhatsApp helpline.
            </p>
            <a
              href="https://wa.me/8801818935353"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 mt-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Helpline (01818-935353)</span>
            </a>
          </div>
        )}

        {searchedOrder && (
          <div className="space-y-4">
            {/* Status Summary Banner */}
            <div className="p-4 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl shadow flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                  {searchedOrder.id}
                </span>
                <div className="text-xl font-serif font-bold text-white mt-0.5">
                  {searchedOrder.customerName}
                </div>
                <div className="text-xs text-stone-300 mt-0.5 flex items-center gap-2">
                  <span>Courier: <strong className="text-white">{searchedOrder.courierName}</strong></span>
                  <span>•</span>
                  <span>Consignment: <strong className="font-mono text-[#EADBC8]">{searchedOrder.trackingNumber}</strong></span>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[searchedOrder.status].bg} ${statusColors[searchedOrder.status].text}`}>
                  {searchedOrder.status}
                </span>
                <div className="text-[11px] font-mono text-stone-300 mt-1.5">
                  ৳{searchedOrder.totalAmount.toLocaleString()} ({searchedOrder.paymentStatus})
                </div>
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h4 className="font-serif text-sm font-bold text-stone-900 mb-3">
                Live Tracking Milestones
              </h4>
              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {searchedOrder.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow ${statusColors[item.status]?.dot || 'bg-stone-400'}`} />
                    <div className="text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{item.status}</span>
                        <span className="text-[10px] text-stone-400 font-mono">{item.timestamp}</span>
                      </div>
                      <p className="text-stone-600 text-[11px] mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordered Dresses Preview */}
            <div>
              <h4 className="font-serif text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Order Package ({searchedOrder.items.length} Dress)
              </h4>
              <div className="space-y-2">
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.productName}
                        onError={handleImageError}
                        className="w-10 h-12 object-cover rounded"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-semibold text-stone-900">{item.productName}</div>
                        <div className="text-[11px] text-stone-500">
                          Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-stone-900">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination info */}
            <div className="p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs flex items-center gap-2 text-stone-700">
              <MapPin className="w-4 h-4 text-[#C23330] flex-shrink-0" />
              <div>
                <strong>Delivery To:</strong> {searchedOrder.deliveryAddress} ({searchedOrder.deliveryCity})
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-stone-200">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
