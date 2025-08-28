// src/navigation/Routes.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

// Pages
// import Login from "../pages/Login";
// import Products from "../pages/Products";
// import ProductForm from "../pages/ProductForm";
import NotFound from "../pages/NotFound";

// // Layout
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

const AppRoutes: React.FC = () => {
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id/edit" element={<ProductForm />} /> */}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
