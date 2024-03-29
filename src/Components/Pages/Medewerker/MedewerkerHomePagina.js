import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import '../../../css/onderzoek.css';
import { Link } from 'react-router-dom';


function MedewerkerHomePagina () {
    const API_URL = '/api/Onderzoek/medewerker/';
    const [goedgekeurdOnderzoeken, setGoedgekeurdOnderzoeken] = useState([]);
    const [aanvragenOnderzoek, setAanvragenOnderzoek] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const OnderzoekenLijst = async () => {
            try {
                const response = await axiosPrivate.get(API_URL);
                console.log(response.data);
               await setGoedgekeurdOnderzoeken(response.data["onderzoekenEerste"]);
                setAanvragenOnderzoek(response.data["onderzoekenTweede"]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        OnderzoekenLijst();
    }, [axiosPrivate])

    return (
        <div className="container">
            <div className="row">
                <div id="deelnemend" className="col-md-6 kolom" >
                    <h2>Onderzoeken Lijst</h2>
                    <div className = "Onderzoeken">
                        {goedgekeurdOnderzoeken.map((onderzoek) => (
                            <div className="form-group onderzoek" key={onderzoek.id}>
                                <div className="title">Titel: {onderzoek.titel}</div>
                                <div className="Omschrijving">Omschrijving: {onderzoek.omschrijving}</div>
                                <div className="beloning">Beloning: {onderzoek.beloning}</div>
                                <div className="status">Status: {onderzoek.status}</div>
                                <div className="datum">Datum: {onderzoek.datum.split('T')[0]}</div>
                                <div className="beperkingen d-flex">Beperkingen: {onderzoek.beperkingen.map((beperking) => (
                                    <p className="beperking" key={beperking.id}>{beperking.naam},</p>
                                ))}</div>
                                {onderzoek.ervaringsdeskundigen.length !== 0 && <div className="ervaringsdeskundigen d-flex">Ervaringsdeskundigen: {onderzoek.ervaringsdeskundigen.map((deskundige) => (
                                    <p className="beperking" key={deskundige.id}>{deskundige.email},</p>
                                ))}</div>}
                                <div className="typeOnderzoek">Type onderzoek: {onderzoek.typeOnderzoek}</div>
                                <button className="btn btn-primary"><Link className="link" to={`/medewerker/onderzoek-detail/${onderzoek.id}`}>Details</Link></button>
                                {/*{onderzoek.status === "Active" && <button className="btn btn-primary"><Link className="link" to={`/medewerker/onderzoek-inschrijven/${onderzoek.id}`}>Inschrijven</Link></button> }*/}
                            </div>
                        ))}
                    </div>
                </div>
                <div id="openstaand" className="col-md-6 kolom" >
                    <h2>Onderzoeken in afwachting</h2>
                        <div className="Onderzoeken">
                            {aanvragenOnderzoek.map((onderzoek) => (
                                <div className="from-group onderzoek" key={onderzoek.id}>
                                    <div className="title">Titel: {onderzoek.titel}</div>
                                    <div className="Omschrijving">Omschrijving: {onderzoek.omschrijving}</div>
                                    <div className="beloning">Beloning: {onderzoek.beloning}</div>
                                    <div className="status">Status: {onderzoek.status}</div>
                                    <div className="datum">Datum: {onderzoek.datum.split('T')[0]}</div>
                                    <div className="bedrijf">Bedrijf: {onderzoek.bedrijf}</div>
                                    <div className="beperkingen d-flex">Beperkingen: {onderzoek.beperkingen.map((beperking) => (
                                        <p className="beperking" key={beperking.id}>{beperking.naam},</p>
                                    ))}</div>
                                    <div className="typeOnderzoek">Type onderzoek: {onderzoek.typeOnderzoek}</div>
                                    <button className="btn btn-primary"><Link className="link" to={`/medewerker/onderzoek-aanvraag/${onderzoek.id}`}>Beoordeel</Link></button>
                                </div>
                            ))}
                    </div>
                  
                </div>
            </div>
        </div>
    );
}

export default MedewerkerHomePagina;