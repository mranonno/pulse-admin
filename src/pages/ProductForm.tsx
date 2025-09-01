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

  const [formData, setFormData] = useState<
    Omit<Product, "price" | "quantity"> & {
      price: string;
      quantity: string;
    }
  >({
    name: "",
    productModel: "",
    productOrigin: "",
    description: "",
    price: "",
    quantity: "",
    image: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setFormData({
            ...product,
            price: String(product.price),
            quantity: String(product.quantity),
          });
          if (typeof product.image === "string") {
            setPreview(product.image);
          }
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
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFormData((prev) => ({
        ...prev,
        image: {
          uri: objectUrl,
          name: file.name,
          type: file.type,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Convert price and quantity to numbers before sending
    const submitData: Product = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    try {
      if (id) {
        await updateProduct(id, submitData);
      } else {
        await createProduct(submitData);
      }
      navigate("/products");
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-card p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-text">
        {id ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid layout for inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="productModel"
            placeholder="Enter Product Model"
            value={formData.productModel}
            onChange={handleChange}
            className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="productOrigin"
            placeholder="Enter Product Origin"
            value={formData.productOrigin}
            onChange={handleChange}
            className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none min-h-[120px]"
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold text-text">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-border rounded-lg p-2 cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-green-800 transition"
          />
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border border-border shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-800 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
