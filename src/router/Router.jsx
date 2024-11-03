import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Modal from "../components/Modal";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "/signin",
                        element: <Modal />
                    },
                    {
                        path: "/signup",
                        element: <Modal />
                    },
                ]
            },
            {
                path: "/menu",
                element: <Menu />,
                
            },
            {
                path: "/update-profile",
                element: <UpdateProfile />
            },
            {
                path: "/cart-page",
                element: <CartPage />
            },

        ]
    },

]);

export default router;
