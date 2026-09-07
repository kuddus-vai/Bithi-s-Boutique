import React, { useState } from 'react';
import { CategoryItem, Product } from '../../types';
import { Plus, Edit3, Trash2, X, Folder, Eye, Check, AlertCircle } from 'lucide-react';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';

interface AdminCategoriesTabProps {
  categories: CategoryItem[];
  products: Product[];
  onAddCategory: (category: CategoryItem) => void;
  onUpdateCategory: (category: CategoryItem) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export const AdminCategoriesTab: React.FC<AdminCategoriesTabProps> = ({
  categories,
  products,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);

  const initialForm: Omit<CategoryItem, 'id'> = {
    name: '',
    slug: '',
    description: '',
    image: '/assets/Products/Roheenaz/637850564_1526645636128991_2845010814069378436_n.jpg',
    featured: false,
  };

  const [formData, setFormData] = useState<Omit<CategoryItem, 'id'>>(initialForm);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image || '',
      featured: !!cat.featured,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const slug = formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-');

    if (editingCategory) {
      onUpdateCategory({
        ...formData,
        slug,
        id: editingCategory.id,
      });
    } else {
      onAddCategory({
        ...formData,
        slug,
        id: `cat-${Date.now()}`,
      });
    }

    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Category Architecture
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Organize designer collections, bridal tiers, and seasonal lawn edits.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-[#C23330] hover:bg-[#A92A28] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection Category</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.name).length;
          return (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#C23330]/50 transition-all"
            >
              <div>
                <div className="relative h-36 bg-stone-100 overflow-hidden">
                  {cat.image ? (
                    <img
                      src={getImageUrl(cat.image)}
                      alt={cat.name}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                      <Folder className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-black/40 rounded backdrop-blur-sm">
                      {count} items in catalog
                    </span>
                    <h3 className="font-serif text-base font-bold text-white mt-1">
                      {cat.name}
                    </h3>
                  </div>

                  {cat.featured && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#C23330] text-white text-[9px] font-bold uppercase rounded tracking-wider shadow">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {cat.description || 'No description provided.'}
                  </p>
                  <div className="text-[10px] font-mono text-stone-400">
                    Slug: /{cat.slug}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-stone-500">
                  {count} Dresses linked
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg text-stone-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingCatId(cat.id)}
                    className="p-1.5 rounded-lg text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {editingCategory ? 'Edit Category' : 'Create New Collection Category'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
                }}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: formData.slug || name.toLowerCase().replace(/\s+/g, '-'),
                    });
                  }}
                  placeholder="e.g. Roheenaz Luxury Edition"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Slug / URL Identifier
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="roheenaz-luxury-edition"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330] font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description for category banner and SEO..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#C23330]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image || ''}
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

              <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#C23330] rounded focus:ring-0"
                />
                <span className="font-semibold text-stone-800">Feature on Navigation Bar</span>
              </label>

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
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingCatId && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-stone-900">Delete Category?</h3>
              <p className="text-xs text-stone-500 mt-1">
                Products in this category will remain in the catalog under an unassigned collection.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingCatId(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteCategory(deletingCatId);
                  setDeletingCatId(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow cursor-pointer"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
