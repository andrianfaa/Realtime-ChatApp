import { PrivateRoutes, PublicRoutes } from "app/routes";
import { UserContext } from "context";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

export default function Router() {
    const { username } = useContext(UserContext);

    return (
        <Routes>
            {username ? (
                <>
                    {PrivateRoutes.map(({ path, element }) => (
                        <Route path={path} element={element} key={path} />
                    ))}
                </>
            ) : (
                <>
                    {PublicRoutes.map(({ path, element }) => (
                        <Route path={path} element={element} key={path} />
                    ))}
                </>
            )}
        </Routes>
    );
}
