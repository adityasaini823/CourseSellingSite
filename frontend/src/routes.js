import { lazy } from "react";
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

export const adminRoutes=[
    {
        path: "/signup",
        element: <Signup/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/admin/",
        element: <AdminDashboard/>,
    }

];
export const userRoutes=[
    {
        path: "/signup",
        element: <Signup/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/",
        element: <HomePage/>,
    }
    

];

