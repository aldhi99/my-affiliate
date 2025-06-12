"use client";

import { useRef } from 'react';
import Header from '../../components/Header';
import Footer from '@/app/components/Footer';
import ProductGallery from '@/app/components/ProductGallery';
import OrderLinks from '@/app/components/OrderLinks';
import { Product, formatPriceRange } from '@/data/products';

interface ProductViewProps {
  product: Product;
}

export default function ProductView({ product }: ProductViewProps) {
  const orderSectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="w-full">
            <ProductGallery 
              images={product.images.map((img) => 
                `${process.env.NEXT_PUBLIC_URL_IMAGE}/${img.filename}`
              )} 
              alt={product.name} 
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Order Section - Hidden on mobile when floating */}
            <div ref={orderSectionRef} className="mb-8 md:block hidden">
              <OrderLinks 
                urlTiktok={product.url_tiktok}
                urlShopee={product.url_shopee}
                urlTokopedia={product.url_tokopedia}
              />
            </div>

            {/* Floating Order Section for Mobile */}
            <div className="md:hidden">
              <OrderLinks 
                urlTiktok={product.url_tiktok}
                urlShopee={product.url_shopee}
                urlTokopedia={product.url_tokopedia}
                showTitle={false}
                iconSize="sm"
              />
            </div>

            <h1 className="text-2xl font-bold mb-3 text-foreground">{product.name}</h1>
            <p className="text-xl sm:text-4xl font-semibold text-foreground mb-4 text-bold">
              {formatPriceRange(product.price_start, product.price_end)}
            </p>
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