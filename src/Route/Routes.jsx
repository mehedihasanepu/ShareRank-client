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
                element:<Membership></Membership>
            },
           
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signUp',
                element:<SignUp></SignUp>
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
                element:<UserProfileDashboard></UserProfileDashboard>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
            // {
            //     path: 'payment',
            //     element: <Payment></Payment>
            // },
            // {
            //     path: 'paymentHistory',
            //     element: <PaymentHistory></PaymentHistory>
            // },



            // admin only routes
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            // {
            //     path: 'addItems',
            //     element: <AdminRoute><AddItems></AddItems></AdminRoute>
            // },
            // {
            //     path: 'manageItems',
            //     element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            // },
            // {
            //     path: 'updateItem/:id',
            //     element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
            //     loader: ({ params }) => fetch(`https://bistro-boss-restaurant-server-flame.vercel.app/menu/${params.id}`)
            // },
            // {
            //     path: 'users',
            //     element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            // }
        ]
    }
]);