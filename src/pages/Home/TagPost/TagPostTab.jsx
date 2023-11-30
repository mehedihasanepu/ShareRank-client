/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const TagPostTab = ({ tags }) => {
    return (
        <div className='grid grid-cols-3 gap-10 mt-10'>
            {

                tags.map(post => <div key={post._id}>
                    <Link to={`/post/${post._id}`}>
                        <div className="max-w-screen-lg mx-auto bg-base-100 p-7 rounded-lg shadow-xl">
                            <div className="flex gap-5">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src={post.authorImage} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-start">{post.authorName}</h2>
                                    <p>{post.postTime.slice(11, 19)} / {post.postTime.slice(0, 10)}</p>
                                </div>
                            </div>
                            <div className="pt-5">
                                <h3 className="text-[17px] font-semibold">{post.title}</h3>
                                <p className="text-sm">#{post.tag}</p>
                            </div>
                            <div className="pt-5 flex justify-between">
                                <div className="flex gap-4">
                                    <p className="">{post.upVote} Up vote</p>
                                    <p className="">{post.downVote} Down vote</p>
                                </div>
                                <p className="">{post?.comment ? post.comment : 0} Comment</p>
                            </div>
                        </div>
                    </Link>
                </div>

                )
            }
        </div>
    );
};

export default TagPostTab;