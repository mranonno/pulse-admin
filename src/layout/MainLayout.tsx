// src/layout/MainLayout.tsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { LayoutDashboard, Package, PlusSquare, LogOut } from "lucide-react";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-card text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Pulse Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
          >
            <Package size={18} /> Products
          </Link>
          <Link
            to="/products/new"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
          >
            <PlusSquare size={18} /> Add Product
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 m-4 py-2 px-3 rounded bg-red-600 hover:bg-red-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-background p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
