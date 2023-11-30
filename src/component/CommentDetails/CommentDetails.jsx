import { useParams } from "react-router-dom";
import useComments from "../../hook/useComments";
import { MdReportGmailerrorred } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";


const CommentDetails = () => {
    const axiosSecure = useAxiosSecure()
    const [feedbacks, setFeedbacks] = useState({});
    const [commentFeedback, setCommentFeedback] = useState({})

    const { id } = useParams();
    console.log(id);
    const { comments } = useComments();
    const postAllComments = comments.filter(comment => comment.postId === id);


    const handleFeedback = (e, commentId, postTitle, commenterName, comment) => {
        const updatedFeedbacks = {
            [commentId]: { commentId: commentId, feedback: e.target.value }
        };
        setFeedbacks(updatedFeedbacks);
        const feedback = {
            commentId: commentId, PosterFeedback: e.target.value, postTitle: postTitle, commenterName: commenterName, comment: comment
        };
        setCommentFeedback(feedback);
    };

    console.log(feedbacks);
    console.log(commentFeedback);


    const handleREport = async () => {
        const feedbackRes = await axiosSecure.post('/feedback', commentFeedback);
        console.log(feedbackRes.data);

        if (feedbackRes.data.insertedId) {
            // show success popup
            setFeedbacks({})
            setCommentFeedback({})
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Report Submitted',
                showConfirmButton: false,
                timer: 1500
            });

        }
    }




    return (
        <div>
            <div className="mx-auto text-center md:w-4/12 mb-4">
                <h3 className="text-3xl uppercase font-semibold border-y-4 border-blue-100 py-4 text-blue-900">Total Comment: {postAllComments.length}</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Commenter</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            postAllComments.map((comment, index) => <tr key={comment._id}>
                                <th>{index + 1}</th>
                                <td>{comment.commenterName}</td>
                                {comment.comment.length > 20 ?
                                    <td>
                                        <div className="flex items-center">
                                            <p className="py-4">{comment.comment.slice(0, 20)}</p>
                                            <button className="text-blue-700 font-semibold pl-2" onClick={() => document.getElementById('my_modal_3').showModal()}>read more</button>
                                            <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box ">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <h3 className="font-bold text-lg">Comment</h3>
                                                    <p className="py-4 text">{comment.comment}</p>
                                                </div>
                                            </dialog>
                                        </div>
                                    </td>
                                    :
                                    <td>{comment.comment}</td>
                                }

                                <td>
                                    <select
                                        onChange={(e) => handleFeedback(e, comment._id, comment.postTitle, comment.commenterName, comment.comment)}
                                        className="select select-bordered w-full max-w-xs"
                                    >
                                        <option disabled selected>
                                            Feedback
                                        </option>
                                        <option>Spam</option>
                                        <option>Violence</option>
                                        <option>Harassment</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        onClick={handleREport}
                                        className={`btn btn-sm ${feedbacks[comment._id] ? '' : 'btn-disabled'} bg-blue-200`}
                                        disabled={!feedbacks[comment._id]}
                                    >
                                        Report
                                        <MdReportGmailerrorred className="text-[17px]" />
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

export default CommentDetails;