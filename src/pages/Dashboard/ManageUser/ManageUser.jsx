import { FaUsers } from "react-icons/fa";
import useAllUser from "../../../hook/useAllUser";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";




const ManageUser = () => {
    const axiosSecure = useAxiosSecure()

    const [searchText, setSearchText] = useState('');

    const { users, refetch } = useAllUser(searchText)

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }






    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="join border border-stone-300">
                <div>
                    <div>
                        <input
                            className="input input-bordered join-item"
                            placeholder="Search username"
                            value={searchText}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="indicator">
                    <button className="btn join-item bg-stone-200">
                        Search
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-sm bg-blue-200">
                                        Make Admin
                                        <FaUsers className=" 
                                        text-lg"></FaUsers>
                                    </button>}
                                </td>
                                <td>
                                    <h3 className="uppercase font-semibold text-blue-900">

                                        {user.badge}
                                    </h3>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;