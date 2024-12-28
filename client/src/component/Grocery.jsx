import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Card from "./Card";
import allProducts from "../assets/allProduct";

const Grocery = () => {
  const [visibleItems, setVisibleItems] = useState(5); // Initial number of items to show

  // Function to handle "See More" click
  const handleSeeMore = () => {
    setVisibleItems(allProducts.filter((item) => item.category === "grocery").length);
  };

  return (
    <div className="w-[90%] m-auto  h-fit">
      <div className="flex justify-between p-4 ">
        <h1 className="font-semibold text-xl mx-4">Grocery Product</h1>
        {visibleItems < allProducts.filter((item) => item.category === "drinks").length && (
          <h2
            className="text-green-500 flex items-center gap-2 cursor-pointer"
            onClick={handleSeeMore}
          >
            See more <FaArrowRight />
          </h2>
        )}
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {allProducts
          .filter((item) => item.category === "grocery")
          .slice(0, visibleItems) // Show only the items up to `visibleItems`
          .map((item) => {
            return (
              <Card
                key={item.id} // Changed `key` to use `id` for better performance
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Grocery;
