import Lottie from "lottie-react";
import goldSub from "../../assets/icon/goldSubcribetion.json";
import "./membership.css"
import Subscription from "../../component/Subscription/Subscription";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Membership = () => {
    return (

        <div className="hero subscribe py-12 px-5 md:px-24">
            <div className=" hero-content bg-slate-300 bg-opacity-60 w-full flex justify-around flex-col lg:flex-row px-8 md:px-20 py-10 shadow-2xl rounded-2xl ">
                <div className="flex-1">
                    <Lottie className="w-48 md:w-60 lg:w-72" animationData={goldSub}></Lottie>
                </div>
                <div className="flex-2">
                    <h2 className="text-3xl font-semibold text-blue-950">Unlock the Next Level with Our  <span className="text-[#ffa200] font-bold">Golden Subscription!</span></h2>
                    <p>Welcome to ShareRank, where we are dedicated to enhancing your experience and taking it to the next level. Our Golden Subscription is designed to offer you exclusive access and premium benefits and unlimited post experience that redefine your journey with us.</p>



                    <div className="flex justify-center my-5 gap-5">

                        <button className="btn bg-blue-100" onClick={() => document.getElementById('my_modal_5').showModal()}>Subscribe</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">


                            <div className="modal-box">

                                <div className="pt-5">
                                    <h3 className="text-xl text-center font-semibold text-blue-950">
                                        Joining our Golden Subscription is easy!
                                    </h3>

                                    <div className="pt-8">
                                        <Elements stripe={stripePromise}>
                                            <Subscription></Subscription>
                                        </Elements>
                                    </div>

                                 
                                </div>

                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn  btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;