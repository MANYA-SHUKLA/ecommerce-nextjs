import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import SearchAndFilter from '@/components/SearchAndFilter';

// This page uses Static Site Generation (SSG)
// Data is fetched at build time for optimal performance
export const dynamic = 'force-static';

export default async function HomePage() {
  // Fetch products at build time
  const products = await getAllProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white via-primary-50/30 to-primary-50 pb-4 pt-16 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-400/30 to-primary-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/30 to-primary-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-primary-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s', transform: 'translate(-50%, -50%)' }}></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-block mb-8 animate-fade-in">
              <span className="px-10 py-5 bg-white text-slate-900 text-lg font-black rounded-full shadow-2xl relative overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300 inline-flex items-center gap-3 border-4 border-slate-300" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 10px 20px -5px rgba(0, 0, 0, 0.2)' }}>
                <span className="relative z-10 flex items-center gap-3 text-slate-900">
                  <span className="text-2xl animate-pulse">✨</span>
                  <span className="text-slate-900 font-black text-lg sm:text-xl">Premium E-Commerce Platform</span>
                  <span className="text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>🎉</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-[1.1] animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="block mb-2 text-slate-900" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Welcome to</span>
              <span className="relative inline-block">
                <span className="text-slate-900 relative z-10" style={{ textShadow: '0 3px 6px rgba(0,0,0,0.15)' }}>ShopHub</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 bg-clip-text text-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ backgroundSize: '200% 200%', textShadow: '0 3px 6px rgba(0,0,0,0.15)' }}>
                  ShopHub
                </span>
                <span className="absolute -bottom-3 left-0 right-0 h-4 bg-gradient-to-r from-blue-400/50 via-blue-400/50 to-blue-400/50 blur-2xl -z-10"></span>
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-slate-900 max-w-4xl mx-auto leading-relaxed mb-12 font-semibold animate-fade-in" style={{ animationDelay: '0.2s', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              Discover our amazing collection of 
              <span className="text-blue-800 font-bold"> premium products</span>
              <span className="block mt-3 text-xl md:text-2xl text-slate-800 font-semibold">
                Fast, secure, and beautifully designed ✨
              </span>
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-5 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="group flex items-center gap-3 px-6 py-3.5 bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-blue-200/50 hover:border-blue-400/50 hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse absolute"></span>
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-75 animate-ping absolute"></span>
                </div>
                <span className="text-sm font-semibold text-slate-700">⚡ Lightning Fast</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3.5 bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-blue-200/50 hover:border-blue-400/50 hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse absolute"></span>
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-75 animate-ping absolute"></span>
                </div>
                <span className="text-sm font-semibold text-slate-700">🔒 Secure Shopping</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3.5 bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-blue-200/50 hover:border-blue-400/50 hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse absolute"></span>
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-75 animate-ping absolute"></span>
                </div>
                <span className="text-sm font-semibold text-slate-700">⭐ Premium Quality</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="animate-fade-in mb-0" style={{ animationDelay: '0.4s' }}>
              <a href="#products" className="inline-block group">
                <button className="px-12 py-6 bg-white text-slate-900 text-xl font-black rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden border-4 border-slate-300" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 10px 20px -5px rgba(0, 0, 0, 0.2)' }}>
                  <span className="relative z-10 flex items-center gap-3 text-slate-900">
                    Explore Products
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="pt-4 pb-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Section Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              <span className="text-slate-900">
                Our Products
              </span>
            </h2>
            <p className="text-xl text-slate-900 max-w-2xl mx-auto mb-6 font-semibold">
              Handpicked collection of premium items just for you
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <SearchAndFilter initialProducts={products} />

          {products.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
                <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-slate-500 text-lg font-medium">No products found. Add some products in the admin panel!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

