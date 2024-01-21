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
                            </div>
                        ))}
                    </div>
                </div>
                <div id="openstaand" className="col-md-6 kolom" >
                    <h2>Onderzoeken in Active</h2>
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
                                <div className="typeOnderzoek">Type onderzoek: {onderzoek.typeOnderzoek}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ErvaringsdeskundigeHomePagina;