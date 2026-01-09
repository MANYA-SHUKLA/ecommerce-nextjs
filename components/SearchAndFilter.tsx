'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface SearchAndFilterProps {
  initialProducts: Product[];
}

export default function SearchAndFilter({ initialProducts }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map(p => p.category));
    return Array.from(cats);
  }, [initialProducts]);

  useEffect(() => {
    const filtered = initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [initialProducts, searchQuery, selectedCategory]);

  return (
    <>
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-10 mb-12 animate-scale-in relative overflow-hidden group">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Search Input */}
            <div className="flex-1 relative group/search">
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary-400 group-hover/search:text-primary-600 transition-colors duration-300 z-20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 border-2 border-slate-300/50 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 text-slate-800 placeholder-slate-400 bg-white/90 backdrop-blur-sm hover:border-primary-400 hover:bg-white font-medium text-base shadow-inner"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-72 relative group/filter">
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary-400 group-hover/filter:text-primary-600 transition-colors duration-300 pointer-events-none z-20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-14 pr-6 py-5 border-2 border-slate-300/50 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 text-slate-800 bg-white/90 backdrop-blur-sm hover:border-primary-400 hover:bg-white appearance-none cursor-pointer font-medium text-base shadow-inner"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-primary-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-primary-500 to-primary-500 rounded-full opacity-75 animate-ping"></div>
              </div>
              <span className="text-base font-semibold text-slate-700">
                Showing <span className="text-2xl font-black bg-gradient-to-r from-primary-600 to-primary-600 bg-clip-text text-transparent">{filteredProducts.length}</span> of <span className="font-bold text-slate-900">{initialProducts.length}</span> products
              </span>
            </div>
            {filteredProducts.length !== initialProducts.length && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-primary-100 hover:to-primary-100 text-slate-700 hover:text-primary-700 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filtered Products Grid */}
      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No products match your search criteria.</p>
        </div>
      )}
    </>
  );
}

