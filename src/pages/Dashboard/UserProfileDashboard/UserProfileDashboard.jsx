
import Loading from "../../../component/Loading/Loading";
import useCurrentUser from "../../../hook/useCurrentUser";
import useUserAllPost from "../../../hook/useUserAllPost";

const UserProfileDashboard = () => {
    const { currentUser, isLoading } = useCurrentUser();
    const { userPosts } = useUserAllPost()

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(currentUser[0]);

    const { email: userEmail, name, image, badge } = currentUser[0];

    const slicePost = userPosts.slice(0, 3)
    console.log(slicePost);




    return (

        <div>
            <div className="flex justify-center ">
                <div className=" py-10">

                    <div className="flex justify-center">
                        <img className="w-28 h-28 rounded-full" src={image} />
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold ">{name}</h2>
                        <h2 className="font-semibold ">{userEmail}</h2>
                        <h3 className="text-2xl font-semibold">Badge: {badge}</h3>
                    </div>

                </div>
            </div>

            <div className="flex flex-col gap-5">
                {
                    slicePost.map(post => <div key={post._id} className="max-w-screen-md mx-auto bg-base-100 p-7 rounded-lg shadow-xl">
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
                        <p className="pt-5">{post.descriptions.slice(0, 150)}</p>
                        <div className="pt-5 flex justify-between">
                            <div className="flex gap-4">
                                <p className="">{post.upVote} Up vote</p>
                                <p className="">{post.downVote} Down vote</p>
                            </div>
                            <p className="">{post?.comment ? post.comment : 0} Comment</p>
                        </div>
                    </div>)
                }
            </div>
        </div>


    )
};

export default UserProfileDashboard;