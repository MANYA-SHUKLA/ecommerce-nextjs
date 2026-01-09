'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/admin', label: 'Admin' },
    { href: '/recommendations', label: 'Recommendations' },
  ];

  return (
    <nav className="bg-white border-b-2 border-slate-500 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="group relative">
            <span className="text-3xl font-black text-slate-900 hover:text-blue-800 transition-all duration-300 inline-block relative z-10 tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              ShopHub
            </span>
            <span className="absolute inset-0 text-3xl font-black bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-tight" style={{ backgroundSize: '200% 200%' }}>
              ShopHub
            </span>
            <span className="block h-1.5 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1 rounded-full"></span>
          </Link>
          <div className="flex space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                  pathname === link.href
                    ? 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white shadow-2xl scale-105'
                    : 'text-slate-900 bg-white hover:bg-slate-100 hover:text-blue-900 hover:scale-105 border-2 border-slate-400 hover:border-blue-600 shadow-lg'
                }`}
                style={pathname === link.href ? {
                  boxShadow: '0 20px 25px -5px rgba(30, 64, 175, 0.6), 0 10px 10px -5px rgba(29, 78, 216, 0.5)'
                } : {
                  textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-lg"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

