import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Modal from "../components/Modal";
import UpdateProfile from "../pages/dashboard/UpdateProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/menu",
                element: <Menu />
            },
            {
                path: "/signin",
                element: <Modal />
            },
            {
                path: "/signup",
                element: <Modal />
            },
            {
                path: "update-profile",
                element: <UpdateProfile />
            },

        ]
    }
]);

export default router;
