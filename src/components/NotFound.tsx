import React from 'react';
import Image from 'next/image';

import logo from "@/assets/logo.png";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-fit">
      <div className="text-center p-6 bg-green-200 rounded-lg shadow-lg max-w-sm mx-auto">
        <Image src={logo} alt="Logo" className="mx-auto mb-4" width={80} height={80} />
        <h1 className="text-6xl font-bold text-green-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Product not found</p>
      </div>
    </div>
  );
};

export default NotFound;