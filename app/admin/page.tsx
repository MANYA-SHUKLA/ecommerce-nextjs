'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '@/lib/types';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    category: '',
    inventory: 0,
  });
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch products on component mount (client-side)
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ type: 'error', text: 'Failed to fetch products' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey) {
      setMessage({ type: 'error', text: 'Please enter your API key' });
      return;
    }

    try {
      const url = editingProduct 
        ? `/api/products/update/${editingProduct.id}`
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: editingProduct ? 'Product updated successfully!' : 'Product created successfully!' 
        });
        setFormData({
          name: '',
          slug: '',
          description: '',
          price: 0,
          category: '',
          inventory: 0,
        });
        setEditingProduct(null);
        fetchProducts();
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Operation failed' });
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage({ type: 'error', text: 'Failed to save product' });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category,
      inventory: product.inventory,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: 0,
      category: '',
      inventory: 0,
    });
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600 bg-clip-text text-transparent mb-2">Admin Panel</h1>
          <p className="text-slate-600">
            Manage your product inventory. This page uses client-side rendering with API calls 
            for interactive product management.
          </p>
        </div>

        {/* API Key Input */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <label className="block text-sm font-semibold text-yellow-800 mb-2">
            Admin API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your admin API key"
            className="input-field w-full md:w-96"
          />
          <p className="text-xs text-yellow-700 mt-2">
            Set this in your .env.local file as ADMIN_API_KEY
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Product Form */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-700 bg-clip-text text-transparent mb-6">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (!editingProduct) {
                      setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                    }
                  }}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field min-h-[100px]"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Inventory *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.inventory}
                  onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) || 0 })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
              {editingProduct && (
                <button type="button" onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-primary-50/30 via-primary-50/30 to-primary-50/30">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-700 bg-clip-text text-transparent">All Products</h2>
          </div>
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading products...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Inventory</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold">{product.name}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">{product.inventory}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-primary-600 hover:text-primary-600 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  No products found. Create your first product above!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Client-Side Info Box */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-800">
            <strong>Rendering Strategy:</strong> This page uses client-side rendering. 
            All data fetching and form submissions happen in the browser using JavaScript, 
            making it highly interactive and responsive.
          </p>
        </div>
      </div>
    </div>
  );
}

