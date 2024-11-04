import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Modal from "../components/Modal";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import UserProfile from "../pages/dashboard/UserProfile";
import Login from "../components/Login";
import Register from "../components/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/menu",
                element: <Menu />,

            },
            {
                path: "/user-profile",
                element: <UserProfile />
            },
            {
                path: "/cart-page",
                element: <CartPage />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "admin",
                element: <Dashboard />
            },
            {
                path: "users",
                element: <Users />
            }
        ]
    }

]);

export default router;
