import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPages from "../pages/SearchPages";
import Signup from "../pages/SignUp";
import Login from "../pages/Login";
import AddToCart from "../pages/AddToCart";
import ProductDisplay from "../component/ProductDisplay";
import About from "../pages/About";
import Pharmacy from "../pages/Pharmacy";
import PetCare from "../pages/PetCare";
import BabyCare from "../pages/BabyCare";
import Services from "../pages/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchPages />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addtoCart",
        element: <AddToCart />,
      },
      {
        path: "/product/:id",
        element: <ProductDisplay />,
      },
      {
        path: "/pharmacy",
        element: <Pharmacy />,
      },
      {
        path: "/petcare",
        element: <PetCare />,
      },
      {
        path: "/babycare",
        element: <BabyCare />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      }
    ],
  },
]);

export default router;
