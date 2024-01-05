import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css"
import UserProfile from "../../../component/UserProfile/UserProfile";
import useAuth from "../../../hook/useAuth";

import logo from "../../../assets/image/Logo.png"

const Navbar = () => {

    const { user } = useAuth()
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };



    return (
        <div >
            <div className="max-w-screen-xl mx-auto mb-5 py-3 bg-blue-50 rounded-b-2xl">
                <div className="flex flex-row items-center md:px-5 justify-between">

                    <Link to='/'>
                        <img className="w-[160px] h-[65px]" src={logo} alt="" />

                    </Link>
                    <div className="lg:hidden flex">
                        {
                            user ? <UserProfile></UserProfile> : null
                        }
                        <div className=" dropdown flex-row-reverse">
                            <label tabIndex={0} className="px-1">

                                <label className="btn btn-circle swap swap-rotate" onClick={handleDropdownToggle}>

                                    <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                                </label>
                            </label>

                            {isDropdownOpen && (
                                <ul tabIndex={0} className="menu dropdown-content w-48 mt-3 gap-3 z-[2] p-2 shadow relative right-1  bg-white bg-opacity-90 rounded-box flex-row-reverse">
                                    <li>
                                        <a >
                                            <NavLink to="/">Home</NavLink>
                                        </a >
                                    </li>
                                    <li>
                                        <a>
                                            <NavLink to="/membership">Membership</NavLink>
                                        </a>
                                    </li>




                                    {
                                        user ? null :
                                            <>
                                                <NavLink className="lg:hidden text-lg font-semibold p-2 px-4 rounded-lg lg:mr-10" to="/login">Login</NavLink>
                                            </>
                                    }
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className=" hidden lg:flex text-center lg:items-center">
                        <ul className=" menu-horizontal gap-2 mr-5">
                            <li>
                                <a >
                                    <NavLink className="text-center px-2 py-[5px] bg-gray-100 rounded-md" to="/">Home</NavLink>
                                </a >
                            </li>

                            <li>
                                <a>
                                    <NavLink className="text-center px-2 py-[5px] bg-gray-100 rounded-md" to="/addPost">Add Post</NavLink>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <NavLink className="text-center px-2 py-[5px] bg-gray-100 rounded-md" to="/myPost">My Posts</NavLink>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <NavLink className="text-center px-2 py-[5px] bg-gray-100 rounded-md" to="/membership">Membership</NavLink>
                                </a>
                            </li>





                        </ul>
                        {
                            user ? <UserProfile></UserProfile> : null
                        }
                        {
                            user ? null :
                                <div className="space-x-2">
                                    <Link className="btn btn-sm" to="/login">
                                        <div className=" flex items-center">
                                            <button className=" text-lg">Join Us</button>
                                        </div>
                                    </Link>
                                </div >
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;