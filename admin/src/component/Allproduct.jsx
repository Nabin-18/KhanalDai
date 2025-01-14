import { ImCross } from "react-icons/im";
import { useState, useEffect } from "react";

const AllProduct = () => {
  // Getting the data from the database
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products/getproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  // Delete product from the database
  const deleteProduct = (id) => {
    fetch(`http://localhost:3000/api/products/deleteproduct/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Updating the UI after deleting the product
        setProducts(products.filter((product) => product._id !== id));
      });
  };

  return (
    <div className="shadow-xl w-[100vw] ">
      {/* Table Header */}
      <div className="grid lg:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 justify-between w-[80%] m-auto mt-6 font-semibold">
        <p>Product</p>
        <p>Title</p>
        <p>Category</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      <hr className="m-auto w-[80%] divide-red-600 mt-6" />

      {/* Displaying Products */}
      <div className="w-[80%] m-auto mt-4">
        {products.map((product) => (
          <div
            key={product._id} // Assuming _id is unique for each product
            className="grid sm:grid-cols-3 lg:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-2 justify-between items-center mt-4"
          >
            <div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-[80px] w-[80px] border rounded-md"
              />
            </div>

            <div>
              <h1>{product.name}</h1>
            </div>
            <div>
              <h1>{product.category}</h1>
            </div>
            <div>
              <p>NRS {product.price}</p>
            </div>

            {/* Delete Icon */}
            <div
              onClick={() => deleteProduct(product._id)}
              className="mx-9 cursor-pointer"
            >
              <ImCross className="text-green-500 hover:text-red-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
