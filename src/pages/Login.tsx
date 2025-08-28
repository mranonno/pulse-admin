// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../services/userService";
import type { LoginData, LoginResponse } from "../types/types";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response: LoginResponse = await loginUser(formData);
      localStorage.setItem("authToken", response.token);
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-card shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-text">Login</h2>
        {error && <p className="text-danger text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-text">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-border rounded px-3 py-2 bg-background text-text placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-text">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-border rounded px-3 py-2 bg-background text-text placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary disabled:opacity-50 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
