import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  description: string;
  slug: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const mainImage = product.images[0];
  
  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <Link href={`/produk/${product.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="w-12 h-12 mb-2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500">Gambar tidak tersedia</p>
              </div>
            </div>
          ) : (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={false}
              onLoad={() => setIsLoading(false)}
              onError={handleImageError}
            />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-primary-color transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary-color truncate-1-lines">{product.price}</p>
            <span className="text-xs text-secondary-color group-hover:translate-x-1 transition-transform w-20">
              Lihat Detail →
            </span>
          </div> 
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;