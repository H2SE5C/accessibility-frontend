import useAuth from "../../../hooks/useAuth";
function MedewerkerHomePagina () {
    const {userAuth} = useAuth();
    
    return (
        <>
        <h1>MedewerkerHomePagina</h1>
        <p>test: {userAuth.token}</p>
        </>
    );
}

export default MedewerkerHomePagina;