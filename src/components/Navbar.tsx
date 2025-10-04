import React from 'react';
import { useFilter } from './FilterContext';

const Navbar = () => {
  const { liveSearchQuery, setLiveSearchQuery } = useFilter();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {/* Desktop Navbar */}
      <div className="hidden sm:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 items-center justify-between">
        <h1 className="text-2xl font-bold text-black cursor-pointer">G-Store</h1>
        <div className="flex-1 flex justify-center ml-4">
          <input
            type="text"
            className="border-2 rounded-full px-4 py-2 w-3/5 text-sm focus:border-black focus:ring-0 transition duration-200"
            placeholder="Search instantly..."
            value={liveSearchQuery}
            onChange={(e) => setLiveSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden flex flex-col items-center bg-white px-4 py-3">
        <h1 className="text-2xl font-bold text-black cursor-pointer mb-2">G-Store</h1>
        <input
          type="text"
          className="border-2 rounded-full px-4 py-2 w-full text-sm focus:border-black focus:ring-0 transition duration-200"
          placeholder="Search instantly..."
          value={liveSearchQuery}
          onChange={(e) => setLiveSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Navbar;
