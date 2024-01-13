import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";


function BedrijfHomePagina() {
    const API_URL = '/api/Onderzoek/bedrijf/';
    const [onderzoeken, setOnderzoeken] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    
    const OnderzoekenLijst = async () => {
        try {
            const response = await axiosPrivate.get(API_URL);
            setOnderzoeken(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        OnderzoekenLijst();
    }, [])

    return (
        <>
        <h1>Onderzoeken</h1>
            <div className="Onderzoeken">
                {onderzoeken.map((onderzoek) => (
                    <div className="from-group onderzoek" key={onderzoek.id}>
                        <div className="title">Title: {onderzoek.titel}</div>
                        <div className="Omschrijving">Omschrijving: {onderzoek.omschrijving}</div>
                        <div className="beloning">Beloning: {onderzoek.beloning}</div>
                        <div className="status">Status: {onderzoek.status}</div>
                        <div className="datum">datum: {onderzoek.datum}</div>
                        <div className="beperkingen d-flex">Beperkningen: {onderzoek.beperkingen.map((beperking) => (
                            <p className="mr-3" key={beperking.id}>{beperking.naam}</p>
                        ))}</div>
                        <div className="typeOnderzoek">typeOnderzoek: {onderzoek.typeOnderzoek}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BedrijfHomePagina;