import { ImCross } from "react-icons/im";
import Button from "../component/Button";
import { useContext } from "react";
import Context from "../context/Context";

const AddToCart = () => {
  const { removeFromCart, cartItems, calculateTotal } = useContext(Context);

  return (
    <div className="shadow-xl">
      <div className=" grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-4 justify-between w-[80%] m-auto  mt-6 font-semibold">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="m-auto w-[98%] divide-red-600  mt-6 lg:w-[80%]" />
      {cartItems.map((item) => (
        <div
          key={item.id}
          className=" grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-2 justify-between w-[80%] m-auto items-center mt-4 p-2 sm:w-[90%] lg:w-[80%]"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-[80px] w-[80px] rounded-md  "
          />
          <p >{item.title}</p>
          <p>{item.price}</p>
          <p className="mx-8">{item.quantity}</p>
          <p className="mx-4">{item.price * item.quantity}</p>
          <ImCross
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 cursor-pointer mx-7"
          />
        </div>
      ))}
      <hr />
      <div className="w-[90%] m-auto bg-gray-200  p-2 flex flex-col items-center gap-2 lg:w-[30%]">
        <h1 className="text-xl font-semibold text-center p-3">Cart total</h1>
        <p className="text-xl font-semibold">
          Subtotal: NRS {calculateTotal()}
        </p>
        <p className="text-xl font-semibold">Shipping fee: NRS 0</p>
        <p className="text-xl font-semibold">Total: NRS {calculateTotal()}</p>
        <Button text="Pay Now" className="mt-3" />
      </div>
    </div>
  );
};

export default AddToCart;
