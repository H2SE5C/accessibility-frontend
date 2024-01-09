import useAuth from "../../../hooks/useAuth";
function BedrijfHomePagina () {
    const {userAuth} = useAuth();
    
    return (
        <>
        <h1>BedrijfHomePagina</h1>
        <p>test: {userAuth.token}</p>
        </>
    );
}

export default BedrijfHomePagina;