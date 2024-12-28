import FoodItems from "./FoodItems";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex m-auto flex-col ">
      
      <div className="flex gap-4 p-8 h-fit flex-wrap w-[100%] justify-evenly items-center   ">
        <div>
          <Link to='/pharmacy'>
          <img
            src="./card1.jpg"
            className="w-[420px] h-[200px] cursor-pointer"
          />
          </Link>
        </div>
        <div>
          <Link to='/petcare'>
          <img
            src="./card2.jpg"
            className="w-[420px] h-[200px] cursor-pointer"
          />
          </Link>
        </div>
        <div>
          <Link to='/babycare'>
          <img
            src="./card3.jpg"
            className="w-[420px] h-[200px] cursor-pointer"
          />
          </Link>
        </div>
      </div>
      <hr />
      <FoodItems />
    </div>
  );
};

export default Banner;
