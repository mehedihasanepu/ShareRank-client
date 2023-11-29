import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useComments = () => {
    const axiosSecure = useAxiosSecure()
    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const res = await axiosSecure.get('/comment');
            return res.data;
        }
    });
    return {  comments, isLoading, refetch, };
};

export default useComments;