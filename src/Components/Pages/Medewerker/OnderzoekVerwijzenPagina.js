import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function OnderzoekVerwijzenPagina() {
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const navigate = useNavigate();
    const [titel, setTitel] = useState("");
    const [omschrijving, setOmschrijving] = useState("");
    const [beloning, setBeloning] = useState("");
    const [datum, setDatum] = useState("");
    const [typeOnderzoeken, setTypeOnderzoeken] = useState([]);
    const [beperkingen, setBeperkingen] = useState([]);
    const [geselecteerdeType, setGeselecteerdeType] = useState("");
    const [geselecteerdeBeperkingen, setGeselecteerdeBeperkingen] = useState([]);
    const [success, setSuccess] = useState(true);
    const API_URL = '/api/Onderzoek/medewerker/';

    useEffect(() => {
        const OnderzoekDetail = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + id);
                const onderzoek = response.data;
                setTitel(onderzoek.titel);
                setOmschrijving(onderzoek.omschrijving);
                setBeloning(onderzoek.beloning);
                setDatum(onderzoek.datum);
                setGeselecteerdeType(onderzoek.typeOnderzoek);
                setGeselecteerdeBeperkingen(onderzoek.beperkingen);

                const responsTypeOnderzoeken = await axiosPrivate('/api/Ervaringsdeskundige/TypeOnderzoeken');
                const responsBeperkingen = await axiosPrivate('/api/Onderzoek/Beperkingen');
                setTypeOnderzoeken(responsTypeOnderzoeken.data);
                setBeperkingen(responsBeperkingen.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        OnderzoekDetail();
    }, [id, axiosPrivate])


    const selecteerBeperkingen = (event) => {
        const selected = Array.from(event.target.selectedOptions, (option) => {
            const beperking = beperkingen.find(item => item.naam === option.value);
            return { id: beperking.id, naam: beperking.naam };
        });
        setGeselecteerdeBeperkingen(selected);

    };
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axiosPrivate.put('/api/Onderzoek/update/'+id, {
                titel: titel,
                omschrijving: omschrijving,
                beloning: beloning,
                datum: datum,
                beperkingen: geselecteerdeBeperkingen,
                typeOnderzoek: geselecteerdeType

            });
            console.log(response);
            navigate('/medewerker');
        }
        catch (err) {
            // console.log(err?.request?.response);
            console.log(err);
            setSuccess(false);
        }
    }


    return (
        <div className="container">
            <div className="header">
                {success ? <></> : <h1 className="text-danger ">Verkeerd ingevuld</h1>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titel">Titel</label>
                        <input type="text" required className="form-control" id="titel" placeholder="Titel" value={titel} onChange={(e) => { setTitel(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="omschrijving">Omschrijving</label>
                        <input type="text" required className="form-control" id="omschrijving" placeholder="Omschrijving" value={omschrijving} onChange={(e) => { setOmschrijving(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="beloning">Beloning</label>
                        <input type="text" required className="form-control" id="beloning" placeholder="Beloning" value={beloning} onChange={(e) => { setBeloning(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="datum">Datum</label>
                         <input type="date" required className="form-control" id="datum" placeholder="Datum" value={datum.split('T')[0]} onChange={(e) => { setDatum(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="typeOnderzoek">Kies de onderzoek Type</label>
                         <select id="typeOnderzoek" className="form-control" value={geselecteerdeType} onChange={(e) => { setGeselecteerdeType(e.target.value); }}>
                            {typeOnderzoeken.map((typeOnderzoek) => (
                                <option key={typeOnderzoek.id} value={typeOnderzoek.naam}>
                                    {typeOnderzoek.naam}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="beperkingen">Kies de beperkingen</label>
                        {Array.isArray(geselecteerdeBeperkingen)  && <select id="beperkingen" className="form-control" multiple value={geselecteerdeBeperkingen.map(option => option.naam)} onChange={selecteerBeperkingen}>
                            {beperkingen.map((beperking) => (
                                <option key={beperking.id} value={beperking.naam}>
                                    {beperking.naam}
                                </option>
                            ))}
                        </select>}
                        <p className="selectie">Uw geselecteerde beperkingen:</p>
                        {Array.isArray(geselecteerdeBeperkingen) && <span className="gekozen">{geselecteerdeBeperkingen.length !== 0 ? geselecteerdeBeperkingen.map((option) => ` ${option.naam}`).join(",") : " nog niets geselecteerd."}</span>}

                    </div>

                    <button type="submit" className="btn btn-success mt-2">Wijzigen</button>
                    <p className="terug"><Link to="/medewerker">Terug</Link></p>
                </form>
            </div>
        </div>
               
               
    );
}

export default OnderzoekVerwijzenPagina;