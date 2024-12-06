import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import Register from "../components/Register";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import App from "../App";
import Payment from "../pages/shop/Payment";
import Order from "../pages/dashboard/Order";
import FoodDetails from "../pages/shop/FoodDetails";
import Favorites from "../components/Favorites";
import ForgetPassword from "../components/ForgetPassword";
import UserProfile from "../components/UserProfile";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/menu",
                element: <Menu />
            },
            {
                path: "/menu/:id",
                element: <FoodDetails />,
                loader: ({ params }) => fetch(`http://localhost:6001/menu/${params.id}`)
            },
            {
                path: "/user-profile",
                element: <UserProfile />
            },
            {
                path: "/cart-page",
                element: <CartPage />
            },
            {
                path: "/favorites",
                element: <Favorites />
            },
            {
                path: "/process-checkout",
                element: <Payment />
            },
            {
                path: "/order",
                element: <Order />
            }
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
        path: "/forget-password",
        element: <ForgetPassword />
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
            },
            {
                path: "add-menu",
                element: <AddMenu />
            },
            {
                path: "manage-items",
                element: <ManageItems />
            },
            {
                path: "update-menu/:id",
                element: <UpdateMenu />,
                loader: ({ params }) => fetch(`http://localhost:6001/menu/${params.id}`)
            },

        ]
    }

]);

export default router;
