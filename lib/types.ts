export interface Product {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
  imageUrl?: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
}

