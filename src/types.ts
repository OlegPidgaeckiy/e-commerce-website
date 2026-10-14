export interface Product {
  id: number;
  title: string;
  brand?: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  discountPercentage?: number;
  thumbnail: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Category {
  slug: string;
  name: string;
  url?: string;
}

export type SortOption = "featured" | "rating" | "price-low" | "price-high";

export interface ProductsResponse {
  products: Product[];
}
