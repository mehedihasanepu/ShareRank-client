import { Helmet } from "react-helmet";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import SocialLogin from "../../../component/SocialLogin/SocialLogin";
import "./login.css"
import toast from "react-hot-toast";
import loginImg from "../../../assets/icon/login.json"
import Lottie from "lottie-react";



const Login = () => {
    const [disabled, setDisabled] = useState(false);
    const { singIn } = useAuth()

    const navigate = useNavigate()
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        singIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);

                toast?.success(`${user.displayName} login successfully`)

                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                toast.error(`${error.message}`)

            })
    };


    return (

        <>
            <Helmet>
                <title>ShareRank | Login</title>
            </Helmet>
            <div className="hero login py-12 px-24">
                <div className="hero-content bg-slate-50 bg-opacity-30 w-full flex md:flex-row-reverse p-10 shadow-2xl rounded-2xl ">
                    <div className="text-center md:w-1/2 lg:text-left">
                       <Lottie animationData={loginImg}></Lottie>
                    </div>

                    <div className=" md:w-1/2 max-w-sm ">
                        <h2 className="text-center text-4xl mb-4 font-bold">Login</h2>
                        <div className="card bg-opacity-50 bg-base-100">
                            <form onSubmit={handleLogin} className="pt-5 px-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                    />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">
                                            Forgot password?
                                        </a>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input
                                        onBlur={handleValidateCaptcha}
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control mt-6">
                                    <input
                                        className="btn bg-[#9eddff] font-bold text-black"
                                        disabled={disabled}
                                        type="submit"
                                        value="Login"
                                    />
                                </div>
                                <p>
                                    <small>
                                        New Here?{" "}
                                        <Link to="/signUp">
                                            <span className="text-blue-700 font-semibold">
                                                Create an account
                                            </span>
                                        </Link>{" "}
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

export default Login