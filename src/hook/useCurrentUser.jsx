import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useCurrentUser = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()


    const { data: currentUser = [], isLoading } = useQuery({
        queryKey: ['userBadge', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/currentUser?email=${user.email}`);
            return res.data;
        }
    })
    console.log(currentUser);
    return { currentUser, isLoading }

};

export default useCurrentUser;

