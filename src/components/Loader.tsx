import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
};

export default Loader;
