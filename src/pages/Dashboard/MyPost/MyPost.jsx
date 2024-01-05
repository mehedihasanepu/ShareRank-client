import { FaComment, FaTrashAlt } from "react-icons/fa";
import useUserAllPost from "../../../hook/useUserAllPost";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Link } from "react-router-dom";

const MyPost = () => {
    const { userPosts, refetch } = useUserAllPost();
    const axiosSecure = useAxiosSecure();

    const handleDeletePost = (id) => {
        Swal.fire({
            title: "Are you sure to delete this post?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/post/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your post has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <div className="mx-auto text-center md:w-4/12 mb-3">
                <h3 className="text-xl lg:text-2xl uppercase font-semibold border-y-2 border-blue-100 py-3 text-blue-900">
                    Total Post: {userPosts.length}
                </h3>
            </div>

            <table className="table table-zebra table-responsive-md table-responsive-sm w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Like</th>
                        <th>Dislike</th>
                        <th>Comments</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userPosts.map((post, index) => (
                        <tr key={post._id}>
                            <th>{index + 1}</th>
                            <td>{post.title}</td>
                            <td>{post.upVote}</td>
                            <td>{post.downVote}</td>
                            <td>
                                <Link to={`comments/${post._id}`}>
                                    <button className="btn btn-sm bg-blue-200">
                                       <div className="flex justify-center items-center gap-1">
                                            Comments
                                            <FaComment className="text-[17px]" />
                                       </div>
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeletePost(post._id)}
                                    className="btn btn-sm bg-blue-200"
                                >
                                    <div className="flex justify-center items-center gap-1">

                                    Delete
                                    <FaTrashAlt className="text-[17px]" />
                                    </div>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyPost;
