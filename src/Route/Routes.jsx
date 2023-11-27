import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Membership from "../pages/Membership/Membership";
import Login from "../pages/Home/Login/Login";
import SignUp from "../pages/SingUp/SignUp";


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



    // {
    //     path: 'dashboard',
    //     element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    //     children: [

    //         // normal User Routes 
    //         {
    //             path: 'userHome',
    //             element: <UserHome></UserHome>
    //         },
    //         {
    //             path: 'cart',
    //             element: <Cart></Cart>
    //         },
    //         {
    //             path: 'payment',
    //             element: <Payment></Payment>
    //         },
    //         {
    //             path: 'paymentHistory',
    //             element: <PaymentHistory></PaymentHistory>
    //         },



    //         // admin only routes
    //         {
    //             path: 'adminHome',
    //             element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
    //         },
    //         {
    //             path: 'addItems',
    //             element: <AdminRoute><AddItems></AddItems></AdminRoute>
    //         },
    //         {
    //             path: 'manageItems',
    //             element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
    //         },
    //         {
    //             path: 'updateItem/:id',
    //             element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
    //             loader: ({ params }) => fetch(`https://bistro-boss-restaurant-server-flame.vercel.app/menu/${params.id}`)
    //         },
    //         {
    //             path: 'users',
    //             element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
    //         }
    //     ]
    // }
]);