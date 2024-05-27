import React, { useState } from 'react';

import { searchProducts } from '@/utils/searchProducts';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

interface SearchProps {
  setFilteredProducts: (products: PricedProduct[]) => void;
}

const Search: React.FC<SearchProps> = ({setFilteredProducts}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const results = await searchProducts(query.toString());
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };


  return (
    <div>
        <div className="px-4 py-3 border-b">
          <p className="text-xl font-semibold text-gray-800">Search through products</p>
        </div>
        <div className="px-4 py-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
    </div>
  )
}

export default Search