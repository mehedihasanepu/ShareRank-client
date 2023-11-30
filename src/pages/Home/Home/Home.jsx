import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Announcement from "../Announcement/Announcement";
import TagPost from "../TagPost/TagPost";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>ShareRank | Home</title>
            </Helmet>
            <Banner></Banner>
            <TagPost></TagPost>
            <Announcement></Announcement>
        </div>
    );
};

export default Home;