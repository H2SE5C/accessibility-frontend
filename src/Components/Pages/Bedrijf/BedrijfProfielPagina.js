import useAuth from "../../../hooks/useAuth";
function BedrijfProfielPagina() {
    const { userAuth } = useAuth();
    console.log(userAuth);
    return (
        <>
            <h1>BedrijfProfielPagina</h1>
            
        </>
    );
}

export default BedrijfProfielPagina;