import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.imageUrl || `https://picsum.photos/400/300?random=${product.id}`;
  
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-primary-400/50 hover:-translate-y-3 cursor-pointer backdrop-blur-sm">
        {/* Glow Effect on Hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
        
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
          {/* Shine Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20"></div>
          
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated Border */}
          <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary-400/30 rounded-3xl transition-all duration-500"></div>
          
          {/* Price Badge */}
          <div className="absolute top-5 right-5 bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600 text-white px-5 py-2.5 rounded-full text-base font-bold shadow-2xl backdrop-blur-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 z-10">
            <span className="flex items-center gap-1.5">
              <span className="text-sm">$</span>
              {product.price.toFixed(2)}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-white/30 shadow-lg transform group-hover:scale-105 transition-transform duration-300 z-10">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{product.category}</span>
          </div>

          {/* Quick View Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <div className="bg-white/95 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-2xl transform translate-y-8 scale-95 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500 border border-white/50">
              <span className="text-primary-700 font-bold text-base flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Quick View
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 bg-gradient-to-b from-white to-slate-50/50 relative">
          {/* Stock Badge */}
          <div className="absolute top-0 right-7 transform -translate-y-1/2 z-20">
            <span className={`text-xs font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm border-2 ${
              product.inventory > 10 
                ? 'text-green-700 bg-green-100/90 border-green-300' 
                : product.inventory > 0 
                ? 'text-amber-700 bg-amber-100/90 border-amber-300' 
                : 'text-red-700 bg-red-100/90 border-red-300'
            }`}>
              {product.inventory > 0 ? `✓ ${product.inventory} in stock` : '✕ Out of stock'}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:via-primary-600 group-hover:to-primary-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight pt-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-sm line-clamp-2 mb-6 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
            {product.description}
          </p>

          {/* Footer */}
          <div className="flex items-end justify-between pt-6 border-t-2 border-slate-200/50 group-hover:border-primary-200 transition-colors duration-300">
            <div className="flex-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
            <button className="btn-primary text-sm px-8 py-3 relative overflow-hidden group/btn rounded-xl font-bold">
              <span className="relative z-10 flex items-center gap-2">
                View Details
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-700 to-primary-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

