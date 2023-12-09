import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const ReportedActivities = () => {
    const axiosSecure = useAxiosSecure()

    const { data: feedbacks = [], refetch } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedback');
            return res.data;
        }
    });

    console.log(feedbacks);

    const handleDeletePost = (id, commentId) => {
        Swal.fire({
            title: "Are you sure delete this comment and feedback?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/comment/${commentId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            axiosSecure.delete(`/feedback/${id}`)
                                .then(res => {
                                    if (res.data.deletedCount > 0) {
                                        refetch();
                                        Swal.fire({
                                            title: "Deleted!",
                                            text: "Your comment and feedback has been deleted.",
                                            icon: "success"
                                        });
                                    }
                                })
                        }
                    })

            }
        });
    }


    return (
        <div>
            <div className="mx-auto text-center md:w-4/12 ">
                <h3 className="text-3xl uppercase font-semibold border-y-4 border-blue-100 py-5 text-blue-900">Total Comment: {feedbacks.length}</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Post Title</th>
                            <th>Commenter Name</th>
                            <th>Comment</th>
                            <th>Poster Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            feedbacks.map((feedback, index) => <tr key={feedback._id}>
                                <th>{index + 1}</th>
                                <td>{feedback.postTitle}</td>
                                <td>{feedback.commenterName}</td>
                                {feedback.comment.length > 15 ?
                                    <td>
                                        <div className="flex items-center">
                                            <p className="py-4">{feedback.comment.slice(0, 10)}</p>
                                            <button className="text-blue-700 font-semibold pl-2" onClick={() => document.getElementById('my_modal_3').showModal()}>read more</button>
                                            <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box ">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <h3 className="font-bold text-lg">Comment</h3>
                                                    <p className="py-4 text">{feedback.comment}</p>
                                                </div>
                                            </dialog>
                                        </div>
                                    </td>
                                    :
                                    <td>{feedback.comment}</td>
                                }



                                <td>{feedback.PosterFeedback}</td>

                                <td>
                                    <button
                                        onClick={() => handleDeletePost(feedback._id, feedback.commentId)}
                                        className="btn btn-sm bg-blue-200">
                                        <div className="flex items-center gap-2">
                                            Delete
                                            <FaTrashAlt className="text-[17px]"></FaTrashAlt>
                                        </div>
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

export default ReportedActivities;



