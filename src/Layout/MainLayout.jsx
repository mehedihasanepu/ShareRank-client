import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Home/Navbar/Navbar";
import Footer from "../pages/Footer/Footer";

const MainLayout = () => {

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default MainLayout;