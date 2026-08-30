// These are plain "string" (not a fixed list of names) on purpose: it means
// you can add a brand-new category or subcategory slug in lib/categories.ts
// and lib/products.ts without ever touching this file.
export type CategorySlug = string;
export type SubcategorySlug = string;

export interface Subcategory {
  name: string;
  slug: SubcategorySlug;
  description: string;
}

export interface Category {
  name: string;
  slug: CategorySlug;
  description: string;
  subcategories: Subcategory[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  subcategory: SubcategorySlug | null;
  price: number;
  currency: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  images: string[];
  featured: boolean;
  available: boolean;
  stock: number;
  isNew?: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  size: string | null;
  color: string | null;
  quantity: number;
}
