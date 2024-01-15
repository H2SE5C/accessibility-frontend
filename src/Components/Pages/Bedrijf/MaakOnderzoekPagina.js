import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import axios from '../../../api/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function MaakOnderzoekPagina()
{
/*    const ONDERZOEK_URL = '/api/Onderzoek/bedrijf/add';*/
    const [titel, setTitel] = useState("");
    const [omschrijving, setOmschrijving] = useState("");
    const [beloning, setBeloning] = useState("");
    const [datum, setDatum] = useState("");
    const [typeOnderzoeken, setTypeOnderzoeken] = useState([]);
    const [beperkingen, setBeperkingen] = useState([]);
    const [geselecteerdeType, setGeselecteerdeType] = useState("");
    const [geselecteerdeBeperkingen, setGeselecteerdeBeperkingen] = useState([]);
    const [mes, setMessage] = useState("");
    const [success, setSuccess] = useState(true);
/*    const axiosPrivate = useAxiosPrivate();*/

    const fetchOnderzoeken = async () => {
        const responsTypeOnderzoeken = await axios('/api/Ervaringsdeskundige/TypeOnderzoeken');
        const responsBeperkingen = await axios('/api/Onderzoek/Beperkingen');
        setTypeOnderzoeken(responsTypeOnderzoeken.data);
        setBeperkingen(responsBeperkingen.data);
    }
    useEffect(() => {
        fetchOnderzoeken();
    }, [])

 

    const selecteerBeperkingen = (event) => {
        const selected = Array.from(event.target.selectedOptions, (option) => {
            const beperking = beperkingen.find(item => item.naam === option.value);
            return { id: beperking.id, naam: beperking.naam };
        });
        setGeselecteerdeBeperkingen(selected);

    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(datum);
        /*await axiosPrivate.post(ONDERZOEK_URL, */
        try {
            const response = {
                titel: titel,
                omschrijving: omschrijving,
                beloning: beloning,
                datum: datum,
                beperkingen: geselecteerdeBeperkingen,
                typeOnderzoek: geselecteerdeType

            }
           /*     , { 'Access-Control-Allow-Crendentials': true });*/
            console.log(response);
            setMessage("Onderzoek goed gemaakt");
            setSuccess(true);
        }
        catch (err) {
            // console.log(err?.request?.response);
            console.log(err);
            setMessage("its verkeert invullen");
            setSuccess(false);
        }
    }

    return (
        <div className="container">
            <div className="header text-center">
                <h1>Maak de Onderzoek!</h1>
            </div>
            {success ? <h1 className="text-success">{mes}</h1> : <h1 className="text-danger ">{mes}</h1>}
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
                    <input type="date" required className="form-control" id="datum" placeholder="Datum" value={datum} onChange={(e) => { setDatum(e.target.value) }} />
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
                    <label htmlFor="typeOnderzoek">Kies de Beperkingen</label>
                    <select id="typeOnderzoek" className="form-control" multiple value={geselecteerdeBeperkingen.map(option => option.naam)} onChange={selecteerBeperkingen}>
                        {beperkingen.map((beperking) => (
                            <option key={beperking.id} value={beperking.naam}>
                                {beperking.naam}
                            </option>
                        ))}
                    </select>
                    <p className="selectie">Uw geselecteerde beperkingen:</p>
                    <span className="gekozen">{geselecteerdeBeperkingen.length !== 0 ? geselecteerdeBeperkingen.map((option) => ` ${option.naam}`).join(",") : " nog niets geselecteerd."}</span>
                 
                </div>

                <button type="submit" className="btn btn-primary mt-2">Maak</button>
                <p className="terug"><Link to="/bedrijf">Terug</Link></p>
            </form>
        </div>
    );
}

export default MaakOnderzoekPagina;