import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Home/Navbar/Navbar";

const MainLayout = () => {

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default MainLayout;