import { createContext, useContext, useState, type ReactNode } from "react";

// Interface including liveSearchQuery
interface FilterContextType {
    // INPUT STATE
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

    // LIVE SEARCH STATE (for instant search in Navbar/Sidebar)
    liveSearchQuery: string;
    setLiveSearchQuery: (query: string) => void;
    
    // APPLIED STATE
    appliedSearchQuery: string;
    appliedSelectedCategory: string;
    appliedMinPrice: number | undefined;
    appliedMaxPrice: number | undefined;
    appliedKeyword: string;
    
    // ACTIONS
    applyFilters: () => void;
    resetAllFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    // INPUT STATES
    const [inputSearchQuery, setInputSearchQuery] = useState('');
    const [inputSelectedCategory, setInputSelectedCategory] = useState('');
    const [inputMinPrice, setInputMinPrice] = useState<number | undefined>(undefined);
    const [inputMaxPrice, setInputMaxPrice] = useState<number | undefined>(undefined);
    const [inputKeyword, setInputKeyword] = useState('');

    // LIVE SEARCH STATE
    const [liveSearchQuery, setLiveSearchQuery] = useState('');

    // APPLIED STATES
    const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
    const [appliedSelectedCategory, setAppliedSelectedCategory] = useState('');
    const [appliedMinPrice, setAppliedMinPrice] = useState<number | undefined>(undefined);
    const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | undefined>(undefined);
    const [appliedKeyword, setAppliedKeyword] = useState('');

    // ACTIONS
    const applyFilters = () => {
        setAppliedSearchQuery(inputSearchQuery);
        setAppliedSelectedCategory(inputSelectedCategory);
        setAppliedMinPrice(inputMinPrice);
        setAppliedMaxPrice(inputMaxPrice);
        setAppliedKeyword(inputKeyword);
    };

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
            resetAllFilters
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilter must be used within FilterProvider');
    return context;
};
