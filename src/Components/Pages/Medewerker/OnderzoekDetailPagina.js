import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate, useParams } from 'react-router-dom';

function OnderzoekDetailPagina({ isAanvraag }) {

    const [onderzoek, setOnderzoek] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const API_URL = '/api/Onderzoek/medewerker/';
    const navigate = useNavigate();
    const pathArray = window.location.pathname.split('/');
    const rolNaam = pathArray[1];

    useEffect(() => {
        const OnderzoekenLijst = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + id);
                await setOnderzoek(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        OnderzoekenLijst();
    }, [id, axiosPrivate])

    const handleStatusClick = async (isAkkord) => {
         const status = isAkkord ? "AkkordStatus" : "NietAkkordStatus";
        try {
                await axiosPrivate.put(`/api/Onderzoek/${status}/${id}`);
                window.location.reload();
            } catch (error) {
                console.error("Error updating status:", error);
            };
    }

    const verwijderOnderzoek = async () => {
        const confirmed = window.confirm('Weet je zeker dat deze onderzoek wilt verwijderen? Dit kan niet ongedaan worden gemaakt.');

        if (confirmed) {
            try {
                await axiosPrivate.delete(`/api/Onderzoek/verwijderen/${id}`);
                navigate(`/${rolNaam}`);
            } catch (error) {
                console.error('Fout bij het verwijderen van het account:', error);
            }
        }
    };

    return (
        <div className="container"> 
            <div className="header">
                <div className="from-group onderzoek" key={onderzoek.id}>
                    <div className="title">Titel: {onderzoek.titel}</div>
                    <div className="Omschrijving">Omschrijving: {onderzoek.omschrijving}</div>
                    <div className="beloning">Beloning: {onderzoek.beloning}</div>
                    <div className="status">Status: {onderzoek.status}</div>
                    {onderzoek.datum && <div className="datum">Datum: {onderzoek.datum.split('T')[0]}</div> }
                    <div className="bedrijf">Bedrijf: {onderzoek.bedrijf}</div>
                    {Array.isArray(onderzoek.beperkingen) && <div className="beperkingen d-flex">Beperkingen: {onderzoek.beperkingen.map((beperking) => (
                        <p className="beperking" key={beperking.id}>{beperking.naam},</p>
                    ))}</div>}
                    {console.log(onderzoek)}
                    <div className="typeOnderzoek">Type onderzoek: {onderzoek.typeOnderzoek}</div>
                    <div className="d-flex">
                        <button className="btn btn-primary backBtn" ><Link className="link" to={`/${rolNaam}`}>Terug</Link></button>
                        {isAanvraag ? <>
                            <button className="btn btn-success backBtn" onClick={() => handleStatusClick(true)}>Akkoord</button>
                            <button className="btn btn-danger backBtn" onClick={() => handleStatusClick(false)}>Niet Akkoord</button>
                        </> :
                        <>
                           <button className="btn btn-warning backBtn" ><Link className="link" to={`/${rolNaam}/onderzoek-wijzig/${onderzoek.id}`}>wijzigen</Link></button>
                            <button className="btn btn-danger backBtn" onClick={verwijderOnderzoek} >verwijderen</button>
                         </>
                    }
                       
                    </div>
                </div>
            </div>
        </div>
               
               
    );
}

export default OnderzoekDetailPagina;