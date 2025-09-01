export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Product {
  _id?: string;
  name: string;
  productModel: string;
  productOrigin: string;
  description: string;
  price: number;
  quantity: number;
  image?: string | { uri: string; name?: string; type?: string };
  createdAt?: string;
}

export interface GetAllProductsResponse {
  success: boolean;
  products: Product[];
}
export interface GetAllProductsResponse {
  products: Product[];
}
