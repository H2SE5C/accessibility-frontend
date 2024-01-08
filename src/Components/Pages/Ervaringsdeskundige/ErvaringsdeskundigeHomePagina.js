import useAuth from "../../../hooks/useAuth";
import Gebruikers from "../../Gebruikers";
function ErvaringsdeskundigeHomePagina () {
    const {userAuth} = useAuth();
    
    return (
        <div>
        <h1>ErvaringsdeskundigeHomePagina</h1>
        <p>test: {userAuth.token}</p>
        <Gebruikers />
        </div>
    );
}

export default ErvaringsdeskundigeHomePagina;