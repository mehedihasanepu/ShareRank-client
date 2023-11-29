import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import useAllPost from "../../hook/useAllPost";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import useComments from "../../hook/useComments";
import useAxiosPublic from "../../hook/useAxiosPublic";

const PostDetails = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [commentText, setCommentText] = useState('');

    const { posts, isLoading, refetch: allPostRefetch } = useAllPost();
    const { comments, refetch } = useComments()

    const { id } = useParams()
    if (isLoading) {
        return <Loading></Loading>
    }
    const postDetails = posts.find(post => post._id === id)
    console.log(postDetails);
    const { _id, authorEmail, authorImage, authorName, descriptions, downVote, postTime, tag, title, upVote } = postDetails


    if (isLoading) {
        return <Loading></Loading>
    }
    const commentDetails = comments.filter(comment => comment.postTitle === title)
    console.log(commentDetails.length);



    const handleUpVote = async () => {
        try {

            const newUpVote = upVote + 1;
            const newDownVote = downVote;

            const updateVote = { newUpVote, newDownVote };
            console.log(updateVote);

            const res = await axiosPublic.patch(`/post/${_id}`, updateVote);
            console.log(res.data);

            if (res.data.modifiedCount > 0) {
                toast.success('Up Vote');
                allPostRefetch();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error occurred while upvoting');
        }
    };




    const handleDownVote = async () => {
        try {
            const newUpVote = upVote;
            const newDownVote = downVote + 1;
            const updateVote = { newUpVote, newDownVote };
            console.log(updateVote);

            const res = await axiosPublic.patch(`/post/${_id}`, updateVote);
            console.log(res.data);

            if (res.data.modifiedCount > 0) {
                toast.success('Down Vote');
                allPostRefetch();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error occurred while upvoting');
        }
    };





    const handleCommentText = (e) => {
        setCommentText(e.target.value);

    };

    const commentInfo = {
        postTitle: title,
        commenterEmail: authorEmail,
        commenterName: authorName,
        comment: commentText


    }

    const handleComment = (e) => {
        e.preventDefault();
        axiosSecure.post('/comment', commentInfo)
            .then(res => {
                if (res.data.insertedId) {
                    console.log('user added to the database');

                    toast.success('comment successfully')
                    setCommentText('');
                    refetch()

                }
            })
        setCommentText('');


    };



    return (
        <div className="max-w-screen-lg mx-auto py-10 px-5 md:px-0">
            <div className="card  bg-base-100 shadow-xl" data-aos="fade-up"
                data-aos-anchor-placement="top-bottom">

                <div className=" max-w-xl md:max-w-2xl mx-auto ">

                    <div className="py-10">
                        <div className="flex gap-5">
                            <div className="avatar online">
                                <div className="w-16 rounded-full">
                                    <img src={authorImage} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-start">{authorName}</h2>
                                <p>{postTime.slice(11, 19)} / {postTime.slice(0, 10)}</p>
                            </div>
                        </div>
                        <hr className="mt-4" />
                        <div className="pt-5">
                            <h3 className="text-2xl font-semibold">{title}</h3>
                            <p className="text-sm">#{tag}</p>
                        </div>


                        <div className="pt-5">
                            <p>{descriptions}</p>
                        </div>



                        <div className="pt-5 flex justify-between items-center">
                            <div className="flex gap-4">
                                <div className="flex gap-2 items-center">
                                    <p className="text-lg">{upVote}</p>
                                    <button onClick={handleUpVote} className="btn btn-sm">Up Vote</button>
                                </div>
                                <div className="flex gap-2 items-center ml-3">
                                    <p className="text-lg">{downVote}</p>
                                    <button onClick={handleDownVote} className="btn btn-sm">Down vote</button>
                                </div>
                            </div>
                            <p className="">{commentDetails.length ? commentDetails.length : 0} Comment</p>
                            <button className="btn">Share</button>
                        </div>


                        {/* comment field  */}
                        <div className="flex justify-center mt-5">
                            <form onSubmit={handleComment}>
                                <textarea
                                    className=" w-96 border-gray-300 border-2 p-3 rounded-md shadow-sm "
                                    rows="4"
                                    placeholder="Leave a comment"
                                    value={commentText}
                                    onChange={handleCommentText}
                                />
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="btn px-4 py-2 text-sm font-medium  bg-blue-300"
                                    >
                                        Comment
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default PostDetails;




