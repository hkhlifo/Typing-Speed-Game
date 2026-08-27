import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

function PublicRoute({ children }) {
    if (isAuthenticated()) {
        return <Navigate to="/game" replace />;
    }

    return children;
}

export default PublicRoute;