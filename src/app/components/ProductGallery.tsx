'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Zoom */}
      <div 
        ref={containerRef}
        className="modern-border bg-white rounded-lg relative overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="relative w-full h-[350px] flex items-center justify-center">
          <div 
            className="relative w-full h-full overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: isZoomed ? `url(${mainImage})` : 'none',
              backgroundPosition: isZoomed ? `${position.x}% ${position.y}%` : 'center',
              backgroundSize: isZoomed ? '200%' : 'contain',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <Image
              src={mainImage}
              alt={alt}
              width={400}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`w-auto h-auto max-w-full max-h-full object-contain transition-opacity duration-300 ${
                isZoomed ? 'opacity-0' : 'opacity-100'
              }`}
              priority
            />
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`relative aspect-square rounded-lg overflow-hidden border-0 transition-all ${
              mainImage === image 
                ? 'border-1 scale-115' 
                : 'hover:border-secondary-color'
            }`}
          >
            <Image
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery; 