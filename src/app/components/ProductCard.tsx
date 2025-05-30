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
    <Link href={`/products/${product.id}`} className="card block">
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-t-lg">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-hover object-cover"
          priority={false}
        />
      </div>
      <div className="px-3">
        <h3 className="text-sm sm:text-lg font-semibold mb-2 text-foreground h-[40px] sm:h-[60px] truncate-2-lines">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium mb-4 text-secondary-color">{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;