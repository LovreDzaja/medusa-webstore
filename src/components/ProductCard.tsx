import React from 'react';
import Image from 'next/image';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

interface ProductCardProps {
  product: PricedProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const { title, images, variants } = product;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
      <div className="relative h-48">
        <Image src={images![0]?.url} alt={title!} layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <span className="text-gray-700 font-bold">
          {variants[0]?.prices[0]?.amount && new Intl.NumberFormat('en-US', { style: 'currency', currency: variants[0]?.prices[0]?.currency_code }).format(variants[0]?.prices[0]?.amount / 100)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;