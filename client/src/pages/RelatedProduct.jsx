import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Card from "../component/Card";
// import allProducts from "../assets/allProduct";

const RelatedProduct = ({ currentCategories }) => {
  const [visibleItems, setVisibleItems] = useState(5);

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

  // Filter products by the current categories
  const relatedProducts = allProducts.filter((item) =>
    currentCategories.includes(item.category)
  );

  // Function to handle "See More" click
  const handleSeeMore = () => {
    setVisibleItems(relatedProducts.length);
  };

  return (
    <div className="w-[90%] m-auto h-fit">
      <div className="flex justify-between p-4">
        <h1 className="font-semibold text-xl mx-4">Related Products</h1>
        {visibleItems < relatedProducts.length && (
          <h2
            className="text-green-500 flex items-center gap-2 cursor-pointer"
            onClick={handleSeeMore}
          >
            See more <FaArrowRight />
          </h2>
        )}
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {relatedProducts.slice(0, visibleItems).map((item) => (
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
      </div>
    </div>
  );
};

export default RelatedProduct;
