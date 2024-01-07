import useAuth from "../../../hooks/useAuth";
function ErvaringsdeskundigeHomePagina () {
    const {userAuth} = useAuth();
    
    return (
        <>
        <h1>ErvaringsdeskundigeHomePagina</h1>
        <p>test: {userAuth.token}</p>
        </>
    );
}

export default ErvaringsdeskundigeHomePagina;