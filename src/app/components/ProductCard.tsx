import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product, formatPriceRange } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const mainImage = product.image_file[0]?.filename || null;

  const cleanDescription = product.description
    .replace(/<[^>]*>/g, '')
    .replace(/deskripsi produk/gi, '')
    .replace(/keterangan produk/gi, '')
    .replace(/&quot;/gi, '"')
    .trim();

  return (
    <Link 
      href={`/produk/${product.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-50">
        {!mainImage || imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-16 h-16 mb-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Gambar tidak tersedia</p>
          </div>
        ) : (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-primary-color transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-primary-color truncate-1-lines">{formatPriceRange(product.price_start, product.price_end)}</p>
        <span className="text-xs text-secondary-color pt-2 truncate-2-lines">
          {cleanDescription}
        </span>
      </div>
    </Link>
  );
}