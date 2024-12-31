import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AddProduct from "../component/AddProduct";
import Allproduct from "../component/Allproduct";
import EditProduct from "../pages/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is the root route
    children: [
      {
        index: true, // Default child route
        element: <Login />,
      },
      {
        path: "home", // Nested route for Home
        element: <Home />,
      },
      {
        path: "addtoproduct", // Nested route for AddProduct
        element: <AddProduct />,
      },
      {
        path: "allproduct", // Nested route for Allproduct
        element: <Allproduct />,
      },
      {
        path: "editproduct", // Nested route for EditProduct
        element: <EditProduct />,
      },
    ],
  },
]);

export default router;
