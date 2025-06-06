export interface Product {
  id: string;
  name: string;
  slug: string;
  price_start: string;
  price_end: string;
  category: string;
  subcategory?: string;
  description: string;
  url_tiktok?: string;
  url_shopee?: string;
  url_tokopedia?: string;
  image_file: {
    id: string;
    product_id: string;
    filename: string;
    created_at: string;
  }[];
}

export const categories = [
  'Elektronik',
  'Fashion',
  'Kesehatan & Kecantikan',
  'Rumah Tangga',
  'Olahraga & Outdoor',
  'Makanan & Minuman',
  'Gaming & Hiburan',
  'Ibu & Anak',
  'Otomotif'
] as const;

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('http://localhost:3000/api/produk');
    const result = await response.json();
    
    if (!result.status) {
      throw new Error(result.message || 'Failed to fetch products');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Helper function to format price range
export function formatPriceRange(start: string, end: string): string {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(price));
  };
  
  return `${formatPrice(start)} - ${formatPrice(end)}`;
}