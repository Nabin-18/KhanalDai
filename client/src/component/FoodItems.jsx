import myFoodItems from "../assets/foodItem";

const FoodItems = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 p-8 h-fit m-auto  justify-evenly items-center  md:grid-cols-5 lg:grid-cols-10 ">
        {myFoodItems.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.image}
                className="w-[160px] h-[200px] cursor-pointer object-contain  "
              />
              
            </div>
          );
        })}
      </div>
      <hr className="p-4 " />
    </>
  );
};

export default FoodItems;
