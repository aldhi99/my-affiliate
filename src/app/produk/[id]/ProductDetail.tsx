'use client';

import { useState, useEffect, useRef, use } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductGallery from '../../components/ProductGallery';
import OrderLinks from '../../components/OrderLinks';
import { products } from '@/data/products';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [showFloatingOrder, setShowFloatingOrder] = useState(false);
  const orderSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingOrder(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    if (orderSectionRef.current) {
      observer.observe(orderSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const product = products.find((p) => p.id === parseInt(unwrappedParams.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="w-full">
            <ProductGallery images={product.images} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Order Section */}
            <div ref={orderSectionRef} className="mb-8">
              <OrderLinks productName={product.name} />
            </div>

            {/* Floating Order Section for Mobile */}
            <div 
              className={`fixed bottom-0 left-0 right-0 bg-white border-t border-border-color p-4 md:hidden transition-transform duration-300 ${
                showFloatingOrder ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              <div className="container mx-auto">
                <OrderLinks 
                  productName={product.name} 
                  iconSize="sm" 
                  isFloating={true} 
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-3 text-foreground">{product.name}</h1>
            <p className="text-xl sm:text-4xl font-semibold text-foreground mb-4 text-bold">{product.price}</p>
            <div className="mb-8">
              <div
                className="text-lg text-secondary-color leading-relaxed border-t border-border-color pt-4"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 