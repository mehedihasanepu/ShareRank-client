import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useAdmin from "../hook/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <span className="loading loading-infinity loading-lg "></span>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};


export default AdminRoute;



