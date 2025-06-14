import { useState, useRef } from 'react';
import Image from 'next/image';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { fetchWithAuth } from '@/utils/auth';

interface ProductImage {
  id: string;
  filename: string;
  created_at: string;
}

interface ProductImageUploadProps {
  productId: string;
  existingImages?: ProductImage[];
  onImagesUpdated?: (images: ProductImage[]) => void;
}

export default function ProductImageUpload({ productId, existingImages = [], onImagesUpdated }: ProductImageUploadProps) {
  const [images, setImages] = useState<ProductImage[]>(existingImages);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    try {
      setIsUploading(true);
      setError(null);
  
      const base64Images = await Promise.all(
        Array.from(files).map((file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
            reader.readAsDataURL(file);
          })
        )
      );

      const payload = {
        product_id: productId,
        images: base64Images,
      };
  
      const urlApi = `${process.env.NEXT_PUBLIC_URL_API}/product-image/upload`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      const response = await fetchWithAuth(urlApi, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.status !== 200) {
        throw new Error(result.message || 'Failed to upload images');
      }
  
      const newImages = Array.isArray(result.data) ? result.data : [result.data];
      setImages((prevImages) => [...prevImages, ...newImages]);
      onImagesUpdated?.([...images, ...newImages]);

      // Show success toast
      toast.success('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      setIsUploading(true);
      setError(null);

      const urlApi = `${process.env.NEXT_PUBLIC_URL_API}/product-image/delete?imageId=${imageId}&productId=${productId}`;
      console.log(urlApi);
      
      const response = await fetchWithAuth(urlApi, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      console.log(result);
      

      if (result.status === "ERROR") {
        throw new Error(result.message || 'Failed to delete image');
      }

      const newImages = images.filter(img => img.id !== imageId);
      setImages(newImages);
      onImagesUpdated?.(newImages);

      // Show success toast
      toast.success('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete image';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PhotoIcon className="h-5 w-5 mr-2 text-gray-400" />
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XMarkIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group aspect-square">
              <Image
                src={process.env.NEXT_PUBLIC_URL_IMAGE + '/' + image.filename}
                alt={image.filename}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(image.id)}
                disabled={isUploading}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
} 