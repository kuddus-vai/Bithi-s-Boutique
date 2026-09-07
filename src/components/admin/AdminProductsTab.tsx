import React, { useState } from 'react';
import { Product, CategoryItem } from '../../types';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Eye, 
  Filter, 
  Star, 
  Tag, 
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

interface AdminProductsTabProps {
  products: Product[];
  categories: CategoryItem[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

const AVAILABLE_SIZES = ['Unstitched 3-Piece', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const AdminProductsTab: React.FC<AdminProductsTabProps> = ({
  products,
  categories,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  isCreateModalOpen,
  setIsCreateModalOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [stockFilter, setStockFilter] = useState<'ALL' | 'IN_STOCK' | 'OUT_OF_STOCK'>('ALL');

  // Editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form state for Create & Edit
  const initialForm: Omit<Product, 'id'> = {
    name: '',
    category: categories[0]?.name || 'Roheenaz Luxury Edition',
    price: 4950,
    originalPrice: 6500,
    rating: 4.9,
    reviewsCount: 12,
    image: '/assets/Products/Roheenaz/637850564_1526645636128991_2845010814069378436_n.jpg',
    additionalImages: [],
    fabric: 'Pure Luxury Lawn with Resham Needlework',
    description: 'Exclusive Pakistani luxury 3-piece collection ensemble with embroidered details and soft dupatta.',
    sizes: ['Unstitched 3-Piece', 'S', 'M', 'L'],
    colors: ['Classic Gold', 'Emerald'],
    inStock: true,
    isBestseller: false,
    isNew: true,
    sku: `RN-LUX-${Math.floor(10 + Math.random() * 90)}`,
  };

  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialForm);

  const handleOpenCreate = () => {
    setFormData({
      ...initialForm,
      category: categories[0]?.name || 'Roheenaz Luxury Edition',
      sku: `BB-${Math.floor(100 + Math.random() * 900)}`,
    });
    setEditingProduct(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || 0,
      rating: prod.rating,
      reviewsCount: prod.reviewsCount,
      image: prod.image,
      additionalImages: prod.additionalImages || [],
      fabric: prod.fabric,
      description: prod.description,
      sizes: prod.sizes || [],
      colors: prod.colors || [],
      inStock: prod.inStock,
      isBestseller: !!prod.isBestseller,
      isNew: !!prod.isNew,
      sku: prod.sku,
    });
    setIsCreateModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProduct) {
      // Update
      const updated: Product = {
        ...formData,
        id: editingProduct.id,
      };
      onUpdateProduct(updated);
    } else {
      // Create
      const newProduct: Product = {
        ...formData,
        id: `prod-${Date.now()}`,
      };
      onAddProduct(newProduct);
    }
    setIsCreateModalOpen(false);
    setEditingProduct(null);
  };

  const handleToggleStock = (product: Product) => {
    onUpdateProduct({
      ...product,
      inStock: !product.inStock,
    });
  };

  const handleToggleSize = (size: string) => {
    const current = [...formData.sizes];
    if (current.includes(size)) {
      setFormData({ ...formData, sizes: current.filter((s) => s !== size) });
    } else {
      setFormData({ ...formData, sizes: [...current, size] });
    }
  };

  // Filtered products
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategoryFilter === 'ALL' || p.category === selectedCategoryFilter;
    const matchesStock =
      stockFilter === 'ALL' ||
      (stockFilter === 'IN_STOCK' && p.inStock) ||
      (stockFilter === 'OUT_OF_STOCK' && !p.inStock);

    return matchesSearch && matchesCat && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Header with Title & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Product Catalog Management
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Create, update, inspect, and remove designer lawn and bridal outfits.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dress</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by dress title, SKU, fabric..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#C23330]"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#C23330] cursor-pointer"
          >
            <option value="ALL">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock filter */}
        <div>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#C23330] cursor-pointer"
          >
            <option value="ALL">Stock: All</option>
            <option value="IN_STOCK">In Stock Only</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Showing {filtered.length} of {products.length} products</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4">Item & SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (BDT)</th>
                <th className="py-3 px-4">Available Sizes</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                  {/* Item Image + Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getImageUrl(prod.image)}
                        alt={prod.name}
                        onError={handleImageError}
                        className="w-12 h-14 object-cover rounded-lg border border-stone-200 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="max-w-[220px]">
                        <div className="font-semibold text-stone-900 truncate" title={prod.name}>
                          {prod.name}
                        </div>
                        <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                          {prod.sku}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          {prod.isBestseller && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-amber-100 text-amber-800 font-bold rounded">
                              Bestseller
                            </span>
                          )}
                          {prod.isNew && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-[#C23330]/10 text-[#C23330] font-bold rounded">
                              New Drop
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium text-[11px]">
                      {prod.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <div className="font-bold font-mono text-stone-900">
                      ৳{prod.price.toLocaleString()}
                    </div>
                    {prod.originalPrice && (
                      <div className="text-[10px] text-stone-400 line-through">
                        ৳{prod.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </td>

                  {/* Sizes */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {prod.sizes.slice(0, 3).map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 bg-stone-100 rounded text-stone-600">
                          {s}
                        </span>
                      ))}
                      {prod.sizes.length > 3 && (
                        <span className="text-[10px] text-stone-400">+{prod.sizes.length - 3}</span>
                      )}
                    </div>
                  </td>

                  {/* Stock toggle */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleStock(prod)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        prod.inStock
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                      title="Click to toggle stock"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${prod.inStock ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                      <span>{prod.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </button>
                  </td>

                  {/* Rating */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold text-stone-800">{prod.rating}</span>
                      <span className="text-stone-400 text-[10px]">({prod.reviewsCount})</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewingProduct(prod)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Dress"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingProductId(prod.id)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Dress"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {editingProduct ? 'Edit Designer Dress' : 'Add New Designer Dress'}
              </h3>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Dress Name */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Dress Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Roheenaz Luxury Edition - Embroidered Lawn #11"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              {/* Category & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] bg-white cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. RN-LUX-11"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] font-mono"
                  />
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Selling Price (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Original Strike Price (৳ BDT)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.originalPrice || 0}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] font-mono"
                  />
                </div>
              </div>

              {/* Fabric */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Fabric & Work Composition
                </label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  placeholder="e.g. Pure Luxury Lawn with Resham Threadwork & Organza Border"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Primary Image URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/assets/Products/... or https://..."
                    className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                  />
                  {formData.image && (
                    <img
                      src={getImageUrl(formData.image)}
                      alt="Preview"
                      onError={handleImageError}
                      className="w-9 h-9 rounded object-cover border border-stone-200 flex-shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Sizes checklist */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SIZES.map((sz) => {
                    const isSelected = formData.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleToggleSize(sz)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flags: InStock, Bestseller, New */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-[#C23330] rounded focus:ring-0"
                  />
                  <span className="font-semibold text-stone-800">In Stock</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded focus:ring-0"
                  />
                  <span className="font-semibold text-stone-800">Bestseller Badge</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="w-4 h-4 text-[#C23330] rounded focus:ring-0"
                  />
                  <span className="font-semibold text-stone-800">New Drop Badge</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white font-semibold shadow cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Dress'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-stone-900">Delete Dress?</h3>
              <p className="text-xs text-stone-500 mt-1">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteProduct(deletingProductId);
                  setDeletingProductId(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="font-mono text-xs font-bold text-[#C23330]">{viewingProduct.sku}</span>
              <button onClick={() => setViewingProduct(null)} className="p-1 rounded hover:bg-stone-100 cursor-pointer">
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            <div className="flex gap-4">
              <img
                src={getImageUrl(viewingProduct.image)}
                alt={viewingProduct.name}
                onError={handleImageError}
                className="w-28 h-36 object-cover rounded-xl border border-stone-200 flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 text-xs">
                <h4 className="font-serif text-base font-bold text-stone-900">{viewingProduct.name}</h4>
                <div className="text-xs text-stone-500 font-medium">{viewingProduct.category}</div>
                <div className="text-lg font-bold font-mono text-[#C23330]">
                  ৳{viewingProduct.price.toLocaleString()} BDT
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-3">{viewingProduct.fabric}</p>
                <div className="flex gap-1 pt-1">
                  {viewingProduct.sizes.map((s) => (
                    <span key={s} className="px-1.5 py-0.5 bg-stone-100 text-[10px] rounded text-stone-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingProduct(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
