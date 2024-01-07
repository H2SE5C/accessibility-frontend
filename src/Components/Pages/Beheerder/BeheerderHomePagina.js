import useAuth from "../../../hooks/useAuth";
function BeheerderHomePagina () {
    const {userAuth} = useAuth();
    
    return (
        <>
        <h1>BeheerderHomePagina</h1>
        <p>test: {userAuth.token}</p>
        </>
    );
}

export default BeheerderHomePagina;