export type Category = 'All' | 'Fruits' | 'Vegetables' | 'Dairy' | 'Staples' | 'Bakery' | 'Organic';

export type Product = {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit?: string;
  category: Exclude<Category, 'All'>;
  rating: number;
  stock: number | string;
  emoji?: string;
  description: string;
  isOrganic?: boolean;
  image?: string;
};

export type User = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type CartItem = Product & { qty: number };
