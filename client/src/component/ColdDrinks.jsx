import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Card from "./Card";

const ColdDrinks = () => {
  const [visibleItems, setVisibleItems] = useState(5); // Initial number of items to show

  const [allProducts, setAllProducts] = useState([]);

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

  // Function to handle "See More" click
  const handleSeeMore = () => {
    setVisibleItems(
      allProducts.filter((item) => item.category === "drinks").length
    );
  };

  return (
    <div className="w-[90%] m-auto  h-fit">
      <div className="flex justify-between p-4 ">
        <h1 className="font-semibold text-xl mx-4">Cold Drinks, Juice</h1>
        {visibleItems <
          allProducts.filter((item) => item.category === "drinks").length && (
          <h2
            className="text-green-500 flex items-center gap-2 cursor-pointer"
            onClick={handleSeeMore}
          >
            See more <FaArrowRight />
          </h2>
        )}
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {allProducts
          .filter((item) => item.category === "drinks")
          .slice(0, visibleItems) // Show only the items up to `visibleItems`
          .map((item) => {
            console.log({ id: item._id });
            return (
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
            );
          })}
      </div>
    </div>
  );
};

export default ColdDrinks;
