import { useEffect, useState, useRef } from "react";
import { useFilter } from "./FilterContext";
import { LuTally3 } from "react-icons/lu";
import BookCard from "./BookCard";
import productsData from "../data/products.json";

const MainContent = () => {
  const { 
    appliedSearchQuery, // <-- Added appliedSearchQuery
    appliedSelectedCategory, 
    appliedMinPrice, 
    appliedMaxPrice, 
    appliedKeyword, // <-- Added appliedKeyword
    liveSearchQuery
  } = useFilter();

  type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    rating: number;
    category: string;
    // Assuming product data has a description or tags field for keyword filtering
    description?: string; 
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 15;

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load products from local JSON
  useEffect(() => {
    // Assuming products.json has correct structure
    setProducts(productsData as Product[]);
    setCurrentPage(1);
  }, []);

  const getFilteredProducts = () => {
    let filtered = products;

    // 1. Applied Category Filter (from Sidebar radio buttons)
    if (appliedSelectedCategory && appliedSelectedCategory.trim() !== "") {
      const categoryFilter = appliedSelectedCategory.trim().toLowerCase();
      filtered = filtered.filter(p => p.category.toLowerCase() === categoryFilter);
    }

    // 2. Applied Price Range Filters
    if (appliedMinPrice !== undefined && !isNaN(appliedMinPrice)) {
      filtered = filtered.filter(p => p.price >= appliedMinPrice);
    }

    if (appliedMaxPrice !== undefined && !isNaN(appliedMaxPrice)) {
      filtered = filtered.filter(p => p.price <= appliedMaxPrice);
    }

    // 3. Applied Search Query Filter (from main search bar, after 'Apply')
    if (appliedSearchQuery && appliedSearchQuery.trim() !== "") {
        const search = appliedSearchQuery.trim().toLowerCase();
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search)
        );
    }

    // 4. Applied Keyword Filter (from Sidebar keyword buttons, after 'Apply')
    if (appliedKeyword && appliedKeyword.trim() !== "") {
        const keyword = appliedKeyword.trim().toLowerCase();
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(keyword) ||
            p.category.toLowerCase().includes(keyword) ||
            (p.description && p.description.toLowerCase().includes(keyword)) // Check description if available
        );
    }

    // 5. Live Search Query (Instant Search - runs *on top of* applied filters)
    if (liveSearchQuery && liveSearchQuery.trim() !== "") {
      const search = liveSearchQuery.trim().toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    }

    // 6. Sorting
    switch (filter) {
      case "expensive":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "cheap":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "popular":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const filteredProducts = getFilteredProducts();
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset page when filters change (using a derived state is simple for this)
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedSearchQuery, appliedSelectedCategory, appliedMinPrice, appliedMaxPrice, appliedKeyword, liveSearchQuery, filter]);


  return (
    <section className="w-full pt-[10px] max-w-7xl mx-auto px-4 pb-6 bg-transparent">
      {/* Filter/Sort Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-2">
        <p className="text-sm text-gray-600 mb-2 sm:mb-0 order-2 sm:order-1">
          Showing <span className="font-semibold">{Math.min(totalProducts, currentPage * itemsPerPage)}</span> of <span className="font-semibold">{totalProducts}</span> results
        </p>

        <div className="relative order-1 sm:order-2" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="border px-4 py-2 rounded-full flex items-center gap-2 text-sm bg-gray-50 hover:bg-gray-100 transition"
            title="Toggle Sort Options"
          >
            <LuTally3 className="text-lg" />
            Sort By: <span className="font-semibold">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 bg-white border rounded mt-2 w-40 z-10 shadow-xl">
              {["All", "Cheap", "Expensive", "Popular"].map(option => (
                <button
                  key={option}
                  onClick={() => {
                    setFilter(option.toLowerCase());
                    setDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 w-full text-left text-sm hover:bg-gray-100 ${filter === option.toLowerCase() ? 'bg-gray-100 font-medium' : ''}`}
                >
                  {option === 'All' ? 'Default' : option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-xl text-gray-500 py-10">
            No products found matching your criteria.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center flex-wrap gap-2 sm:gap-4 mt-8">
          <button
            className="border px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm hover:bg-gray-100 transition disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="flex gap-1 sm:gap-2 overflow-x-auto max-w-full">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (totalPages > 7 && (page < currentPage - 2 || page > currentPage + 2) && page !== 1 && page !== totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-full border text-sm flex-shrink-0 ${
                    currentPage === page ? "bg-black text-white shadow-md" : "hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            className="border px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm hover:bg-gray-100 transition disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default MainContent;