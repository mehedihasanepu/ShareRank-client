import Lottie from "lottie-react";
import loadingIcon from "../../assets/icon/loading.json";

const Loading = () => {
    return (
        <div>
            <div className="flex  items-center justify-center  h-[70vh]">
                <div className="w-[500px]">
                    <Lottie animationData={loadingIcon} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Loading;