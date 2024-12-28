import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";


const App = () => {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] shadow-md">
        <Outlet />
      </main>

      
      <Footer />
    </>
  );
};

export default App;
