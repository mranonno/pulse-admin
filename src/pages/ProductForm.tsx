// src/pages/ProductForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "../services/productService";
import type { Product } from "../types/types";

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Product>({
    name: "",
    productModel: "",
    productOrigin: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setFormData(product);
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate("/products");
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="productModel"
          placeholder="Product Model"
          value={formData.productModel}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="productOrigin"
          placeholder="Product Origin"
          value={formData.productOrigin}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
