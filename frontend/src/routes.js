import { lazy } from "react";
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import HomePage from "./pages/HomePage.jsx";
import AdminDashboard from './pages/AdminDashboard.jsx'

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

