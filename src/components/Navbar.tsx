import Link from 'next/link';
import React, { useState } from 'react';

import { Collection } from '@/types/Product';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

import Sidebar from './sidebar/Sidebar';

interface NavbarProps {
  collections: Collection[];
  selectedCollection: string;
  setSelectedCollection: (collection: string) => void;
  setFilteredProducts: (products: PricedProduct[]) => void;
}

const Navbar: React.FC<NavbarProps> = ({ collections, selectedCollection, setSelectedCollection, setFilteredProducts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-10 rounded-lg text-green-200 mix-blend-difference bg-black">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex">
              <Link href="/">
                <h1 className="isolate text-xl font-semibold">Medusa</h1>
              </Link>
            </div>
            <div className="flex">
              <button
                onClick={toggleSidebar}
                className="focus:outline-none"
              >
                {isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        collections={collections}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        setFilteredProducts={setFilteredProducts}
      />
    </>
  );
};

export default Navbar;
