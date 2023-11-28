
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllSortPost = (upVote, searchText, page) => {
    const axiosPublic = useAxiosPublic();
    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ["posts", upVote, searchText, page], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?vote=${upVote ? 'upVote' : ''}&search=${searchText}&page=${page}`);
            return res.data;
        }
    });

    return { posts, isLoading, refetch };
};

export default useAllSortPost;

