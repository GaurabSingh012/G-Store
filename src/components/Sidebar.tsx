import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { FaFilter, FaTimes } from "react-icons/fa";
import products from "../data/products.json";

const Sidebar = () => {
  const {
    inputSelectedCategory,
    setInputSelectedCategory,
    inputMinPrice,
    setInputMinPrice,
    inputMaxPrice,
    setInputMaxPrice,
    inputKeyword,
    setInputKeyword,
    liveSearchQuery,
    setLiveSearchQuery,
    applyFilters,
    resetAllFilters,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    ) as string[];
    setCategories(uniqueCategories);
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputMinPrice(e.target.value ? parseFloat(e.target.value) : undefined);

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined);

  const handleCategoryChange = (category: string) =>
    setInputSelectedCategory(category);

  const handleKeywordClick = (keywordItem: string) =>
    setInputKeyword(keywordItem);

  const handleApply = () => {
    applyFilters();
    setIsMenuOpen(false);
  };

  const handleReset = () => {
    // Reset all filter states
    setInputSelectedCategory("");
    setInputMinPrice(undefined);
    setInputMaxPrice(undefined);
    setInputKeyword("");
    setLiveSearchQuery("");
    resetAllFilters();
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-50 bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Open Filters"
      >
        <FaFilter className="text-lg" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-4/5 sm:w-2/3 md:w-1/2 lg:w-64 bg-gray-50 p-5 border-r shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          overflow-y-auto
        `}
      >
        {/* Close button on mobile */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-600 text-xl"
          title="Close sidebar"
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>

        <section className="space-y-6 mt-8 lg:mt-2">
          {/* Instant Search */}
          <input
            type="text"
            className="border-2 rounded px-3 py-2 w-full"
            placeholder="Search instantly..."
            value={liveSearchQuery}
            onChange={(e) => setLiveSearchQuery(e.target.value)}
          />

          {/* Price Inputs */}
          <div className="flex gap-2">
            <input
              type="number"
              className="border-2 rounded px-3 py-2 w-1/2"
              placeholder="Min"
              value={inputMinPrice ?? ""}
              onChange={handleMinPriceChange}
            />
            <input
              type="number"
              className="border-2 rounded px-3 py-2 w-1/2"
              placeholder="Max"
              value={inputMaxPrice ?? ""}
              onChange={handleMaxPriceChange}
            />
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
              <label className="flex items-center cursor-pointer text-sm">
                <input
                    type="radio"
                    name="category"
                    value=""
                    checked={inputSelectedCategory === ""}
                    onChange={() => handleCategoryChange("")}
                    // FIX APPLIED: Uses accent-black for the checked state dot
                    className="mr-2 w-4 h-4 border-gray-300 focus:ring-black accent-black"
                />
                All Categories
              </label>
              {categories.map((cat, idx) => (
                <label
                  key={idx}
                  className="flex items-center cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={inputSelectedCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                    // FIX APPLIED: Uses accent-black for the checked state dot
                    className="mr-2 w-4 h-4 border-gray-300 focus:ring-black accent-black"
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => handleKeywordClick(kw)}
                  className={`px-3 py-1 text-sm rounded-full border transition ${
                    inputKeyword === kw
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                  }`}
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {/* Apply & Reset */}
          <button
            onClick={handleApply}
            className="w-full py-2 bg-black text-white rounded mt-5 hover:opacity-90"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="w-full py-2 bg-gray-200 text-gray-800 rounded mt-2 hover:bg-gray-300"
          >
            Reset Filters
          </button>
        </section>
      </aside>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
        />
      )}
    </>
  );
};

export default Sidebar;