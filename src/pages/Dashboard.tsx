// src/pages/Dashboard.tsx
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboards</h1>
      <p className="text-text">
        Welcome to Pulse Admin. Use the sidebar to navigate through the system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Example Stats Cards */}
        <div className="p-6 bg-card shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="p-6 bg-card shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">58</p>
        </div>

        <div className="p-6 bg-card shadow rounded-lg">
          <h2 className="text-lg font-semibold text-white">Users</h2>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
