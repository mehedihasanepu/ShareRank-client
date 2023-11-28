import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAuth from "../../hook/useAuth";
import SocialLogin from "../../component/SocialLogin/SocialLogin";
import "./signUp.css"

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const SignUp = () => {
  const axiosPublic = useAxiosPublic()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();


  // image hosting 



  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    if (res.data.success) {
      createUser(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;
          console.log(loggedUser);
          updateUserProfile(data.name, res.data.data.display_url)
            .then(() => {
              // console.log('user profile info updated')
              const userInfo = {
                name: data.name,
                email: data.email,
                badge:'bronze'
              }
              axiosPublic.post('/users', userInfo)
                .then(res => {
                  if (res.data.insertedId) {
                    console.log('user added to the database');
                    reset();
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'User created successfully.',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    navigate('/');
                  }
                })
            })
        })
        .catch((error) => console.error(error));


    }


  };
  return (
    <>
      <Helmet>
        <title>ShareRank| Sign Up</title>
      </Helmet>
      <div className="hero sign-up py-12 px-24">
        <div className=" hero-content bg-slate-50 bg-opacity-30 w-full flex p-10 shadow-2xl rounded-2xl ">
          <div className="text-center md:w-1/2 lg:text-left">
            {/* <img src={loginImg} alt="" /> */}
          </div>

          <div className=" md:w-1/2  max-w-sm ">
            <h2 className="text-center text-4xl mb-4 text-blue-900 font-bold">Sign Up</h2>
            <div className="card  bg-opacity-50 bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="pt-5 px-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>

                <div className="form-control w-full my-6">
                  <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                </div>


                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one lower case, one
                      number and one special character.
                    </p>
                  )}
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>


                <div className="form-control mt-6">
                  <input
                    className="btn bg-[#9eddff] font-bold text-black"
                    type="submit"
                    value="Sing Up"
                  />
                </div>
                <p className="pt-2">
                  <small >
                    Already have an account?{" "}
                    <Link to="/login">
                      <span className="text-blue-700 font-semibold">Login</span>
                    </Link>
                  </small>
                </p>
              </form>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
