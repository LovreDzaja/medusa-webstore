"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useProducts } from "medusa-react";

import Navbar from './Navbar';
import NotFound from './NotFound';
import ProductCard from './ProductCard';
import Loading from './loading';

import { Collection } from '@/types/Product';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

const ProductList: React.FC = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<PricedProduct[]>([]);
  const [searchProducts, setSearchProducts] = useState<PricedProduct[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const { products, isLoading } = useProducts();

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
      setSearchProducts(products);
    }
  }, [products]);

  const filterProductsByCollection = (collection: string) => {
    setSelectedCollection(collection);
    if (collection === "") {
      setFilteredProducts(products || []);
    } else {
      const filtered = (products || []).filter(product => product.collection?.title === collection);
      setFilteredProducts(filtered);
    }
  };

  const filterProductsBySearch = (query: PricedProduct[]) => {
    if (Array.isArray(query) && query.length === 0) {
      setFilteredProducts(products || []);
    } else {
      setFilteredProducts(query);
    }
  }

  const uniqueCollections: Collection[] = (products || []).reduce((acc: Collection[], product) => {
    const title = product.collection?.title;
    if (title) {
      const existingCollection = acc.find(collection => collection.title === title);
      if (!existingCollection) {
        acc.push({ title } as Collection);
      }
    }
    return acc;
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProducts(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showProducts || isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        collections={uniqueCollections}
        selectedCollection={selectedCollection}
        setSelectedCollection={filterProductsByCollection}
        setFilteredProducts={filterProductsBySearch}
      />
      <div className="pt-20 mix-blend-multiply">
        <div className="container mx-auto py-8">
          {filteredProducts.length === 0 ? (
            <NotFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Link key={product.id} href={`/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
