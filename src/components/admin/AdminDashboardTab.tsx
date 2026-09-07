import React from 'react';
import { Product, CategoryItem, UserItem, Order, OrderStatus } from '../../types';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  ArrowUpRight,
  Eye,
  Plus
} from 'lucide-react';

interface AdminDashboardTabProps {
  products: Product[];
  categories: CategoryItem[];
  users: UserItem[];
  orders: Order[];
  onNavigateTab: (tab: 'products' | 'categories' | 'users' | 'orders') => void;
  onSelectOrder: (order: Order) => void;
  onOpenCreateProduct: () => void;
  onOpenCreateOrder: () => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  products,
  categories,
  users,
  orders,
  onNavigateTab,
  onSelectOrder,
  onOpenCreateProduct,
  onOpenCreateOrder,
}) => {
  // Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;
  const inTransitCount = orders.filter((o) => o.status === 'Dispatched' || o.status === 'Out for Delivery').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
  const lowStockCount = products.filter((p) => !p.inStock).length;

  const statusColors: Record<OrderStatus, { bg: string; text: string }> = {
    Pending: { bg: 'bg-amber-100', text: 'text-amber-800' },
    Confirmed: { bg: 'bg-blue-100', text: 'text-blue-800' },
    Processing: { bg: 'bg-purple-100', text: 'text-purple-800' },
    Dispatched: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    'Out for Delivery': { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    Delivered: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    Cancelled: { bg: 'bg-rose-100', text: 'text-rose-800' },
  };

  const recentOrders = [...orders].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C23330] text-[11px] font-bold uppercase tracking-wider mb-2">
            Store Performance Hub
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Welcome to Bithi's Boutique Admin
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
            Live overview of sales, luxury catalog inventory, user directory, and end-to-end courier order tracking.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onOpenCreateOrder}
            className="px-4 py-2.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Order</span>
          </button>
          <button
            onClick={onOpenCreateProduct}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer border border-white/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Dress</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
              Total Revenue
            </span>
            <div className="text-2xl font-bold font-mono text-stone-900 mt-1">
              ৳{totalRevenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{orders.length} active transactions</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#C23330] transition-colors"
        >
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
              Orders Tracked
            </span>
            <div className="text-2xl font-bold font-mono text-stone-900 mt-1">
              {orders.length}
            </div>
            <span className="text-[11px] text-blue-600 font-medium flex items-center gap-0.5 mt-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{pendingOrdersCount} pending action</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Catalog Products */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#C23330] transition-colors"
        >
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
              Total Dresses
            </span>
            <div className="text-2xl font-bold font-mono text-stone-900 mt-1">
              {products.length}
            </div>
            <span className="text-[11px] text-stone-500 font-medium flex items-center gap-0.5 mt-1">
              <span>Across {categories.length} categories</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#C23330]/10 text-[#C23330] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Customer Base */}
        <div 
          onClick={() => onNavigateTab('users')}
          className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#C23330] transition-colors"
        >
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
              Registered Users
            </span>
            <div className="text-2xl font-bold font-mono text-stone-900 mt-1">
              {users.length}
            </div>
            <span className="text-[11px] text-purple-600 font-medium flex items-center gap-0.5 mt-1">
              <span>{users.filter(u => u.role === 'Customer').length} verified shoppers</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Order Status Distribution Strip */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
        <h3 className="font-serif text-sm font-bold text-stone-800 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Order Pipeline & Courier Status</span>
          <button 
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-sans text-[#C23330] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {(['Pending', 'Confirmed', 'Processing', 'Dispatched', 'Out for Delivery', 'Delivered', 'Cancelled'] as OrderStatus[]).map((st) => {
            const count = orders.filter((o) => o.status === st).length;
            const style = statusColors[st];
            return (
              <div 
                key={st}
                onClick={() => onNavigateTab('orders')}
                className={`p-3 rounded-lg border border-stone-200 hover:border-stone-400 transition-all cursor-pointer ${style.bg}/30`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase ${style.text}`}>
                    {st}
                  </span>
                  <span className={`w-5 h-5 rounded-full ${style.bg} ${style.text} text-[11px] font-bold font-mono flex items-center justify-center`}>
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2 Columns: Recent Orders & Quick Category Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Recent Orders
                </h3>
                <p className="text-xs text-stone-500">Live order stream and fulfillment tracking</p>
              </div>
              <button
                onClick={() => onNavigateTab('orders')}
                className="text-xs text-[#C23330] hover:underline font-semibold"
              >
                See all ({orders.length})
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Total</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Courier / Tracking</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {recentOrders.map((order) => {
                    const st = statusColors[order.status];
                    return (
                      <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-stone-900">
                          {order.id}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-stone-800">{order.customerName}</div>
                          <div className="text-[11px] text-stone-400">{order.customerPhone}</div>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-stone-900">
                          ৳{order.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${st.bg} ${st.text}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="text-[11px] text-stone-700 font-medium">{order.courierName}</div>
                          <div className="text-[10px] font-mono text-stone-400">{order.trackingNumber}</div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => onSelectOrder(order)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#C23330] hover:text-white text-stone-700 transition-colors cursor-pointer"
                            title="View / Track Order"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Quick Categories & System Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Categories card */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
              <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
                Categories ({categories.length})
              </h3>
              <button
                onClick={() => onNavigateTab('categories')}
                className="text-xs text-[#C23330] hover:underline font-semibold"
              >
                Manage
              </button>
            </div>

            <div className="space-y-2.5">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                return (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 text-xs text-stone-700"
                  >
                    <div className="flex items-center gap-2">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-7 h-7 rounded object-cover"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded bg-stone-200 flex items-center justify-center text-[10px] font-bold">
                          {cat.name.substring(0, 1)}
                        </div>
                      )}
                      <span className="font-medium truncate max-w-[140px]">{cat.name}</span>
                    </div>
                    <span className="font-mono text-stone-400 font-semibold">
                      {count} items
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <AlertCircle className="w-4 h-4" />
              <span>Full CRUD & Local Sync Active</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-700">
              All additions, modifications, and deletions to Products, Categories, Users, and Order Tracking are automatically synced to localStorage and reflected live across the storefront.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
