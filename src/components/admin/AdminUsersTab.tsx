import React, { useState } from 'react';
import { UserItem, Order } from '../../types';
import { handleImageError } from '../../utils/imageUtils';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX, 
  X, 
  ShoppingBag, 
  Phone, 
  Mail, 
  MapPin,
  Eye,
  Filter
} from 'lucide-react';

interface AdminUsersTabProps {
  users: UserItem[];
  orders: Order[];
  onAddUser: (user: UserItem) => void;
  onUpdateUser: (user: UserItem) => void;
  onDeleteUser: (userId: string) => void;
}

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({
  users,
  orders,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'Admin' | 'Manager' | 'Customer'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Active' | 'Suspended'>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [viewingUser, setViewingUser] = useState<UserItem | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const initialForm: Omit<UserItem, 'id'> = {
    name: '',
    email: '',
    phone: '',
    role: 'Customer',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    address: '',
    city: 'Dhaka',
    totalOrders: 0,
    totalSpent: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const [formData, setFormData] = useState<Omit<UserItem, 'id'>>(initialForm);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (u: UserItem) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      status: u.status,
      avatar: u.avatar || '',
      address: u.address,
      city: u.city,
      totalOrders: u.totalOrders,
      totalSpent: u.totalSpent,
      createdAt: u.createdAt,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    if (editingUser) {
      onUpdateUser({
        ...formData,
        id: editingUser.id,
      });
    } else {
      onAddUser({
        ...formData,
        id: `usr-${Date.now()}`,
      });
    }

    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleToggleStatus = (u: UserItem) => {
    onUpdateUser({
      ...u,
      status: u.status === 'Active' ? 'Suspended' : 'Active',
    });
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery) ||
      u.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            User Directory & Access Control
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage customer accounts, store managers, and system administrators.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C23330]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#C23330] cursor-pointer"
          >
            <option value="ALL">All Roles ({users.length})</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#C23330] cursor-pointer"
          >
            <option value="ALL">Status: All</option>
            <option value="Active">Active Users</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Showing {filtered.length} of {users.length} accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Contact Details</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders & Spent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((u) => {
                const roleBadge =
                  u.role === 'Admin'
                    ? 'bg-rose-100 text-rose-800'
                    : u.role === 'Manager'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800';

                return (
                  <tr key={u.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={u.name}
                          onError={handleImageError}
                          className="w-9 h-9 rounded-full object-cover border border-stone-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-stone-900">{u.name}</div>
                          <div className="text-[10px] text-stone-400">Joined {u.createdAt}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${roleBadge}`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-stone-700">
                        <Mail className="w-3 h-3 text-stone-400" />
                        <span>{u.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-stone-500 text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{u.phone}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-stone-800 font-medium">{u.city}</div>
                      <div className="text-[10px] text-stone-400 truncate max-w-[150px]" title={u.address}>
                        {u.address || '—'}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-stone-900">
                        ৳{u.totalSpent.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {u.totalOrders} orders placed
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          u.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                        title="Toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        <span>{u.status}</span>
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingUser(u)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                          title="View Profile & Orders"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit User"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingUserId(u.id)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete User"
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {editingUser ? 'Edit User Record' : 'Register New User'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingUser(null);
                }}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sadia Islam"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sadia@gmail.com"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01712-345678"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    System Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Account Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Delivery Address & City
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House, Road, Area..."
                    className="sm:col-span-2 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                  />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Dhaka / Chattogram"
                    className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={formData.avatar || ''}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C23330] hover:bg-[#A92A28] text-white rounded-xl font-semibold shadow cursor-pointer"
                >
                  {editingUser ? 'Save User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details & Order History Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900">User Profile & Activity</h3>
              <button onClick={() => setViewingUser(null)} className="p-1 rounded-full hover:bg-stone-100 cursor-pointer">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
              <img
                src={viewingUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={viewingUser.name}
                onError={handleImageError}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
              />
              <div className="text-xs space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-base font-bold text-stone-900">{viewingUser.name}</h4>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                    {viewingUser.role}
                  </span>
                </div>
                <div className="text-stone-600">{viewingUser.email} • {viewingUser.phone}</div>
                <div className="text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{viewingUser.address}, {viewingUser.city}</span>
                </div>
              </div>
            </div>

            {/* Customer Order History */}
            <div>
              <h5 className="font-serif text-sm font-bold text-stone-900 mb-2">
                Order History with Bithi's Boutique
              </h5>
              {orders.filter(
                (o) =>
                  o.customerPhone === viewingUser.phone ||
                  (o.customerEmail && o.customerEmail.toLowerCase() === viewingUser.email.toLowerCase())
              ).length === 0 ? (
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-center text-xs text-stone-500">
                  No orders placed under this customer record yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {orders
                    .filter(
                      (o) =>
                        o.customerPhone === viewingUser.phone ||
                        (o.customerEmail && o.customerEmail.toLowerCase() === viewingUser.email.toLowerCase())
                    )
                    .map((ord) => (
                      <div key={ord.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-mono font-bold text-stone-900">{ord.id}</div>
                          <div className="text-[11px] text-stone-500">{ord.items.length} item(s) • {ord.courierName}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-stone-900">৳{ord.totalAmount.toLocaleString()}</div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-800">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingUser(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingUserId && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-stone-900">Delete User Account?</h3>
              <p className="text-xs text-stone-500 mt-1">
                Are you sure? Customer order historical logs will be kept for auditing.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingUserId(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteUser(deletingUserId);
                  setDeletingUserId(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow cursor-pointer"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
