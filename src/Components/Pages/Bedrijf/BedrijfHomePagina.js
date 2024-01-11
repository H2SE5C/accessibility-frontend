import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
function BedrijfHomePagina() {
    const APi_URL = '/api/Onderzoek/bedrijf/';
    const { userAuth } = useAuth();
    const { onderzoeken, setOnderzoeken } = useState('');
    return (
        <>
        <h1>BedrijfHomePagina</h1>
        <p>test: {userAuth.token}</p>
        </>
    );
}

export default BedrijfHomePagina;