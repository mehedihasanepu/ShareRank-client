import { useState, useEffect } from "react";
import useAllSortPost from "../../../hook/useAllSortPost";
import useAllPost from "../../../hook/useAllPost";
import { Link } from "react-router-dom";
import Loading from "../../../component/Loading/Loading";

const Banner = () => {
    const [searchText, setSearchText] = useState('');
    const [upVote, setUpVote] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const { posts} = useAllPost();
    const { sortedPost, isLoading } = useAllSortPost(upVote, searchText, currentPage);


    useEffect(() => {
        setTotalPosts(posts.length);
    }, [posts]);

    if (isLoading) {
        return <Loading></Loading>
    }

    const itemsPerPage = 5;
    const totalPages = Math.ceil(totalPosts / itemsPerPage);


    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        console.log('Search Text:', searchText);
    };


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };






    return (
        <div >
            <div className="max-w-screen-xl mx-auto ">
                <div className="min-h-[400px] bg-blue-100 p-10 rounded-2xl text-center">
                    <div className="space-y-3 py-5">
                        <h3 className="text-2xl lg:text-4xl font-bold">Welcome to ShareRank</h3>
                        <p className="md:text-base lg:text-xl text-gray-600">Where Every Voice Matters! <br /> Share, Discuss, and Vote on Engaging Posts from a Diverse Community.</p>
                        <p className="text-base  text-gray-600">Join the Conversation and Shape the Narrative!</p>
                        <div>
                            <div className="join border border-stone-300">
                                <div>
                                    <div>
                                        <input
                                            className="input input-bordered join-item"
                                            placeholder="Search keyword"
                                            value={searchText}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="indicator">
                                    <button className="btn join-item bg-stone-200" onClick={handleSearch}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <h1 className="text-4xl font-semibold text-center my-5 text-blue-950">All Post</h1>
                <div className="flex justify-end">
                    <button onClick={() => setUpVote(!upVote)} className="btn"> Sort by Popularity</button>
                </div>
                <div className="grid grid-cols-2 gap-10 mx-20 ">
                    {
                        sortedPost.map(post => <div key={post._id}>
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
                <div className="flex justify-center mt-5">
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber + 1)}
                            className={`mx-1 px-3 py-1 border rounded ${currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : ''
                                }`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;