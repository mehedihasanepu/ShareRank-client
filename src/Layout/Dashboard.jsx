import { FaBullhorn,  FaColumns,  FaHome,  FaRegChartBar, FaUser, FaUserFriends, FaUsers, } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useAuth from "../hook/useAuth";


const Dashboard = () => {
    const { user } = useAuth()


    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    return (

        <div className="flex">
            {/* dashboard side bar */}

            
            <div className="w-64 min-h-screen bg-[#c2edffe7]">
                <div className="bg-[#9fe2ffe7] p-3">
                    {
                        user &&
                        <div className="flex flex-col ">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-16 rounded-full">
                                    <img src={user.photoURL} />
                                </div>
                            </label>
                            <div className="font-semibold">
                                <p>{user.displayName}</p>
                                <p>{user.email}</p>
                            </div>

                        </div>
                    }
                </div>
                <ul className="menu p-4">

                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                    <FaUser></FaUser>
                                    Admin Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUser">
                                    <FaUsers></FaUsers>
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/activities">
                                    <FaRegChartBar></FaRegChartBar>
                                    Activities</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAnnouncement">
                                    <FaBullhorn></FaBullhorn>
                                    Make Announcement</NavLink>
                            </li>

                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userProfile">
                                        <FaUser></FaUser>
                                        My profile</NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/addPost">
                                        <FaColumns></FaColumns>
                                        Add Post</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myPost">
                                        <FaUserFriends></FaUserFriends>
                                        My Posts
                                        {/* ({cart.length}) */}
                                    </NavLink>
                                </li>
                              
                            </>
                    }

                    {/* shared nav links */}

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/membership">
                            <FaUsers></FaUsers>
                            Membership</NavLink>
                    </li>
                </ul>
            </div>


            {/* dashboard content */}
            <div className="flex-1 p-8 pl:0 lg:pl-28">
                <Outlet></Outlet>
            </div>
        </div>

    );
};

export default Dashboard;
