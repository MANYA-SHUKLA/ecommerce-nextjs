import { getAllProducts } from '@/lib/products';
import RecommendedProducts from '@/components/RecommendedProducts';

// This page uses React Server Components
// Data is fetched on the server, and we combine server and client components
export default async function RecommendationsPage() {
  // Fetch recommended products on the server
  const allProducts = await getAllProducts();
  
  // Simple recommendation logic: products with inventory > 10, sorted by price
  const recommendedProducts = allProducts
    .filter(p => p.inventory > 10)
    .sort((a, b) => a.price - b.price)
    .slice(0, 6);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Recommended Products
          </h1>
          <p className="text-slate-600 text-lg">
            Hand-picked recommendations just for you. This page demonstrates React Server Components 
            with hybrid server/client component architecture.
          </p>
        </div>

        {/* Server Component renders the list */}
        <RecommendedProducts products={recommendedProducts} />

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Rendering Strategy:</strong> This page uses React Server Components. 
            The product list is fetched and rendered on the server, while the "Add to Wishlist" 
            buttons are client components for interactivity. This combines the best of both worlds: 
            server-side data fetching with client-side interactivity.
          </p>
        </div>
      </div>
    </div>
  );
}

