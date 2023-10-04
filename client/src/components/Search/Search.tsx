import { SearchRounded } from "@mui/icons-material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getserchSuggestion } from "../../api/ProductApi/productApi";
import { product } from "../../interfaces/productinterface";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const debounceSearch = useRef(
    debounce(async (newQuery: string) => {
      setIsLoading(true); // Show "Searching..." message
      if (newQuery.trim() === "") {
        // No query, hide suggestions
        setSuggestions([]);
        setShowSuggestions(false);
        setIsLoading(false);
        return;
      }

      try {
        const data = await getserchSuggestion(newQuery);
        setSuggestions(data);
        setShowSuggestions(true); // Show suggestions
        setSelectedSuggestionIndex(-1); // Reset selected suggestion
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the search component, close suggestions
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Call the debounced search function
    debounceSearch(newQuery);
  };

  const handleSuggestionClick = (productId: string) => {
    // Navigate to the product detail page when a suggestion is clicked
    navigate(`/product-details/${productId}`);
    setShowSuggestions(false); // Hide suggestions after clicking
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : -1
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      // Navigate to the selected suggestion on Enter
      handleSuggestionClick(suggestions[selectedSuggestionIndex]._id);
    }
  };

  const handleSuggestionHover = useCallback(
    (index: number) => {
      setSelectedSuggestionIndex(index);
    },
    [setSelectedSuggestionIndex]
  );

  return (
    <div className="order-3 relative" ref={searchInputRef}>
      <div className="flex items-center border rounded-full w-full md:w-max px-2 py-1">
        <input
          type="text"
          placeholder="Search Product"
          className="rounded-full outline-none text-base py-1 px-2 w-full md:w-auto"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <SearchRounded className="cursor-pointer" />
      </div>

      {showSuggestions && (
        <div className="absolute top-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {isLoading ? (
            <div className="p-2">Searching...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((product, index) => (
              <div
                key={product._id}
                onClick={() => handleSuggestionClick(product._id)}
                onMouseEnter={() => handleSuggestionHover(index)}
                className={`p-2 border-b cursor-pointer hover:bg-gray-100 flex items-center ${
                  index === selectedSuggestionIndex ? "bg-gray-100" : ""
                }`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-10 h-10 object-cover rounded-full mr-2"
                />
                {product.title}
              </div>
            ))
          ) : (
            <div className="p-2">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;


function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
