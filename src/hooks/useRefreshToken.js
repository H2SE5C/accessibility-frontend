import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get("refresh", {
                withCredentials: true
            });
            const token = response?.data?.token;
            const expiration = response?.data?.expiration;
            const roles = response?.data?.roles;
            
            setAuth(prev => {
                console.log(JSON.stringify(prev))
                console.log(token)
                return {...prev, token: token, expiration: expiration, roles: roles};
            });
            return token;
        }
        catch(err) {
            console.log("error: "+err);
        }
    }

    return refresh;
}

export default useRefreshToken;