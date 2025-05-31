import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Get the first image from the images array
  const mainImage = product.images[0];
  
  return (
    <Link href={`/produk/${product.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="pl-4 relative w-full aspect-square overflow-hidden bg-gray-50">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
          />
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