import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllPost = () => {
    const axiosPublic = useAxiosPublic()
    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosPublic.get('/addPosts');
            return res.data;
        }
    });
    return { posts, isLoading, refetch, };
};

export default useAllPost;