export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T | null;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    price_start: number;
    price_end: number;
    category: string;
    subcategory: string;
    description: string;
    image_file: ProductImage[];
}

export interface ProductImage {
    id: number;
    product_id: number;
    filename: string;
    created_at: string;
  }

export interface CreateProductRequest {
    name: string;
    slug: string;
    price: number;
    category: string;
    subcategory: string;
    description: string;
    image: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
    id: string;
}

export interface DeleteProductRequest {
    id: string;
}