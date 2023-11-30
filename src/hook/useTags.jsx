import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTags = () => {
    const axiosPublic = useAxiosPublic()
    const { data: tags = [], isLoading, refetch } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosPublic.get('/tag');
            return res.data;
        }
    });
    return {tags, isLoading, refetch };
};

export default useTags;
