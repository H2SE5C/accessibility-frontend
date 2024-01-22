import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import '../../../css/onderzoek.css';


function ErvaringsdeskundigeHomePagina() {
    const API_URL = '/api/Onderzoek/ervaringsdeskundige';
    const [activeOnderzoeken, setActiveOnderzoeken] = useState([]);
    const [inActiveOnderzoeken, setInActiveOnderzoeken] = useState([]);
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        const OnderzoekenLijst = async () => {
            try {
                const response = await axiosPrivate.get(API_URL);
                console.log(response.data);
                setActiveOnderzoeken(response.data["onderzoekenEerste"]);
                setInActiveOnderzoeken(response.data["onderzoekenTweede"]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        OnderzoekenLijst();
    }, [axiosPrivate])

    const Schrijven = async (id) => {
         try {  
             await axiosPrivate.put(`/api/Onderzoek/ervaringdiskundigen/${id}`);
            window.location.reload();
            } catch (error) {
                console.error('Fout bij het verwijderen van het account:', error);
            }
        
    };

    

    return (
        <div className="container">
            <div className="row">
                <div id="deelnemend" className="col-md-6 kolom" >
                    <h2>Onderzoeken Lijst</h2>
                    <div className="Onderzoeken">
                        {activeOnderzoeken.map((onderzoek) => (
                            <div className="form-group onderzoek" key={onderzoek.id}>
                                <div className="title">Titel: {onderzoek.titel}</div>
                                <div className="Omschrijving">Omschrijving: {onderzoek.omschrijving}</div>
                                <div className="beloning">Beloning: {onderzoek.beloning}</div>
                                <div className="status">Status: {onderzoek.status}</div>
                                <div className="datum">Datum: {onderzoek.datum.split('T')[0]}</div>
                                <div className="beperkingen d-flex">Beperkingen: {onderzoek.beperkingen.map((beperking) => (
                                    <p className="beperking" key={beperking.id}>{beperking.naam},</p>
                                ))}</div>
                                <div className="typeOnderzoek">Type onderzoek: {onderzoek.typeOnderzoek}</div>
                                <button className="btn btn-danger backBtn" onClick={() => Schrijven(onderzoek.id)} >Schrijven in</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="openstaand" className="col-md-6 kolom" >
                    <h2>Onderzoeken in Actief</h2>
                    <div className="Onderzoeken">
                        {inActiveOnderzoeken.map((onderzoek) => (
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
                                <div className="ervaringsdeskundigen d-flex">Ervaringsdeskundigen: {onderzoek.ervaringsdeskundigen.map((deskundige) => (
                                    <p className="beperking" key={deskundige.id}>{deskundige.email},</p>
                                ))}</div>
                                <div className="typeOnderzoek">Type onderzoek: {onderzoek.typeOnderzoek}</div>
                                <button className="btn btn-danger backBtn" onClick={() => Schrijven(onderzoek.id)} >Schrijfven uit</button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ErvaringsdeskundigeHomePagina;