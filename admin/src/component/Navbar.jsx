import { Link } from "react-router-dom";
import { RiKickLine } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

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

      {/* Profile Section */}
      <div className="relative flex flex-col items-center justify-center p-2 lg:m-12">
        <img
          src="admin.png"
          alt="Nabin"
          className="h-16 w-16 rounded-full cursor-pointer hover:scale-110 transform transition duration-500 ease-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        {isHovered && (
          <span className="absolute top-20 text-sm font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow-lg">
            Nabin
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
