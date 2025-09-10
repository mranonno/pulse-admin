// src/services/productService.ts
import axios, { AxiosError } from "axios";
import type { GetAllProductsResponse, Product } from "../types/types";

const API_BASE = "https://pulse-technology-server.vercel.app/api/products";

interface responseProduct {
  product: Product;
  message: string;
}

// ✅ Utility to convert Product into FormData
const toFormData = (product: Product): FormData => {
  const formData = new FormData();

  // Append scalar fields
  formData.append("name", product.name);
  formData.append("productModel", product.productModel);
  formData.append("productOrigin", product.productOrigin);
  formData.append("description", product.description);
  formData.append("price", product.price.toString());
  formData.append("quantity", product.quantity.toString());

  // Append image only if exists
  if (product.image) {
    if (typeof product.image === "string") {
      formData.append("image", product.image);
    } else {
      formData.append("image", {
        uri: product.image.uri,
        name: product.image.name || "product.jpg",
        type: product.image.type || "image/jpeg",
      } as unknown as File);
    }
  }

  return formData;
};

// ✅ Get all products
export const getAllProducts = async (): Promise<GetAllProductsResponse> => {
  const token = localStorage.getItem("authToken");
  const res = await axios.get<GetAllProductsResponse>(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Get single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const res = await axios.get<responseProduct>(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.product;
};

// ✅ Create product (with image upload)
export const createProduct = async (product: Product): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const formData = toFormData(product);

  const res = await axios.post<Product>(API_BASE, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// ✅ Update product (with image upload)
export const updateProduct = async (
  id: string,
  product: Product
): Promise<Product> => {
  const token = localStorage.getItem("authToken");
  const formData = toFormData(product);

  const res = await axios.put<Product>(`${API_BASE}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// ✅ Delete product
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
