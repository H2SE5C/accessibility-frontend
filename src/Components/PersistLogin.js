import {Outlet} from "react-router-dom";
import { useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import useRefreshToken from "../hooks/useRefreshToken";
import Loading from "./Loading";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {userAuth} = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        console.log("wowza: "+ userAuth?.token);
        !userAuth?.token ? verifyRefreshToken() : setIsLoading(false);
    },[refresh, userAuth?.token])

    return (
        <Loading isLoading={isLoading}>
            <Outlet />
        </Loading>
    )
}
export default PersistLogin;