import Banner from "../component/Banner";
import ColdDrinks from "../component/ColdDrinks";
import Dairy_Bread_Eggs from "../component/Dairy_Bread_Eggs";
import Fruit_vegetable from "../component/Fruit_vegetalble";
import Grocery from "../component/Grocery";
import PersonalCare from "../component/PersonalCare";

const Home = () => {
  return (
    <>
      <div className="h-full w-full ">
        <Banner />
        <Dairy_Bread_Eggs />
        <Fruit_vegetable />
        <ColdDrinks />
        <Grocery /> 
        <PersonalCare />
      </div>
    </>
  );
};

export default Home;
