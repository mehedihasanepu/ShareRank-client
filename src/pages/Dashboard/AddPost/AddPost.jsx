import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import Select from 'react-select'
import { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useCurrentUser from "../../../hook/useCurrentUser";
import useUserAllPost from "../../../hook/useUserAllPost";
import { Link } from "react-router-dom";
import useTags from "../../../hook/useTags";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const AddPost = () => {
    const { register, handleSubmit, reset } = useForm();
    const [tag, setTag] = useState('')
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { currentUser } = useCurrentUser();
    const { userPosts } = useUserAllPost()
    const { tags } = useTags();
    const axiosPublic = useAxiosPublic()
    console.log(tags);

    const options = tags.map(tag => ({ label: tag.name }));

    const handleSelect = (value) => {
        setTag(value.label);
    }

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })


        const postItem = {
            authorImage: user.photoURL,
            authorName: user.displayName,
            authorEmail: user.email,
            title: data.title,
            tag: tag,
            image: res.data.data.display_url,
            upVote: data.upVote,
            downVote: data.downVote,
            descriptions: data.descriptions,
            postTime: new Date()



        }
        console.log(postItem);

        const postRes = await axiosSecure.post('/addPost', postItem);
        console.log(postRes.data);

        if (postRes.data.insertedId) {
            // show success popup
            reset();
            window.location.reload();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `The post ${data.title} is added .`,
                showConfirmButton: false,
                timer: 1500
            });

        }

    }


    return (
        <div className="lg:mx-0 md:mx-10 mx-5">
            <div className="mx-auto text-center md:w-4/12 ">
                <h3 className="text-xl lg:text-2xl uppercase font-semibold border-y-2 border-blue-100 py-3 text-blue-900">Add Post</h3>
            </div>
            {
                currentUser[0]?.badge === 'bronze' && userPosts.length < 5 || currentUser[0]?.badge === 'gold' ?
                    <div className="max-w-screen-md mx-auto mt-5 bg-blue-50 p-5 rounded-2xl ">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text"> Post Title*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder=" Post Title"
                                    {...register('title', { required: true })}
                                    required
                                    className="input input-bordered w-full" />
                            </div>

                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Tag*</span>
                                </label>
                                <Select onChange={handleSelect} options={options} />

                            </div>


                            <div className="form-control w-full my-6">
                                <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                            </div>


                            <div className="flex gap-6">

                                {/* upVote */}
                                <div className="form-control w-full my-6">
                                    <label className="label">
                                        <span className="label-text">Like</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="UpVote 0"
                                        disabled
                                        {...register('upVote', { value: 0 })}
                                        className="input input-bordered w-full" />
                                </div>


                                {/* DownVote */}
                                <div className="form-control w-full my-6">
                                    <label className="label">
                                        <span className="label-text">Dislike</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="DownVote 0"
                                        disabled
                                        {...register('downVote', { value: 0 })}
                                        className="input input-bordered w-full" />
                                </div>

                            </div>



                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Post Descriptions</span>
                                </label>
                                <textarea {...register('descriptions')} className="textarea textarea-bordered h-24" placeholder="Post Descriptions"></textarea>
                            </div>
                            <div className="flex justify-center items-center mt-10">

                                <button className="btn bg-blue-300 " type="submit">
                                    Add Post
                                </button>
                            </div>
                        </form>
                    </div>
                    :

                    <>
                        <div className="min-h-[300px] flex flex-col justify-center items-center my-auto space-y-3">
                            <h3 className="text-3xl font-semibold italic text-red-900">Your post limit is over..!</h3>
                            <Link to="/membership"><button className="btn bg-blue-200 text-base">🥇 Become a gold member 🥇</button></Link>
                            <h3 className="text-2xl font-semibold italic text-blue-950">For unlimited post</h3>
                        </div>
                    </>
            }

        </div>
    );
};

export default AddPost;