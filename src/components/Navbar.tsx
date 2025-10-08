import React from 'react';
import { useFilter } from './FilterContext';

const Navbar = () => {
  const { liveSearchQuery, setLiveSearchQuery } = useFilter();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-50 shadow-md z-50">
      {/* Desktop/Tablet Navbar */}
      <div className="hidden sm:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 items-center justify-between">
        {/* Branding */}
        <h1 className="text-2xl font-extrabold text-blue-700 cursor-pointer flex-shrink-0">
          G-Store
        </h1>

        {/* Search input */}
        <div className="flex-1 flex justify-center ml-4">
          <input
            type="text"
            className="border-2 border-gray-300 rounded-full px-4 py-2 w-3/5 text-sm focus:border-blue-500 focus:ring-0 transition duration-200"
            placeholder="Search instantly..."
            value={liveSearchQuery}
            onChange={(e) => setLiveSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden flex items-center justify-between px-4 py-2 h-12">
        <h1 className="text-xl font-extrabold text-blue-700 cursor-pointer">
          G-Store
        </h1>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-full px-3 py-1 w-2/3 text-xs focus:border-blue-500 focus:ring-0 transition duration-200"
          placeholder="Search..."
          value={liveSearchQuery}
          onChange={(e) => setLiveSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Navbar;
