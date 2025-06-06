'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [mainImage, setMainImage] = useState<string | null>(images[0] || null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleImageError = (imageUrl: string) => {
    setImageError(imageUrl);
    // Jika gambar utama error, coba gunakan gambar berikutnya
    if (imageUrl === mainImage && images.length > 1) {
      const nextImage = images.find(img => img !== imageUrl);
      if (nextImage) setMainImage(nextImage);
    }
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
        <div 
          className="relative w-full h-[100px] overflow-hidden flex items-center justify-center min-h-[400px] bg-gray-50"
          style={{
            backgroundImage: isZoomed && mainImage ? `url(${mainImage})` : 'none',
            backgroundPosition: isZoomed ? `${position.x}% ${position.y}%` : 'center',
            backgroundSize: isZoomed ? '200%' : 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {isLoading && mainImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {!mainImage || imageError === mainImage ? (
            <div className="flex flex-col items-center justify-center p-4 text-center">
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
              alt={alt}
              width={400}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`w-auto h-auto max-w-full max-h-full object-contain transition-opacity duration-300 ${
                isZoomed ? 'opacity-0' : 'opacity-100'
              }`}
              priority
              onLoad={() => setIsLoading(false)}
              onError={() => handleImageError(mainImage)}
            />
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            image && (
              <button
                key={index}
                onClick={() => {
                  setMainImage(image);
                  setIsLoading(true);
                  setImageError(null);
                }}
                className={`relative aspect-square rounded-lg overflow-hidden border-0 transition-all ${
                  mainImage === image 
                    ? 'border-1 scale-115' 
                    : 'hover:border-secondary-color'
                } ${imageError === image ? 'bg-gray-100' : ''}`}
              >
                {imageError === image ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                ) : (
                  <Image
                    src={image}
                    alt={`${alt} thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10vw"
                    className="object-cover"
                    onError={() => handleImageError(image)}
                  />
                )}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery; 