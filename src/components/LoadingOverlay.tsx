"use client";
import React from "react";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
    </div>
  );
};

export default LoadingOverlay;
