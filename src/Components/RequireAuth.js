import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const {userAuth} = useAuth();
    const location = useLocation();
    console.log("check: " + JSON.stringify(userAuth));
    return (
        userAuth?.roles?.find(role => allowedRoles?.includes(role)) ? <Outlet /> : <Navigate to="/login" state= {{from: location}} replace />
    );
}
export default RequireAuth;