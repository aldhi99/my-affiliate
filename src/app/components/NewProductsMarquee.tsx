'use client';

import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { getProducts, Product } from '@/data/products';
import ProductCard from './ProductCard';
import Link from 'next/link';

const NewProductsMarquee = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Get the 6 newest products (assuming products are ordered by id, with higher id being newer)
        const newestProducts = [...data]
          .sort((a, b) => parseInt(b.id) - parseInt(a.id))
          .slice(0, 6);
        setProducts(newestProducts);
        setLoading(false);
      } catch {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  // Duplicate the array 3x for seamless effect
  const marqueeProducts = [...products, ...products, ...products];

  return (
    <section className="w-full py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-color/10 via-transparent to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Produk Terbaru</h2>
          <Link 
            href="/produk" 
            className="text-primary-color hover:text-primary-color/90 transition-colors"
          >
            Lihat Semua
          </Link>
        </div>

        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-4"
        >
          <div className="flex gap-4">
            {marqueeProducts.map((product, index) => (
              <div key={`${product.id}-${index}`} className="w-[280px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default NewProductsMarquee; 