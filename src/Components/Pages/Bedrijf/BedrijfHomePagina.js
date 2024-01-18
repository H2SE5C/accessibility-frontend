import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import '../../../css/onderzoek.css';
import { Link } from 'react-router-dom';

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
    }, []);

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
                            <p className="beperking" key={beperking.id}>{beperking.naam},</p>
                        ))}</div>
                        <div className="typeOnderzoek">typeOnderzoek: {onderzoek.typeOnderzoek}</div>
                    </div>
                ))}
                <div className="btn btn-success"><Link className="link" to="/bedrijf/maak-Onderzoek">Nieuw Onderzoek</Link></div>
            </div>
        </>
    );
}

export default BedrijfHomePagina;