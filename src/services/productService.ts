// src/services/productService.ts
import axios, { AxiosError } from "axios";
import type { Product } from "../types/types";

const API_BASE = "https://pulse-technology-server.vercel.app/api/products";

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const token = localStorage.getItem("authToken");
  const res = await axios.get<Product[]>(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const res = await axios.get<Product>(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create product
export const createProduct = async (product: Product): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const res = await axios.post<Product>(API_BASE, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update product
export const updateProduct = async (
  id: string,
  product: Product
): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const res = await axios.put<Product>(`${API_BASE}/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  const token = localStorage.getItem("authToken");
  try {
    await axios.delete(`${API_BASE}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || "Failed to delete product");
  }
};
