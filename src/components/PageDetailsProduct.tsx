"use client"

import React, { useState, useEffect } from 'react';
import { useProduct, useCreateLineItem, useLocalStorage, useGetCart } from "medusa-react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Loading from './loading';

interface PageProps {
  params: {
    productId: string;
  };
}

const PageDetailsProduct = ({ params }: PageProps) => {
  const { product, isLoading } = useProduct(params.productId);

  const [localCartId] = useLocalStorage("cart_id", "")
  const { cart } = useGetCart(localCartId)

  const createLineItem = useCreateLineItem(cart?.id ?? "")

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.options && product.options[0] && product.options[0].values) {
        const sizes = product.options[0].values.map((option:any) => option.value);
        const uniqueSizes = Array.from(new Set(sizes));
        setUniqueSizes(uniqueSizes);
      }

      if (product.options && product.options[1] && product.options[1].values) {
        const colors = product.options[1].values.map((option:any) => option.value);
        const uniqueColors = Array.from(new Set(colors));
        setUniqueColors(uniqueColors);
      }
    }
  }, [product]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProducts(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleColorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let quantity = parseInt(event.target.value);
    if (quantity > 100) {
      quantity = 100;
      alert("Maximum quantity allowed is 100.");
    }
    setSelectedQuantity(quantity);
  };

  const router = useRouter()
  const onAddItemToCart = async () => {
    if (!product) return

    const selectedVariant = product.variants.find(variant =>
      (!selectedSize || variant.options?.some(option => option.value === selectedSize) || variant.options?.some(option => option.value === selectedColor))
    );

    if (!selectedVariant) {
      alert("Selected variant not found");
      return;
    }

    createLineItem.mutate({
      quantity: selectedQuantity,
      variant_id: selectedVariant.id!,
    })

    router.push('/checkout')
  }

  if (!showProducts || isLoading || !product || !cart) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className='flex py-3 mx-auto'>
        <nav className="fixed top-0 left-0 w-full z-10 rounded-lg text-green-200 mix-blend-difference bg-black">
          <div className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Link href="/">
                  <h1 className="isolate text-xl font-semibold">Medusa</h1>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto bg-green-200 rounded-lg">
        {product && (
          <div className="shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-3xl font-semibold">{product.title}</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{product.description}</p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{product.material}</p>
            </div>
            <div className="border-t border-gray-600">
              <dl>
                <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Image</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 flex justify-center">
                    <div style={{ maxWidth: '500px' }}>
                      {product.images && product.images.length > 0 && (
                        <Image
                          src={selectedColor === 'White' ? product.images[2]?.url : product.images[0]?.url}
                          alt={product.title || 'Image'}
                          width={500}
                          height={500}
                        />
                      )}
                    </div>
                  </dd>
                </div>
                {uniqueSizes.length > 0 && (
                  <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Available Sizes</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-1">
                      <div className="relative">
                        <select
                          value={selectedSize}
                          onChange={handleSizeSelect}
                          className="block appearance-none bg-green-300 w-full border border-green-600 rounded-md py-2 pl-3 pr-10 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="">Select Size</option>
                          {uniqueSizes.map((size, index) => (
                            <option key={index} value={size}>{size}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </dd>
                  </div>
                )}
                {uniqueColors.length > 0 && (
                  <div className="bg-green-200 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Available Colors</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-1">
                      <div className="relative">
                        <select
                          value={selectedColor}
                          onChange={handleColorSelect}
                          className="block appearance-none bg-green-300 w-full border border-green-600 rounded-md py-2 pl-3 pr-10 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="">Select Color</option>
                          {uniqueColors.map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </dd>
                  </div>
                )}
                {selectedSize && (
                  <div className="bg-green-200 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Price for {product.title}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-1">
                      {product.variants
                        .filter((variant, index, self) => {
                          return index === self.findIndex(v => (
                            v.prices.some(option => option.amount === variant.prices[0].amount)
                          ));
                        })
                        .map((variant, index) => (
                          <div key={index} className="mb-4">
                            <div className="font-semibold">Price:</div>
                            <div className="mt-1 text-lg font-semibold">
                              {new Intl.NumberFormat('en-US', { style: 'currency', currency: variant.prices[0].currency_code }).format((variant.prices[0].amount / 100) * selectedQuantity)} €
                            </div>
                          </div>
                        ))}
                    </dd>
                    <dt className="text-sm font-medium text-gray-500">Selected size {selectedSize}</dt>
                    {product.images && product.images.length > 0 && (
                      <Image
                        src={selectedColor === 'White' ? product.images[2]?.url : product.images[0]?.url}
                        alt={product.title || 'Image'}
                        width={500}
                        height={500}
                      />
                    )}
                    <div className="bg-green-200 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-1">
                        <div className="flex items-center">
                          <label htmlFor="quantity" className="mr-2 font-medium">Quantity:</label>
                          <input
                            type="number"
                            id="quantity"
                            min="1"
                            max="100"
                            value={selectedQuantity}
                            onChange={handleQuantityChange}
                            className="appearance-none bg-green-300 w-20 border border-green-600 rounded-md py-2 pl-3 pr-1 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </dd>
                    </div>
                    <button className="border-2 w-full h-1/2 border-black border-solid text-black hover:border-solid hover:border-green-500 hover:bg-green-300 hover:text-gray-500 hover:border-2 font-bold py-2 px-4 rounded transition duration-300" onClick={onAddItemToCart}>
                      Checkout
                    </button>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetailsProduct;