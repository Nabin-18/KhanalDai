import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate("/search", { state: { query: searchText } });
    }
    setSearchText("");//clear the search text after search
  };

  return (
    <div className="flex items-center border-2 w-[400px] m-auto border-yellow-200 rounded-md">
      <div className="flex items-center gap-2 px-4 w-full">
        <FaSearch
          className="text-lg sm:text-xl cursor-pointer"
          onClick={handleSearch}
        />
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="h-10 w-full outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>
    </div>
  );
};

export default Search;
