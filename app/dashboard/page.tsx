import { getInventoryStats } from '@/lib/products';
import Link from 'next/link';

// This page uses Server-Side Rendering (SSR)
// Data is fetched on every request to ensure real-time accuracy
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Fetch fresh data on every request
  const stats = await getInventoryStats();

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      color: 'from-primary-500 to-primary-600',
      icon: '📦',
    },
    {
      title: 'Total Inventory',
      value: stats.totalInventory,
      color: 'from-emerald-500 to-teal-600',
      icon: '📊',
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockProducts,
      color: 'from-amber-500 to-orange-600',
      icon: '⚠️',
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStockProducts,
      color: 'from-rose-500 to-red-600',
      icon: '🚫',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block mb-6">
              <span className="px-6 py-3 bg-white text-slate-900 text-sm font-black rounded-full border-2 border-white shadow-2xl" style={{ textShadow: 'none' }}>
                📊 Real-Time Analytics
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
              Inventory Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-semibold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Real-time inventory statistics powered by Server-Side Rendering (SSR)
              <span className="block mt-2 text-lg text-white font-semibold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Fresh data on every request for accurate insights
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, index) => (
            <div
              key={stat.title}
              className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 border border-slate-200/50 hover:border-primary-300/50 hover:-translate-y-2 animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-sm font-bold text-slate-600 mb-2 uppercase tracking-wider">{stat.title}</h3>
                <p className="text-4xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-2">{stat.value}</p>
                <div className="h-1.5 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Low Stock Alert */}
        {stats.lowStockProducts > 0 && (
          <div className="relative bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-300/50 rounded-2xl p-6 mb-10 animate-fade-in shadow-lg overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl mr-4 shadow-lg">
                  ⚠️
                </div>
                <div>
                  <h2 className="text-2xl font-black text-amber-900">Low Stock Alert</h2>
                  <p className="text-sm text-amber-700 font-medium">Action Required</p>
                </div>
              </div>
              <p className="text-amber-800 font-semibold text-lg">
                You have <span className="text-2xl font-black text-amber-900">{stats.lowStockProducts}</span> product{stats.lowStockProducts > 1 ? 's' : ''} with 
                inventory below 10 units. Consider restocking soon.
              </p>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in border border-slate-200/50">
          <div className="px-8 py-6 bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-primary-700 to-primary-700 bg-clip-text text-transparent">
                  All Products
                </h2>
                <p className="text-sm text-slate-600 mt-1">Complete inventory overview</p>
              </div>
              <div className="px-4 py-2 bg-white rounded-xl shadow-md border border-slate-200">
                <span className="text-sm font-bold text-slate-700">{stats.products.length} Items</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-black text-slate-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-black text-slate-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-black text-slate-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-black text-slate-700 uppercase tracking-wider">
                    Inventory
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-black text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-black text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {stats.products.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className="hover:bg-gradient-to-r hover:from-primary-50/30 hover:to-primary-50/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="font-bold text-slate-900 group-hover:text-primary-700 transition-colors duration-300">{product.name}</div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-sm font-semibold text-slate-600 bg-gradient-to-r from-primary-50 to-primary-50 px-3 py-1 rounded-full border border-primary-200">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-lg font-black text-blue-700">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-700">{product.inventory}</span>
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              product.inventory > 10
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                : product.inventory > 0
                                ? 'bg-gradient-to-r from-amber-500 to-orange-600'
                                : 'bg-gradient-to-r from-red-500 to-rose-600'
                            }`}
                            style={{ width: `${Math.min((product.inventory / 50) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-xs font-black rounded-full border-2 ${
                        product.inventory > 10
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : product.inventory > 0
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                      }`}>
                        {product.inventory > 10 ? '✓ In Stock' : product.inventory > 0 ? '⚠ Low Stock' : '✕ Out of Stock'}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white text-sm font-bold rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border-2 border-blue-600"
                      >
                        View
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SSR Info Box */}
        <div className="mt-10 mb-12 p-8 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 rounded-2xl shadow-2xl relative overflow-hidden border-2 border-blue-600">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white text-blue-900 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 font-black shadow-lg">
                ⚡
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Rendering Strategy</h3>
                <p className="text-white text-lg font-semibold leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  This page uses <span className="font-black text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Server-Side Rendering (SSR)</span>. 
                  Every time you visit this page, fresh data is fetched from the database to ensure 
                  you always see the most up-to-date inventory information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

