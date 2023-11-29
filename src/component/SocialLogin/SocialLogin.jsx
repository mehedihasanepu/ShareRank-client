
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import useAxiosPublic from "../../hook/useAxiosPublic";
import googleIcon from "../../assets/icon/google.gif"


const SocialLogin = () => {
    const { googleSignIn } = useAuth()

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    badge: 'bronze'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }
    return (
        <div className="pl-5">
            <div className="divider text-xs text-content2">or continue with</div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn btn-outline">
                    <div className="h-9 w-9">
                        <img src={googleIcon} alt="" />
                    </div>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;