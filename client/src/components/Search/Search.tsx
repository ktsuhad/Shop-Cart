import { SearchRounded } from "@mui/icons-material";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store/store";
import { product } from "../../interfaces/productinterface";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<product[]>([]);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  const products = useSelector((state: RootState) => state.products.products);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    handleSearch(query);
    setIsResultsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsResultsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="order-3 relative">
      <div className="flex items-center border rounded-full w-full md:w-max px-2 py-1">
        <input
          type="text"
          placeholder="Search Product"
          className="rounded-full outline-none text-base py-1 px-2 w-full md:w-auto"
          value={searchQuery}
          onChange={onSearchChange}
          ref={searchInputRef}
        />
        <SearchRounded className="cursor-pointer" />
      </div>

      {isResultsOpen && (
        <div className="absolute top-10 w-full bg-white border rounded-lg shadow-lg">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="p-2 border-b cursor-pointer hover:bg-gray-100"
              >
                {product.title}
              </div>
            ))
          ) : (
            <div className="p-2 border-b">No products</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
