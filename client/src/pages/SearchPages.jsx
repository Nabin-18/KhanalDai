import { useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../component/Card";
import allProducts from "../assets/allProduct";
import { FaArrowRight } from "react-icons/fa6";

const SearchPages = () => {
  const location = useLocation();
  const { query } = location.state || {}; // Get search query from state
  const [visibleItems, setVisibleItems] = useState(5);

  // Filter products based on search query
  const filteredProducts = allProducts.filter((item) =>
    query ? item.title.toLowerCase().includes(query.toLowerCase()) : true
  );

  const handleSeeMore = () => {
    setVisibleItems(filteredProducts.length);
  };

  return (
    <div className="w-[90%] m-auto h-fit">
      <div className="p-4 flex justify-between items-center">
        <h1 className="font-semibold text-xl mx-4">
          {query ? `Results for "${query}"` : "All Products"}
        </h1>
        <div className="flex justify-between p-4">
          {visibleItems < filteredProducts.length && (
            <h2
              className="text-green-500 flex items-center gap-2 cursor-pointer"
              onClick={handleSeeMore}
            >
              See more <FaArrowRight />
            </h2>
          )}
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {filteredProducts
          .slice(0, visibleItems) // Show only items up to `visibleItems`
          .map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
            />
          ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPages;
