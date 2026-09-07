import React, { useState } from 'react';
import { Order, OrderStatus, Product, OrderTimelineEvent } from '../../types';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Truck, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Copy, 
  MessageCircle, 
  X, 
  Filter, 
  MapPin, 
  Phone, 
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface AdminOrdersTabProps {
  orders: Order[];
  products: Product[];
  onAddOrder: (order: Order) => void;
  onUpdateOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
  selectedOrderForModal: Order | null;
  setSelectedOrderForModal: (order: Order | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

const ORDER_STATUSES: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Dispatched',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

const COURIERS: Array<'Steadfast Courier' | 'Pathao Courier' | 'RedX' | 'Sundarban' | 'In-House'> = [
  'Steadfast Courier',
  'Pathao Courier',
  'RedX',
  'Sundarban',
  'In-House',
];

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({
  orders,
  products,
  onAddOrder,
  onUpdateOrder,
  onDeleteOrder,
  selectedOrderForModal,
  setSelectedOrderForModal,
  isCreateModalOpen,
  setIsCreateModalOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [courierFilter, setCourierFilter] = useState<string>('ALL');

  // Modals state
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Timeline Note for edit
  const [newTimelineNote, setNewTimelineNote] = useState('');

  // Create order form state
  const [newOrderCustomerName, setNewOrderCustomerName] = useState('');
  const [newOrderCustomerPhone, setNewOrderCustomerPhone] = useState('');
  const [newOrderCustomerEmail, setNewOrderCustomerEmail] = useState('');
  const [newOrderAddress, setNewOrderAddress] = useState('');
  const [newOrderCity, setNewOrderCity] = useState<'Inside Dhaka' | 'Outside Dhaka'>('Inside Dhaka');
  const [newOrderPaymentMethod, setNewOrderPaymentMethod] = useState<'Cash on Delivery' | 'bKash' | 'Nagad'>('Cash on Delivery');
  const [newOrderCourier, setNewOrderCourier] = useState<'Steadfast Courier' | 'Pathao Courier' | 'RedX' | 'Sundarban' | 'In-House'>('Steadfast Courier');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('As Shown');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [newOrderNotes, setNewOrderNotes] = useState('');

  const statusColors: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
    Pending: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
    Confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
    Processing: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
    Dispatched: { bg: 'bg-indigo-100', text: 'text-indigo-800', dot: 'bg-indigo-500' },
    'Out for Delivery': { bg: 'bg-cyan-100', text: 'text-cyan-800', dot: 'bg-cyan-500' },
    Delivered: { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
    Cancelled: { bg: 'bg-rose-100', text: 'text-rose-800', dot: 'bg-rose-500' },
  };

  const handleCopyTracking = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenEdit = (order: Order) => {
    setEditingOrder({ ...order });
    setNewTimelineNote('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    let updatedTimeline = [...editingOrder.timeline];

    // If status changed or note was added, record in timeline
    if (newTimelineNote.trim()) {
      const newEvent: OrderTimelineEvent = {
        status: editingOrder.status,
        timestamp: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        description: newTimelineNote.trim(),
      };
      updatedTimeline.push(newEvent);
    }

    const savedOrder: Order = {
      ...editingOrder,
      timeline: updatedTimeline,
    };

    onUpdateOrder(savedOrder);
    setEditingOrder(null);
    if (selectedOrderForModal && selectedOrderForModal.id === savedOrder.id) {
      setSelectedOrderForModal(savedOrder);
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderCustomerName || !newOrderCustomerPhone) return;

    const prod = products.find((p) => p.id === selectedProductId) || products[0];
    const subtotal = (prod?.price || 5000) * orderQuantity;
    const shippingFee = newOrderCity === 'Inside Dhaka' ? (subtotal > 5000 ? 0 : 80) : 150;
    const total = subtotal + shippingFee;

    const newId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowString = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: newId,
      customerName: newOrderCustomerName,
      customerPhone: newOrderCustomerPhone,
      customerEmail: newOrderCustomerEmail || undefined,
      deliveryAddress: newOrderAddress || 'Gulshan, Dhaka',
      deliveryCity: newOrderCity,
      paymentMethod: newOrderPaymentMethod,
      paymentStatus: newOrderPaymentMethod === 'Cash on Delivery' ? 'Pending COD' : 'Paid',
      items: [
        {
          productId: prod.id,
          productName: prod.name,
          image: prod.image,
          size: selectedSize,
          color: selectedColor,
          price: prod.price,
          quantity: orderQuantity,
        },
      ],
      subtotal,
      discount: 0,
      shippingFee,
      totalAmount: total,
      status: 'Confirmed',
      courierName: newOrderCourier,
      trackingNumber: `${newOrderCourier.substring(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      notes: newOrderNotes,
      createdAt: new Date().toISOString(),
      timeline: [
        { status: 'Pending', timestamp: nowString, description: 'Order recorded manually by admin desk' },
        { status: 'Confirmed', timestamp: nowString, description: 'Confirmed & assigned for inventory packing' },
      ],
    };

    onAddOrder(newOrder);
    setIsCreateModalOpen(false);

    // Reset form
    setNewOrderCustomerName('');
    setNewOrderCustomerPhone('');
    setNewOrderCustomerEmail('');
    setNewOrderAddress('');
    setNewOrderNotes('');
  };

  const handleSendWhatsAppNotification = (order: Order) => {
    const text = `Hello ${order.customerName}! 🌸\nYour order *${order.id}* at Bithi's Boutique is currently: *${order.status.toUpperCase()}*.\n\nCourier: ${order.courierName}\nConsignment/Tracking No: *${order.trackingNumber}*\nTotal Amount: ৳${order.totalAmount.toLocaleString()} (${order.paymentStatus})\n\nThank you for choosing Bithi's Boutique luxury ethnic wear!`;
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const finalPhone = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone}`;
    window.open(`https://wa.me/${finalPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const matchesCourier = courierFilter === 'ALL' || o.courierName === courierFilter;

    return matchesSearch && matchesStatus && matchesCourier;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Order Fulfillment & Courier Tracking
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time live consignment tracking, courier handoff, and order lifecycle management.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Manual Order</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Order ID (e.g. BB-892401), Phone, Customer, Consignment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C23330]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#C23330] cursor-pointer"
          >
            <option value="ALL">Status: All ({orders.length})</option>
            {ORDER_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={courierFilter}
            onChange={(e) => setCourierFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#C23330] cursor-pointer"
          >
            <option value="ALL">Courier: All</option>
            {COURIERS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Showing {filtered.length} of {orders.length} orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer & Address</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total & Payment</th>
                <th className="py-3 px-4">Tracking & Courier</th>
                <th className="py-3 px-4">Live Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((order) => {
                const st = statusColors[order.status];
                return (
                  <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Order ID & Created */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-stone-900 text-sm">
                        {order.id}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900">{order.customerName}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{order.customerPhone}</div>
                      <div className="text-[10px] text-stone-400 truncate max-w-[170px]" title={order.deliveryAddress}>
                        {order.deliveryAddress} ({order.deliveryCity})
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <img
                            key={idx}
                            src={getImageUrl(item.image)}
                            alt={item.productName}
                            onError={handleImageError}
                            className="w-8 h-10 object-cover rounded border border-stone-200"
                            title={`${item.productName} (${item.size})`}
                          />
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-[10px] text-stone-400 font-semibold">
                            +{order.items.length - 2}
                          </span>
                        )}
                        <span className="text-[11px] text-stone-700 font-medium ml-1">
                          {order.items.reduce((acc, i) => acc + i.quantity, 0)} dress(es)
                        </span>
                      </div>
                    </td>

                    {/* Total & Payment */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-stone-900 text-sm">
                        ৳{order.totalAmount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] mt-0.5">
                        <span className="text-stone-600 font-medium">{order.paymentMethod}</span>
                        <span className={`px-1 rounded font-bold ${order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Courier & Tracking */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-stone-800 font-semibold text-[11px]">
                        <Truck className="w-3.5 h-3.5 text-[#C23330]" />
                        <span>{order.courierName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono text-[11px] text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                          {order.trackingNumber}
                        </span>
                        <button
                          onClick={() => handleCopyTracking(order.trackingNumber)}
                          className="text-stone-400 hover:text-stone-800 cursor-pointer"
                          title="Copy tracking number"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Live Status Badge */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${st.bg} ${st.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        <span>{order.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedOrderForModal(order)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Track & Inspect Order"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSendWhatsAppNotification(order)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="Send WhatsApp Status Alert"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(order)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit Status / Tracking"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingOrderId(order.id)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete / Cancel Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View & Track Details Modal */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                  Consignment Tracking Details
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                  <span>Order {selectedOrderForModal.id}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${statusColors[selectedOrderForModal.status].bg} ${statusColors[selectedOrderForModal.status].text}`}>
                    {selectedOrderForModal.status}
                  </span>
                </h3>
              </div>

              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Courier & Tracking summary pill */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="text-[11px] text-stone-500">Shipping Partner</div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5 mt-0.5">
                  <Truck className="w-4 h-4 text-[#C23330]" />
                  <span>{selectedOrderForModal.courierName}</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-stone-500">Consignment Number</div>
                <div className="font-mono font-bold text-stone-900 text-sm flex items-center gap-2 mt-0.5">
                  <span>{selectedOrderForModal.trackingNumber}</span>
                  <button
                    onClick={() => handleCopyTracking(selectedOrderForModal.trackingNumber)}
                    className="text-stone-400 hover:text-stone-800"
                    title="Copy"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copiedId && <span className="text-[10px] text-emerald-600 font-semibold">Copied!</span>}
                </div>
              </div>

              <button
                onClick={() => handleSendWhatsAppNotification(selectedOrderForModal)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Customer</span>
              </button>
            </div>

            {/* Visual Tracking Progress Bar */}
            <div>
              <h4 className="font-serif text-sm font-bold text-stone-900 mb-3">
                Tracking Milestone Progression
              </h4>
              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {selectedOrderForModal.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow ${statusColors[event.status]?.dot || 'bg-stone-500'}`} />
                    <div className="text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{event.status}</span>
                        <span className="text-[11px] text-stone-400 font-mono">{event.timestamp}</span>
                      </div>
                      <p className="text-stone-600 text-[11px] mt-0.5 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Ordered */}
            <div>
              <h4 className="font-serif text-sm font-bold text-stone-900 mb-2">
                Ordered Outfits
              </h4>
              <div className="space-y-2">
                {selectedOrderForModal.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
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
                    <div className="font-mono font-bold text-stone-900 text-sm">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-stone-400 text-[11px]">Customer Contact</div>
                <div className="font-bold text-stone-900 mt-0.5">{selectedOrderForModal.customerName}</div>
                <div className="text-stone-600 font-mono">{selectedOrderForModal.customerPhone}</div>
                {selectedOrderForModal.customerEmail && (
                  <div className="text-stone-500 text-[11px]">{selectedOrderForModal.customerEmail}</div>
                )}
              </div>

              <div>
                <div className="text-stone-400 text-[11px]">Delivery Destination</div>
                <div className="text-stone-800 mt-0.5">{selectedOrderForModal.deliveryAddress}</div>
                <div className="font-semibold text-[#C23330] mt-0.5">{selectedOrderForModal.deliveryCity}</div>
                {selectedOrderForModal.notes && (
                  <div className="text-[10px] text-stone-500 italic mt-1">
                    Note: "{selectedOrderForModal.notes}"
                  </div>
                )}
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs">
              <button
                onClick={() => {
                  handleOpenEdit(selectedOrderForModal);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
              >
                Update Status / Tracking
              </button>

              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white font-semibold cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Update Order & Tracking ({editingOrder.id})
              </h3>
              <button onClick={() => setEditingOrder(null)} className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* Order Status */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Order Status *
                </label>
                <select
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as OrderStatus })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer font-semibold"
                >
                  {ORDER_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Courier & Tracking Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Courier Partner *
                  </label>
                  <select
                    value={editingOrder.courierName}
                    onChange={(e) => setEditingOrder({ ...editingOrder, courierName: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                  >
                    {COURIERS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Tracking / Consignment # *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingOrder.trackingNumber}
                    onChange={(e) => setEditingOrder({ ...editingOrder, trackingNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] font-mono"
                  />
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Payment Status
                </label>
                <select
                  value={editingOrder.paymentStatus}
                  onChange={(e) => setEditingOrder({ ...editingOrder, paymentStatus: e.target.value as any })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending COD">Pending COD</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              {/* Add Milestone Event Note */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Add Tracking Update Note (Appends to Timeline)
                </label>
                <input
                  type="text"
                  value={newTimelineNote}
                  onChange={(e) => setNewTimelineNote(e.target.value)}
                  placeholder="e.g. Parcel handed to Steadfast Gulshan Hub rider"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={editingOrder.deliveryAddress}
                  onChange={(e) => setEditingOrder({ ...editingOrder, deliveryAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C23330] hover:bg-[#A92A28] text-white rounded-xl font-semibold shadow cursor-pointer"
                >
                  Save Tracking Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Order Creation Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Create Manual Order (Phone / Walk-In)
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newOrderCustomerName}
                    onChange={(e) => setNewOrderCustomerName(e.target.value)}
                    placeholder="e.g. Tanzila Karim"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    value={newOrderCustomerPhone}
                    onChange={(e) => setNewOrderCustomerPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={newOrderCustomerEmail}
                  onChange={(e) => setNewOrderCustomerEmail(e.target.value)}
                  placeholder="customer@gmail.com"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Delivery Address *</label>
                <input
                  type="text"
                  required
                  value={newOrderAddress}
                  onChange={(e) => setNewOrderAddress(e.target.value)}
                  placeholder="Apartment, House, Road, Area..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">City Region</label>
                  <select
                    value={newOrderCity}
                    onChange={(e) => setNewOrderCity(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                  >
                    <option value="Inside Dhaka">Inside Dhaka</option>
                    <option value="Outside Dhaka">Outside Dhaka</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Payment Method</label>
                  <select
                    value={newOrderPaymentMethod}
                    onChange={(e) => setNewOrderPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Courier Partner</label>
                  <select
                    value={newOrderCourier}
                    onChange={(e) => setNewOrderCourier(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                  >
                    {COURIERS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product selection */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div className="font-semibold text-stone-800">Select Outfit Item</div>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ৳{p.price.toLocaleString()} ({p.sku})
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-stone-500 font-semibold mb-1">Size</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs bg-white cursor-pointer"
                    >
                      <option value="Unstitched 3-Piece">Unstitched 3-Piece</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 font-semibold mb-1">Color</label>
                    <input
                      type="text"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 font-semibold mb-1">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(Number(e.target.value))}
                      className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Staff Notes</label>
                <input
                  type="text"
                  value={newOrderNotes}
                  onChange={(e) => setNewOrderNotes(e.target.value)}
                  placeholder="Special instructions for packing or courier"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C23330] hover:bg-[#A92A28] text-white rounded-xl font-semibold shadow cursor-pointer"
                >
                  Place Order & Assign Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete / Cancel Confirmation */}
      {deletingOrderId && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-stone-900">Delete Order?</h3>
              <p className="text-xs text-stone-500 mt-1">
                Are you sure you want to delete order {deletingOrderId}? This removes tracking history from database.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingOrderId(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Keep Order
              </button>
              <button
                onClick={() => {
                  onDeleteOrder(deletingOrderId);
                  setDeletingOrderId(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
