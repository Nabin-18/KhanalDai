import { Link } from "react-router-dom";

const Card = ({ title, price, description, category, image, id }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="flex flex-col border p-4 shadow-lg gap-3 cursor-pointer group ">
        <div className="flex items-center m-auto">
          <img
            src={image}
            className="object-cover transition-transform duration-300 group-hover:scale-110 h-[200px] w-[200px]  rounded-md lg:h-[180px] md:h-[200px] "
          />
        </div>

        <div className="  text-center">
          <h1 className="font-semibold">{title} </h1>
        </div>

        <div>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold ">NRS {price} </p>
          <button className="text-green-400 border-green-300 border p-2 rounded-md bg-green-50 w-[40%]">
            add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
