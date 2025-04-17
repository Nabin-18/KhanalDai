import { ImCross } from "react-icons/im";
import Button from "../component/Button";
import { useContext, useEffect } from "react";
import Context from "../context/Context";

const AddToCart = () => {
  const { removeFromCart, cartItems, setCartItems, calculateTotal } =
    useContext(Context);
  // State to store cart items

  // Fetch cart data from server
  const getCartData = () => {
    fetch(`http://localhost:3000/api/products/getcartdata/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("userToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.cartItems) {
          setCartItems(data.cartItems); // Update cart items from server response
        }
      })
      .catch((err) => console.error("Error fetching cart data:", err));
  };

  // Fetch cart data on component mount
  useEffect(() => {
    getCartData();
  }, []);

  const handlePayment = async () => {
    // Implement payment logic here
    console.log("Payment initiated");
    const response = await fetch("http://localhost:3000/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("userToken"),
      },
      body: JSON.stringify({ amount: calculateTotal() * 100 }),
    });
    const data = await response.json();
    if (!data.paymentUrl) {
      console.error("Error fetching payment URL:", data);
      return;
    }

    window.location.href = data.paymentUrl.payment_url;

    // Handle the response from the payment API
  };

  return (
    <div className="shadow-xl">
      {/* Header Row for medium and large devices */}
      <div className="hidden sm:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-4 justify-between w-[90%] m-auto mt-6 font-semibold lg:w-[80%]">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="m-auto w-[98%] mt-6 lg:w-[80%]" />

      {/* Cart Items */}

      {console.log(cartItems)}
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-col gap-4 p-4 shadow-md rounded-md w-[90%] m-auto mt-4 sm:grid sm:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] sm:gap-2 sm:justify-between sm:items-center sm:shadow-none sm:rounded-none lg:w-[80%]"
        >
          {/* Product Image */}
          <div className="flex items-center gap-4 sm:gap-0">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-[80px] w-[80px] rounded-md"
            />
            <p className="text-sm sm:hidden font-semibold">{item.name}</p>
          </div>

          {/* Product Details for small devices */}
          <div className="flex flex-col gap-2 sm:hidden">
            <div>
              <span className="font-semibold">Title: </span>
              {item.name}
            </div>
            <div>
              <span className="font-semibold">Price: </span>NRS {item.price}
            </div>
            <div>
              <span className="font-semibold">Quantity: </span>
              {item.quantity}
            </div>
            <div>
              <span className="font-semibold">Total: </span>NRS{" "}
              {item.price * item.quantity}
            </div>
          </div>

          {/* Product Details for medium and large devices */}
          <p className="hidden sm:block">{item.name}</p>
          <p className="hidden sm:block">{item.price}</p>
          <p className="hidden sm:block mx-8">{item.quantity}</p>
          <p className="hidden sm:block mx-4">{item.price * item.quantity}</p>

          {/* Remove Button */}
          <ImCross
            onClick={() => {
              console.log("Removing item:", item.productId);
              removeFromCart(item.productId);
            }}
            className="text-red-500 cursor-pointer mx-auto sm:mx-7"
          />
        </div>
      ))}

      <hr className="m-auto w-[98%] mt-6 lg:w-[80%]" />

      {/* Cart Summary */}
      <div className="w-[90%] m-auto bg-gray-200 p-4 flex flex-col items-center gap-4 mt-6 rounded-md lg:w-[30%]">
        <h1 className="text-xl font-semibold text-center">Cart Total</h1>
        <p className="text-lg font-semibold">
          Subtotal: NRS {calculateTotal()}
        </p>
        <p className="text-lg font-semibold">Shipping Fee: NRS 0</p>
        <p className="text-lg font-semibold">Total: NRS {calculateTotal()}</p>
        <Button
          text="Pay Now"
          className="mt-3"
          onClick={() => {
            handlePayment();
            console.log("Payment button clicked");
          }}
        ></Button>
      </div>
    </div>
  );
};

export default AddToCart;
