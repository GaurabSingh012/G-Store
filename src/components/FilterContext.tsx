import { createContext, useContext, useState, type ReactNode } from "react";

// Context interface
interface FilterContextType {
  // Input states
  inputSearchQuery: string;
  setInputSearchQuery: (query: string) => void;
  inputSelectedCategory: string;
  setInputSelectedCategory: (category: string) => void;
  inputMinPrice: number | undefined;
  setInputMinPrice: (price: number | undefined) => void;
  inputMaxPrice: number | undefined;
  setInputMaxPrice: (price: number | undefined) => void;
  inputKeyword: string;
  setInputKeyword: (keyword: string) => void;

  // Live search state (instant search)
  liveSearchQuery: string;
  setLiveSearchQuery: (query: string) => void;

  // Applied states (after Apply button)
  appliedSearchQuery: string;
  appliedSelectedCategory: string;
  appliedMinPrice: number | undefined;
  appliedMaxPrice: number | undefined;
  appliedKeyword: string;

  // Actions
  applyFilters: () => void;
  resetAllFilters: () => void;

  // Helper to select category and apply immediately
  selectCategoryAndApply: (category: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Input states
  const [inputSearchQuery, setInputSearchQuery] = useState('');
  const [inputSelectedCategory, setInputSelectedCategory] = useState('');
  const [inputMinPrice, setInputMinPrice] = useState<number | undefined>(undefined);
  const [inputMaxPrice, setInputMaxPrice] = useState<number | undefined>(undefined);
  const [inputKeyword, setInputKeyword] = useState('');

  // Live search (instant search)
  const [liveSearchQuery, setLiveSearchQuery] = useState('');

  // Applied filters (activated by Apply button)
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [appliedSelectedCategory, setAppliedSelectedCategory] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | undefined>(undefined);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | undefined>(undefined);
  const [appliedKeyword, setAppliedKeyword] = useState('');

  // Apply filters action
  const applyFilters = () => {
    setAppliedSearchQuery(inputSearchQuery);
    setAppliedSelectedCategory(inputSelectedCategory);
    setAppliedMinPrice(inputMinPrice);
    setAppliedMaxPrice(inputMaxPrice);
    setAppliedKeyword(inputKeyword);
  };

  // Reset all filters (both input & applied states)
  const resetAllFilters = () => {
    // Reset input states
    setInputSearchQuery('');
    setInputSelectedCategory('');
    setInputMinPrice(undefined);
    setInputMaxPrice(undefined);
    setInputKeyword('');
    setLiveSearchQuery('');

    // Reset applied states
    setAppliedSearchQuery('');
    setAppliedSelectedCategory('');
    setAppliedMinPrice(undefined);
    setAppliedMaxPrice(undefined);
    setAppliedKeyword('');
  };

  // Helper to select category and apply immediately
  const selectCategoryAndApply = (category: string) => {
    // 1. Update the input state
    setInputSelectedCategory(category);
    // 2. Directly call applyFilters after state is updated. 
    // This is synchronous in React functional components, or you rely on the 
    // next render cycle to use the updated state in applyFilters, which is fine 
    // for this context since the category is applied via radio/select and 
    // doesn't usually require an immediate, blocking update like a price range.
    applyFilters();
  };

  return (
    <FilterContext.Provider value={{
      inputSearchQuery, setInputSearchQuery,
      inputSelectedCategory, setInputSelectedCategory,
      inputMinPrice, setInputMinPrice,
      inputMaxPrice, setInputMaxPrice,
      inputKeyword, setInputKeyword,
      liveSearchQuery, setLiveSearchQuery,
      appliedSearchQuery,
      appliedSelectedCategory,
      appliedMinPrice,
      appliedMaxPrice,
      appliedKeyword,
      applyFilters,
      resetAllFilters,
      selectCategoryAndApply
    }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use FilterContext
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within FilterProvider');
  return context;
};