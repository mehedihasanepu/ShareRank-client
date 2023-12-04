import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useComments = () => {
    const axiosPublic = useAxiosPublic
    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const res = await axiosPublic.get('/comment');
            return res.data;
        }
    });
    return {  comments, isLoading, refetch, };
};

export default useComments;