import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../component/Card";
// import allProducts from "../assets/allProduct";
import { FaArrowRight } from "react-icons/fa6";
import RelatedProduct from "./RelatedProduct";

const SearchPages = () => {
  const [allProducts, setAllProducts] = useState([]);
  const location = useLocation();
  const { query } = location.state || {}; // Get search query from state
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    fetch("http://localhost:3000/api/products/getproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  }, []);

  // Filter products based on search query
  const filteredProducts = allProducts.filter((item) =>
    query ? item.name.toLowerCase().includes(query.toLowerCase()) : true
  );

  // Extract unique categories from filtered products
  const filteredCategories = [
    ...new Set(filteredProducts.map((item) => item.category)),
  ];

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
              key={item._id} // Changed `key` to use `id` for better performance
              id={item._id}
              title={item.name}
              price={item.price}
              quantity={item.quantity}
              description={item.description}
              category={item.category}
              image={item.imageUrl}
            /> 
          ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found matching your search.
          </p>
        )}
      </div>
      <RelatedProduct currentCategories={filteredCategories} />
    </div>
  );
};

export default SearchPages;
