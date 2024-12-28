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
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
        
      },
      {
        path: "/addtoproduct",
        element: <AddProduct />,
      },
      {
        path: "/allproduct",
        element: <Allproduct />,
      },
      {
        path: "/editproduct",
        element: <EditProduct />,
      }
    ],
  },
]);
export default router;
