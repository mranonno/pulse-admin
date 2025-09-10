// src/pages/ProductForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "../services/productService";
import type { Product } from "../types/types";
import Loader from "../components/Loader";

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Product>({
    name: "",
    productBrand: "",
    productModel: "",
    productOrigin: "",
    description: "",
    price: 0,
    quantity: 0,
    image: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setFetching(true);
        try {
          const response = await getProductById(id);
          const product = response;
          setFormData({
            name: product.name ?? "",
            productBrand: product.productBrand ?? "",
            productModel: product.productModel ?? "",
            productOrigin: product.productOrigin ?? "",
            description: product.description ?? "",
            price: product.price ?? 0,
            quantity: product.quantity ?? 0,
            image:
              typeof product.image === "string" ? product.image : undefined,
          });
          if (typeof product.image === "string") {
            setPreview(product.image);
          }
        } catch (error) {
          console.error("Failed to fetch product:", error);
        } finally {
          setFetching(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
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

  if (fetching) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto bg-card p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-text">
        {id ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid layout for inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-text"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. SPO2 Sensor"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
              required
            />
          </div>

          {/* Product Brand */}
          <div>
            <label
              htmlFor="productBrand"
              className="block mb-2 font-semibold text-text"
            >
              Brand
            </label>
            <input
              type="text"
              id="productBrand"
              name="productBrand"
              placeholder="e.g. Younker"
              value={formData.productBrand}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
            />
          </div>

          {/* Product Model */}
          <div>
            <label
              htmlFor="productModel"
              className="block mb-2 font-semibold text-text"
            >
              Model
            </label>
            <input
              type="text"
              id="productModel"
              name="productModel"
              placeholder="e.g. YM2000"
              value={formData.productModel}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
              required
            />
          </div>

          {/* Product Origin */}
          <div>
            <label
              htmlFor="productOrigin"
              className="block mb-2 font-semibold text-text"
            >
              Origin
            </label>
            <input
              type="text"
              id="productOrigin"
              name="productOrigin"
              placeholder="e.g. China"
              value={formData.productOrigin}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block mb-2 font-semibold text-text"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="e.g. 1500"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block mb-2 font-semibold text-text"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="e.g. 10"
              value={formData.quantity}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-text"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="e.g. High-accuracy SPO2 sensor compatible with patient monitors."
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-border bg-background p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none min-h-[120px] disabled:opacity-50"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block mb-2 font-semibold text-text">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            className="w-full border border-border rounded-lg p-2 cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-green-800 transition disabled:opacity-50"
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
