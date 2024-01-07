import useAuth from "../../../hooks/useAuth";
import Gebruikers from "../../Gebruikers";
function ErvaringsdeskundigeHomePagina () {
    const {userAuth} = useAuth();
    
    return (
        <>
        <h1>ErvaringsdeskundigeHomePagina</h1>
        <p>test: {userAuth.token}</p>
        <Gebruikers />
        </>
    );
}

export default ErvaringsdeskundigeHomePagina;