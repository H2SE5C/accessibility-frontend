import useAuth from "../../../hooks/useAuth";
function BedrijfProfielPagina() {
    const { userAuth } = useAuth();
    console.log(useAuth);
    return (
        <>
            <h1>BedrijfProfielPagina</h1>
            
        </>
    );
}

export default BedrijfProfielPagina;