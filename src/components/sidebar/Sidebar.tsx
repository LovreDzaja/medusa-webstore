import React from 'react';



import Link from 'next/link';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Collection } from '@/types/Product';

import Filter from './Filter';
import Search from './Search';
import { ShoppingBag } from '@medusajs/icons';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  collections: Collection[];
  selectedCollection: string;
  setSelectedCollection: (collection: string) => void;
  setFilteredProducts: (products: PricedProduct[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, collections, selectedCollection, setSelectedCollection, setFilteredProducts }) => {
  return (
    <div className={`bg-white fixed bottom-0 left-0 w-full z-50 bg-transparent transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} >
      <div className={`bg-white w-screen shadow-lg transform md:transition-transform ease-in-out duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex">
          <div className="w-1/2">
            <Filter
              collections={collections}
              selectedCollection={selectedCollection}
              setSelectedCollection={setSelectedCollection}
            />
          </div>
          <div className="border-l border-gray-300"/>
          <div className="w-1/2">
            <Search
              setFilteredProducts={setFilteredProducts}
            />
            <Link className='flex px-4 w-fit' href={'/checkout'}>
              <h1 className="flex items-center text-l font-semibold">
                Checkout <ShoppingBag className='ml-2' />
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
