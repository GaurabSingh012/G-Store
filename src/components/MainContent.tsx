import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { LuTally3 } from "react-icons/lu";
import BookCard from "./BookCard";
import productsData from "../data/products.json"; // make sure path is correct

const MainContent = () => {
  const { 
    appliedSelectedCategory, 
    appliedMinPrice, 
    appliedMaxPrice, 
    appliedKeyword,
    liveSearchQuery
  } = useFilter();

  type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    rating: number;
    category: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 15;

  // Load products from local JSON
  useEffect(() => {
    setProducts(productsData);
    setCurrentPage(1);
  }, []);

  const getFilteredProducts = () => {
    let filtered = products;

    if (appliedSelectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === appliedSelectedCategory
      );
    }
    if (appliedMinPrice !== undefined) {
      filtered = filtered.filter((product) => product.price >= appliedMinPrice);
    }
    if (appliedMaxPrice !== undefined) {
      filtered = filtered.filter((product) => product.price <= appliedMaxPrice);
    }

    if (liveSearchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(liveSearchQuery.toLowerCase())
      );
    }

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

  return (
    <section className="w-full pt-[10px] max-w-7xl mx-auto px-4 pb-6 bg-transparent">
      {/* Filter/Sort Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-2">
        <p className="text-sm text-gray-600 mb-2 sm:mb-0 order-2 sm:order-1">
          Showing <span className="font-semibold">{Math.min(totalProducts, currentPage * itemsPerPage)}</span> of <span className="font-semibold">{totalProducts}</span> results
        </p>

        <div className="relative order-1 sm:order-2">
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
              {["All", "Cheap", "Expensive", "Popular"].map((option) => (
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
          paginatedProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image} // updated for local JSON
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
              if (totalPages > 7 && (page < currentPage - 2 || page > currentPage + 2) && page !== 1 && page !== totalPages) {
                return null;
              }
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-full border text-sm flex-shrink-0 ${
                    currentPage === page
                      ? "bg-black text-white shadow-md"
                      : "hover:bg-gray-200"
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
