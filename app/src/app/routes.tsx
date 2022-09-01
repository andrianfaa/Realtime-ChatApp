import type { RouteProps } from "react-router-dom";
// Pages
import LoginPage from "pages/login";
import HomePage from "pages/home";

const PrivateRoutes: RouteProps[] = [
    {
        path: "/",
        element: <HomePage />,
    },
];

const PublicRoutes: RouteProps[] = [
    {
        path: "/",
        element: <LoginPage />,
    },
];

export { PrivateRoutes, PublicRoutes };
