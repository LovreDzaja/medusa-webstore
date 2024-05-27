import React from 'react';

import { Collection } from  "@/types/Product";

interface FilterProps {
  collections: Collection[];
  selectedCollection: string;
  setSelectedCollection: (collection: string) => void;
}

const Filter: React.FC<FilterProps> = ({ collections, selectedCollection, setSelectedCollection }) => {
  const handleCollectionChange = (collection: string) => {
    setSelectedCollection(collection);
  };

  return (
    <div>
      <div className="px-4 py-3 border-b">
        <p className="text-xl font-semibold text-gray-800">Collections</p>
      </div>
      <div className="px-4 py-2">
        {collections.map(collection => (
          <button
            key={collection.title}
            onClick={() => handleCollectionChange(collection.title)}
            className={`mr-2 mb-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium focus:outline-none ${selectedCollection === collection.title ? 'bg-gray-400' : ''}`}
          >
            {collection.title}
          </button>
        ))}
        <button
          onClick={() => handleCollectionChange('')}
          className={`mr-2 mb-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium focus:outline-none ${selectedCollection === '' ? 'bg-gray-400' : ''}`}
        >
          All Collections
        </button>
      </div>
    </div>
  );
};

export default Filter;