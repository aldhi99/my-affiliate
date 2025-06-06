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

export interface ProductsResponse {
  items: Product[];
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
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

export async function getProducts(page: number = 1, size: number = 10): Promise<ProductsResponse> {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });
    
    const response = await fetch(`http://localhost:3000/api/produk?${queryParams}`);
    const result = await response.json();
    
    if (!result.status) {
      throw new Error(result.message || 'Failed to fetch products');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      items: [],
      current_page: 1,
      total_pages: 1,
      total_items: 0,
      items_per_page: size
    };
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