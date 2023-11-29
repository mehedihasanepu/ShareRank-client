import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Announcement from "../Announcement/Announcement";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>ShareRank | Home</title>
            </Helmet>
            <Banner></Banner>
            <Announcement></Announcement>
        </div>
    );
};

export default Home;