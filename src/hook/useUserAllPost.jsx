    import { useQuery } from "@tanstack/react-query";
    import useAxiosPublic from "./useAxiosPublic";
    import useAuth from "./useAuth";
    const useUserAllPost = () => {

        const axiosPublic = useAxiosPublic()
        const { user } = useAuth();
        const { refetch, data: userPosts = [] } = useQuery({
            queryKey: ['userPost', user?.email],
            queryFn: async () => {
                const res = await axiosPublic.get(`/addPost/user?email=${user.email}`); 
                return res.data;
            }
        })
        return {userPosts, refetch}
    };

    export default useUserAllPost;

