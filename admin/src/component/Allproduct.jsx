import { ImCross } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const Allproduct = () => {
  return (
    <div className="shadow-xl w-[100vw] ">
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 justify-between w-[80%] m-auto mt-6 font-semibold">
        <p>Product</p>
        <p>Title</p>
        <p>Category</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <hr className="m-auto w-[80%] divide-red-600  mt-6  " />
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 justify-between w-[80%] m-auto items-center mt-4">
        <div>
          <img
            src="admin.png"
            className="h-[80px] w-[80px] border rounded-md"
          />
        </div>
        <div>
          <h1>Apple</h1>
        </div>
        <div>
          <h1>Bakery</h1>
        </div>
        <div>
          <p>NRS 100</p>
        </div>
        <div>
          <p>2 piece</p>
        </div>
        <div>
          <p>NRS 200</p>
        </div>
        <Link to='/editproduct'>
        <div>
          <button className="flex gap-2 items-center border-2 p-2 rounded-md font-semibold bg-green-300 hover:bg-red-500">
            {" "}
            <AiFillEdit className="text-blue-500 hover:text-red-500 cursor-pointer" />
            Edit
          </button>{" "}
        </div>
        </Link>
        <div className="mx-9">
          <ImCross className="text-green-500 hover:text-red-500 cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 justify-between w-[80%] m-auto items-center mt-4">
        <div>
          <img
            src="admin.png"
            className="h-[80px] w-[80px] border rounded-md"
          />
        </div>
        <div>
          <h1>Apple</h1>
        </div>
        <div>
          <h1>Bakery</h1>
        </div>
        <div>
          <p>NRS 100</p>
        </div>
        <div>
          <p>2 piece</p>
        </div>
        <div>
          <p>NRS 200</p>
        </div>
        <Link to='/editproduct'>
        <div>
          <button className="flex gap-2 items-center border-2 p-2 rounded-md font-semibold bg-green-300 hover:bg-red-500">
            {" "}
            <AiFillEdit className="text-blue-500 hover:text-red-500 cursor-pointer" />
            Edit
          </button>{" "}
        </div>
        </Link>
        <div className="mx-9">
          <ImCross className="text-green-500 hover:text-red-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Allproduct;
