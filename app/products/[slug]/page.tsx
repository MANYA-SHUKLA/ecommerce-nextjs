import { getProductBySlug, getAllProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// This page uses Incremental Static Regeneration (ISR)
// Pages are pre-generated at build time and automatically regenerated every 60 seconds
export const revalidate = 60; // Revalidate every 60 seconds

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const imageUrl = product.imageUrl || `https://picsum.photos/800/600?random=${product.id}`;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-600 mb-6 transition-colors duration-200 font-medium group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 md:h-full min-h-[500px]">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-primary-100 via-primary-100 to-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-bold border border-primary-200">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>
              
              <div className="mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-700">Inventory:</span>
                  <span className={`font-bold ${
                    product.inventory > 10 
                      ? 'text-green-600' 
                      : product.inventory > 0 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}>
                    {product.inventory} units
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-700">Last Updated:</span>
                  <span className="text-slate-600">
                    {new Date(product.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  className={`btn-primary flex-1 ${
                    product.inventory === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={product.inventory === 0}
                >
                  {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="btn-secondary">
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 border border-primary-200 rounded-lg">
                <p className="text-sm text-primary-800">
                  <strong>Note:</strong> This page uses ISR (Incremental Static Regeneration). 
                  It's pre-generated at build time and automatically updates every 60 seconds 
                  to show the latest product information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

