'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface RecommendedProductsProps {
  products: Product[];
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const handleAddToWishlist = (productId: string) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">No recommended products available at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="card group relative animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={product.imageUrl || `https://picsum.photos/400/300?random=${product.id}`}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-primary-700 bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 px-2 py-1 rounded border border-primary-200">
                  {product.category}
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  ⭐ Recommended
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToWishlist(product.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                    wishlist.has(product.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  }`}
                >
                  {wishlist.has(product.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {wishlist.size > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 border border-primary-200 rounded-lg text-center">
          <p className="text-primary-800 font-semibold">
            ❤️ {wishlist.size} product{wishlist.size > 1 ? 's' : ''} in your wishlist!
          </p>
        </div>
      )}
    </div>
  );
}

