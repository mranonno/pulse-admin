// src/pages/Products.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllProducts, deleteProduct } from "../services/productService";
import type { Product } from "../types/types";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    setDeleting(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading products...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Model</th>
              <th className="p-3">Origin</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.productModel}</td>
                <td className="p-3">{p.productOrigin}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.quantity}</td>
                <td className="p-3 space-x-2">
                  <Link
                    to={`/products/${p._id}/edit`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={deleting === p._id}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleting === p._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
