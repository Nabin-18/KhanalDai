import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiKickLine } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import Context from "../context/Context";
import Button from "./Button";
import Search from "./Search";

const Header = () => {
  const { cartItems, isLoggedIn, logout } = useContext(Context);

  // Calculate the total number of items in the cart
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="h-fit shadow-md md:flex justify-between items-center px-4 sm:h-fit m-auto md:h-fit lg:h-[80px]">
      {/* Logo Section */}
      <div className="flex items-center mx-4 p-2 sm:justify-center">
        <Link to="/">
          <h1 className="text-3xl font-bold text-yellow-400 flex">
            <span className="flex items-center">
              <RiKickLine className="text-4xl text-green-500" />
            </span>{" "}
            hanal <span className="text-green-500">Dai</span>
          </h1>
        </Link>
      </div>

      {/* Search Section */}
      <div className="flex items-center w-full">
        <Search />
      </div>

      {/* Buttons Section */}
      <div className="flex gap-4 mx-6 m-auto p-4 items-center justify-center">
        {/* Conditional Button: Show "SignUp" if not logged in, "LogOut" if logged in */}
        {!isLoggedIn ? (
          <Link to="/signup">
            <Button text="SignUp" />
          </Link>
        ) : (
          <button onClick={logout}>
            <Button text="LogOut" />
          </button>
        )}

        <div className="flex items-center relative">
          <Link to="/addtoCart">
            <Button icon={<IoMdCart className="text-2xl " />} text="Cart" />
          </Link>
          <span className="bg-red-600 text-white font-serif font-semibold rounded-full h-6 w-6 text-center absolute right-0 top-[-8px]">
            {totalCartItems}
            {/* Display the total number of items in the cart */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
