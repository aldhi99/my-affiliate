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
  images: {
    id: string;
    filename: string;
    created_at: string;
  }[];
  visits_count?: number;
}

export interface ProductsResponse {
  status: boolean;
  message: string;
  data: {
    data: Product[];
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
  };
}

export interface ProductResponse {
  data: Product[];
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

export interface DashboardStats {
  totalProducts: number;
  totalVisits: number;
  averageVisitsPerProduct: number;
  mostVisitedProducts: Product[];
  weeklyVisits: VisitData[];
  dailyVisits: VisitData[];
}

export interface VisitData {
  date: string;
  visits: number;
}


export async function getProducts(size: number): Promise<ProductsResponse> {
  try {
    const url = process.env.NEXT_PUBLIC_URL_API + `/product/paginate/${size}`;
    
    const response = await fetch(url);
    const result = await response.json();

    if (!result.status) {
      throw new Error(result.message || 'Failed to fetch products');
    }    

    return result;
  } catch (error) {
    console.error('Error fetching products:', error);
    console.log("ssss");
    
    return {
      status: false,
      message: 'Failed to fetch products',
      data: {
        data: [],
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        items_per_page: size
      }
    };
  }
}

export async function getProductsBySlug(slug: string): Promise<Product> {
  try {
    const url = process.env.NEXT_PUBLIC_URL_API + `/product/${slug}`;    
    const response = await fetch(url);
    const result = await response.json();

    console.log(result[0]);
    

    if (!result.status) {
      throw new Error(result.message || 'Failed to fetch products');
    }

    if (!result.data) {
      throw new Error('Product not found');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw the error to be handled by the caller
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