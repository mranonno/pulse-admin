// src/pages/Products.tsx
import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../services/productService";
import type { Product } from "../types/types";
import { Link } from "react-router";
import { Pencil, Trash2, PlusCircle, ImageOff } from "lucide-react";
import Loader from "../components/Loader";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.products);
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!isConfirmed) return;

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
    return <Loader />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text">Products</h1>
        <Link
          to="/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="overflow-x-auto bg-background rounded-xl shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700 text-left text-text text-sm uppercase tracking-wide">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Model</th>
                <th className="p-3">Origin</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p._id}
                  className={`${
                    i % 2 === 0 ? "bg-background" : "bg-card"
                  } hover:bg-gray-800      transition`}
                >
                  <td className="p-3">
                    {p.image ? (
                      <img
                        src={p.image as string}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-md shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-300 text-gray-500 shadow-sm">
                        <ImageOff size={20} />
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.productModel}</td>
                  <td className="p-3">{p.productOrigin}</td>
                  <td className="p-3 font-semibold text-green-600">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {p.quantity > 10 ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {p.quantity} in stock
                      </span>
                    ) : p.quantity > 0 ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Low ({p.quantity})
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                        Out of stock
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex items-center justify-center gap-2">
                    {/* Edit */}
                    <Link
                      to={`/products/edit/${p._id}`}
                      className="p-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                      title="Edit Product"
                    >
                      <Pencil size={16} />
                    </Link>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(p._id)}
                      disabled={deleting === p._id}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition"
                      title="Delete Product"
                    >
                      {deleting === p._id ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
