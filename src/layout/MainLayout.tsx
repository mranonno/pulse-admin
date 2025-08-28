// src/layout/MainLayout.tsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Pulse Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-800">
            Dashboard
          </Link>
          <Link to="/products" className="block p-2 rounded hover:bg-gray-800">
            Products
          </Link>
          <Link
            to="/products/new"
            className="block p-2 rounded hover:bg-gray-800"
          >
            Add Product
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 py-2 rounded bg-red-600 hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
