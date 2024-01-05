import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";
import { NavLink } from "react-router-dom";
import useAnnouncement from "../../hook/useAnnouncement";
import { IoNotifications } from "react-icons/io5";
import useCurrentUser from "../../hook/useCurrentUser";
const UserProfile = () => {

    const { user, logOut } = useAuth()
    const { announcements } = useAnnouncement()
    const { currentUser } = useCurrentUser()
    console.log(currentUser[0]?.role);


    const handleSingOut = () => {
        logOut()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.error(error);
                toast.success('Sing Out SuccessFull')
            })
    }



    return (
        <div>
            {
                user &&
                <div className="flex items-center gap-2">

                    <div>
                        <a href="#announcement">
                            <div className="indicator py-2">
                                <span className="indicator-item indicator-top indicator-start badge badge-info">{announcements.length}</span>
                                <p><IoNotifications className="text-xl"></IoNotifications></p>
                            </div>
                        </a>
                    </div>

                    <div className="dropdown dropdown-end pr-2">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white opacity-80 rounded-box ">
                            <li>
                                <p>{user.displayName}</p>
                            </li>
                            <li>
                                <p>{user.email}</p>
                            </li>
                            <div >
                                    {

                                        currentUser[0]?.role === "admin" ? (
                                            <li>
                                                <a>
                                                    <NavLink to="/dashboard">
                                                        <button className="btn btn-sm ">Dashboard</button>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        ) : (
                                            <li>
                                                <a>
                                                    <NavLink to="/userProfile">
                                                        <button className="btn btn-sm ">My profile</button>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        )

                                    }

                                <button onClick={handleSingOut} className="form-control btn btn-sm ml-3">
                                    <div className="flex items-center">
                                        <p >Sing Out</p>
                                    </div>
                                </button>
                            </div>

                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserProfile;