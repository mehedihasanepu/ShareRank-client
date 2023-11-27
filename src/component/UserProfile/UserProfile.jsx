import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";


const UserProfile = () => {

    const { user, logOut } = useAuth()


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
                            <button onClick={handleSingOut} className="form-control btn btn-sm ">
                                <div className="flex items-center">
                                    <p >Sing Out</p>
                                </div>
                            </button>
                        </div>
                    </ul>
                </div>
            }
        </div>
    );
};

export default UserProfile;