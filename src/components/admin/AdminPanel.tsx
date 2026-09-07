import React, { useState } from 'react';
import { Product, CategoryItem, UserItem, Order } from '../../types';
import { AdminDashboardTab } from './AdminDashboardTab';
import { AdminProductsTab } from './AdminProductsTab';
import { AdminCategoriesTab } from './AdminCategoriesTab';
import { AdminUsersTab } from './AdminUsersTab';
import { AdminOrdersTab } from './AdminOrdersTab';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Users, 
  Truck, 
  Store, 
  RotateCcw, 
  Bell, 
  Search, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  categories: CategoryItem[];
  users: UserItem[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAddCategory: (category: CategoryItem) => void;
  onUpdateCategory: (category: CategoryItem) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddUser: (user: UserItem) => void;
  onUpdateUser: (user: UserItem) => void;
  onDeleteUser: (userId: string) => void;
  onAddOrder: (order: Order) => void;
  onUpdateOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
  onResetToDemoData: () => void;
}

export type AdminTabType = 'dashboard' | 'products' | 'categories' | 'users' | 'orders';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  categories,
  users,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onAddOrder,
  onUpdateOrder,
  onDeleteOrder,
  onResetToDemoData,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTabType>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Quick modals triggers from dashboard
  const [isProductCreateOpen, setIsProductCreateOpen] = useState(false);
  const [isOrderCreateOpen, setIsOrderCreateOpen] = useState(false);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);

  if (!isOpen) return null;

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;

  const navItems = [
    {
      id: 'dashboard' as AdminTabType,
      label: 'Overview & Stats',
      icon: LayoutDashboard,
    },
    {
      id: 'products' as AdminTabType,
      label: 'Products Catalog',
      icon: Package,
      badge: products.length,
    },
    {
      id: 'categories' as AdminTabType,
      label: 'Collections & Cats',
      icon: FolderTree,
      badge: categories.length,
    },
    {
      id: 'orders' as AdminTabType,
      label: 'Order Tracking',
      icon: Truck,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : undefined,
      badgeColor: 'bg-[#C23330] text-white',
    },
    {
      id: 'users' as AdminTabType,
      label: 'User Directory',
      icon: Users,
      badge: users.length,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 lg:hidden cursor-pointer"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#C23330] text-white flex items-center justify-center font-serif font-black text-base shadow">
              B
            </span>
            <div>
              <div className="font-serif font-bold text-stone-900 leading-none text-base sm:text-lg">
                BRITHI'S BOUTIQUE
              </div>
              <div className="text-[10px] tracking-widest text-[#C23330] font-semibold uppercase mt-0.5">
                Executive Admin Console
              </div>
            </div>
          </div>
        </div>

        {/* Right Header actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => {
              if (window.confirm('Reset all demo catalog, orders, and user data to default state?')) {
                onResetToDemoData();
              }
            }}
            className="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium hidden sm:flex items-center gap-1.5 cursor-pointer"
            title="Reset to initial seed data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reset Demo</span>
          </button>

          {/* Admin User Info */}
          <div className="hidden md:flex items-center gap-2.5 pl-3 border-l border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Bithi"
              className="w-8 h-8 rounded-full object-cover border border-stone-200"
            />
            <div className="text-left text-xs">
              <div className="font-bold text-stone-900 leading-tight">Bithi Ahmed</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Super Admin</span>
              </div>
            </div>
          </div>

          {/* Return to Storefront */}
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-[#C23330] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Storefront</span>
            <span className="sm:hidden">Store</span>
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Tab Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 z-20 w-64 bg-white border-r border-stone-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-1">
            <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider px-3 mb-2">
              Navigation Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C23330] text-white shadow-sm'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Helper Card */}
          <div className="p-4 border-t border-stone-100">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <div className="font-bold text-stone-900">Courier Integrations</div>
              <div className="text-[11px] text-stone-500">
                Steadfast • Pathao • RedX • Sundarban
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <AdminDashboardTab
                products={products}
                categories={categories}
                users={users}
                orders={orders}
                onNavigateTab={(t) => setActiveTab(t)}
                onSelectOrder={(ord) => {
                  setSelectedOrderForModal(ord);
                  setActiveTab('orders');
                }}
                onOpenCreateProduct={() => {
                  setActiveTab('products');
                  setIsProductCreateOpen(true);
                }}
                onOpenCreateOrder={() => {
                  setActiveTab('orders');
                  setIsOrderCreateOpen(true);
                }}
              />
            )}

            {activeTab === 'products' && (
              <AdminProductsTab
                products={products}
                categories={categories}
                onAddProduct={onAddProduct}
                onUpdateProduct={onUpdateProduct}
                onDeleteProduct={onDeleteProduct}
                isCreateModalOpen={isProductCreateOpen}
                setIsCreateModalOpen={setIsProductCreateOpen}
              />
            )}

            {activeTab === 'categories' && (
              <AdminCategoriesTab
                categories={categories}
                products={products}
                onAddCategory={onAddCategory}
                onUpdateCategory={onUpdateCategory}
                onDeleteCategory={onDeleteCategory}
              />
            )}

            {activeTab === 'users' && (
              <AdminUsersTab
                users={users}
                orders={orders}
                onAddUser={onAddUser}
                onUpdateUser={onUpdateUser}
                onDeleteUser={onDeleteUser}
              />
            )}

            {activeTab === 'orders' && (
              <AdminOrdersTab
                orders={orders}
                products={products}
                onAddOrder={onAddOrder}
                onUpdateOrder={onUpdateOrder}
                onDeleteOrder={onDeleteOrder}
                selectedOrderForModal={selectedOrderForModal}
                setSelectedOrderForModal={setSelectedOrderForModal}
                isCreateModalOpen={isOrderCreateOpen}
                setIsCreateModalOpen={setIsOrderCreateOpen}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
