import { Link } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="  shadow-2xl bg-gray-100 h-screen w-[18%]">
      <div className="flex items-center w-full p-4 flex-col">
        {/* Add Product Link */}
        <div className="flex items-center bg-green-600 p-2 m-4 rounded-md w-full">
          <Link
            to="/addtoproduct"
            className="text-white text-xl font-semibold flex items-center gap-2 w-full"
          >
            <IoAddCircle className="text-2xl hover:text-red-600" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* All Products Link */}
        <div className="flex items-center bg-green-600 p-2 m-4 rounded-md w-full">
          <Link
            to="/allproduct"
            className="text-white text-xl font-semibold flex items-center gap-2 w-full"
          >
            <FaShoppingCart className="text-2xl hover:text-red-600" />
            <span>All Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
