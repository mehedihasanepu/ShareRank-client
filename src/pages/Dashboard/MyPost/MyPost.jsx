import { FaComment, FaTrashAlt } from "react-icons/fa";
import useUserAllPost from "../../../hook/useUserAllPost";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Link } from "react-router-dom";

const MyPost = () => {

    const { userPosts, refetch } = useUserAllPost()
    const axiosSecure = useAxiosSecure()

    const handleDeletePost = id => {
        Swal.fire({
            title: "Are you sure delete this post?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/post/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <div className="text-center my-4">
                <h2 className="text-3xl">Total Post: {userPosts.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Up Vote</th>
                            <th>Down Vote</th>
                            <th>Comments</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userPosts.map((post, index) => <tr key={post._id}>
                                <th>{index + 1}</th>
                                <td>{post.title}</td>
                                <td>{post.upVote}</td>
                                <td>{post.downVote}</td>
                                <td>
                                    <Link to={`comments/${post._id}`}>

                                        <button
                                            className="btn btn-sm bg-blue-200">
                                            Comments
                                            <FaComment className="text-[17px]"></FaComment>
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeletePost(post._id)}
                                        className="btn btn-sm bg-blue-200">
                                        Delete
                                        <FaTrashAlt className="text-[17px]"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPost;