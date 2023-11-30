import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Membership from "../pages/Membership/Membership";
import Login from "../pages/Home/Login/Login";
import SignUp from "../pages/SingUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import UserProfileDashboard from "../pages/Dashboard/UserProfileDashboard/UserProfileDashboard";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import PostDetails from "../component/PostDetails/PostDetails";
import MyPost from "../pages/Dashboard/MyPost/MyPost";
import CommentDetails from "../component/CommentDetails/CommentDetails";
import ManageUser from "../pages/Dashboard/ManageUser/ManageUser";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import ReportedActivities from "../pages/Dashboard/ReportedActivities/ReportedActivities";
// import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'membership',
                element: <PrivateRoute><Membership></Membership></PrivateRoute>
            },
            {
                path: 'post/:id',
                element: <PostDetails></PostDetails>
            },

            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            }
        ]
    },



    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // normal User Routes 
            {
                path: 'userProfile',
                element: <UserProfileDashboard></UserProfileDashboard>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
            {
                path: 'myPost',
                element: <MyPost></MyPost>
            },
            {
                path: 'myPost/comments/:id',
                element: <CommentDetails></CommentDetails>
            },



            // admin only routes
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'manageUser',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: 'makeAnnouncement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement> </AdminRoute>
            },
            {
                path: 'activities',
                element: <AdminRoute><ReportedActivities></ReportedActivities> </AdminRoute>
            },

            
        ]
    }
]);