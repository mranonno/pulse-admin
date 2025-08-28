// src/services/userService.ts
import axios from "axios";
import type { LoginData, LoginResponse } from "../types/types";

const API_BASE = "https://pulse-technology-server.vercel.app/api";

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE}/auth/login`,
      data
    );

    // Save token in localStorage
    if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Login failed");
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const logoutUser = (): void => {
  localStorage.removeItem("authToken");
};
