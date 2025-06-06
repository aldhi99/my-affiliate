'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductGallery from '../../components/ProductGallery';
import OrderLinks from '../../components/OrderLinks';
import { getProducts, Product, formatPriceRange } from '@/data/products';

type Props = {
  params: { slug: string }
}

export default function ProductClient({ params }: Props) {
  const routeParams = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const orderSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productSlug = params?.slug || routeParams?.slug as string;
        if (!productSlug) {
          setError('Invalid product slug');
          setLoading(false);
          return;
        }

        const result = await getProducts(1, 100); // Get more products to ensure we find the one we need
        const foundProduct = result.items.find((p) => p.slug === productSlug);
        
        if (!foundProduct) {
          setError('Product not found');
          setLoading(false);
          return;
        }

        setProduct(foundProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.slug, routeParams?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return <ProductNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="w-full">
            <ProductGallery 
              images={product.image_file.map(img => `${img.filename}`)} 
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

// Komponen terpisah untuk tampilan "Produk Tidak Ditemukan"
function ProductNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Produk Tidak Ditemukan</h1>
          <p className="text-lg text-secondary-color mb-8">
            Maaf, produk yang Anda cari tidak ditemukan.
          </p>
          <Link 
            href="/produk" 
            className="inline-block bg-primary-color text-white px-6 py-3 rounded-lg hover:bg-primary-color/90 transition-colors"
          >
            Kembali ke Daftar Produk
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
} 