// src/App.tsx
import React from "react";
import AppRoutes from "./navigation/Routes";

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AppRoutes />
    </div>
  );
};

export default App;
