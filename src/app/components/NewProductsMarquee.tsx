'use client';

import Marquee from 'react-fast-marquee';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import Link from 'next/link';

const NewProductsMarquee = () => {
  // Get the 6 newest products (assuming products are ordered by id, with higher id being newer)
  const newestProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);
  // Duplicate the array 3x for seamless effect
  const marqueeProducts = [...newestProducts, ...newestProducts, ...newestProducts];

  return (
    <section className="w-full py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-color/10 via-transparent to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-4xl font-bold text-foreground mb-3 relative">
              Produk Terbaru
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary-color rounded-full"></span>
            </h2>
          </div>
        </div>

        {/* Products Marquee */}
        <div className="relative group">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          {/* Style override for react-fast-marquee */}
          <style jsx global>{`
            .rfm-initial-child-container {
              padding: 0 !important;
            }
          `}</style>
          
          <Marquee
            gradient={false}
            speed={20}
            pauseOnHover={true}
            className="py-6 transition-all duration-300"
          >
            <div className="flex gap-8">
              {marqueeProducts.map((product, idx) => (
                <div 
                  key={product.id + '-' + idx} 
                  className="w-[280px] flex-shrink-0 transform transition-all duration-300"
                >
                  <div className="relative">
                    {/* New Badge */}
                      <div className="absolute top-2 right-2 z-20 bg-primary-color text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
                        Baru
                      </div>
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/produk" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-color text-black rounded-full hover:bg-primary-color/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Lihat Semua Produk
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewProductsMarquee; 