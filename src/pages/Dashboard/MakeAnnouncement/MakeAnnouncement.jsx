import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useCurrentUser from "../../../hook/useCurrentUser";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
    const { register, handleSubmit, reset } = useForm();

    const axiosSecure = useAxiosSecure()
    const { currentUser } = useCurrentUser()
    const onSubmit = async (data) => {
        const announcementItem = {
            AuthorName: currentUser[0].name,
            AuthorImage: currentUser[0].image,
            title: data.title,
            descriptions: data.descriptions,
            postTime: new Date()

        }
        console.log(announcementItem);

        const announcementRes = await axiosSecure.post('/announcement', announcementItem);
        console.log(announcementRes.data);

        if (announcementRes.data.insertedId) {
            // show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `The announcement is added .`,
                showConfirmButton: false,
                timer: 1500
            });

        }

    }


    return (

        <div>
            <div className="text-center my-4">
                <h2 className="text-3xl">Make Announcement</h2>
            </div>
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
    );
};

export default MakeAnnouncement;



