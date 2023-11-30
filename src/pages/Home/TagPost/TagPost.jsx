import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TagPostTab from "./TagPostTab";
import useAllPost from "../../../hook/useAllPost";
import useTags from "../../../hook/useTags";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./tab-post.css"
import Loading from "../../../component/Loading/Loading";

const TagPost = () => {
    const { posts } = useAllPost();
    const { tags } = useTags();
    const { category } = useParams();
    console.log(posts, tags, category);

    const [tabIndex, setTabIndex] = useState(0);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        if (tags && tags.length > 0 && posts) {
            const categories = tags.map(tab => tab.name);
            const initialIndex = categories.indexOf(category);
            setTabIndex(initialIndex >= 0 ? initialIndex : 0); // Ensure valid index or fallback to 0

            const filtered = tags.map(tab => {
                return {
                    name: tab.name,
                    posts: posts.filter(item => item.tag === tab.name)
                };
            });
            setFilteredPosts(filtered);
        }
    }, [tags, posts, category]);

    if (!tags || !posts || tags.length === 0 || filteredPosts.length === 0) {
        return <Loading></Loading>; // Add a loading state or handle when data is not available
    }

    return (
        <div>
            <div className="mx-auto text-center md:w-4/12 mt-16 ">
                <h3 className="text-3xl uppercase font-semibold border-y-4 border-blue-100 py-4 text-blue-900">All Tag Base Post</h3>
            </div>

            <div className='pt-10'>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="custom-tab-list">
                        {tags.map(tab => (
                            <Tab key={tab.name}>{tab.name}</Tab>
                        ))}
                    </TabList>

                    {filteredPosts.map((filteredPost, index) => (
                        <TabPanel key={index}>
                            <TagPostTab tags={filteredPost.posts}></TagPostTab>
                        </TabPanel>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default TagPost;