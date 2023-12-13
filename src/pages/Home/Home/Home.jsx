import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Announcement from "../Announcement/Announcement";
import TagPost from "../TagPost/TagPost";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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