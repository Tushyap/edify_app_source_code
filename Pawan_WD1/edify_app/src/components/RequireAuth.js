import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContextProvider";

const RequireAuth = (props) => {
  const location = useLocation();
  const { user } = useAuthContext();

  try {
    // check if there is a user show the page
    if (user) {
      // check the user's role
      if (user?.role === props.allowedRole) {
        return <Outlet />;
      } else {
        return (
          <Navigate to="/unauthorized" state={{ from: location }} replace />
        );
      }
    } else {
      return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
  } catch (e) {
    // if the localStorage token value is not parseable, redirect to sign-in page
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
