import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product, formatPriceRange } from '@/data/products';

interface ProductCardProps {
  product: Product;
}



export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = product.image_file[0]?.filename || '/placeholder.jpg';

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
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={`${mainImage}`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      <div className="p-4">
      <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-primary-color transition-colors">
            {product.name}
          </h3>
            <p className="text-sm font-medium text-primary-color truncate-1-lines">{formatPriceRange(product.price_start,product.price_end) }</p>
            <span className="text-xs text-secondary-color pt-2 truncate-2-lines">
              {cleanDescription}
            </span>
      </div>
    </Link>
  );
}