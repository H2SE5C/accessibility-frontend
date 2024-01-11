import 'bootstrap/dist/css/bootstrap.css';
import '../../css/styles.css';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import Voogdformule from './Voogdformule';
function RegistreerErvaringsdeskundige() {
    const REGISTREER_URL = '/api/Authenticatie/registreer-ervaringsdeskundige';
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("")
    const [email, setEmail] = useState("")
    const [postcode, setPostcode] = useState("")
    const [minderjarig, setMinderjarig] = useState(false)
    const [wachtwoord, setWachtwoord] = useState("")
    const [telefoonnummer, setTelefoonnummer] = useState("")
    const [voorkeurBenadering, setVoorkeurBenadering] = useState("")
    const [typeOnderzoeken, setTypeOnderzoeken] = useState([])
    const [aandoeningen, setAandoeningen] = useState([])
    const [commerciele, setCommerciele] = useState(false)
    const [voogd, setVoogd] = useState([])
    const [mes, setMessage] = useState("");
    const [success, setSuccess] = useState(true);


    const fetchOnderzoeken = async () => {
        const responsTypeOnderzoeken = await axios('/api/Ervaringsdeskundige/TypeOnderzoeken');
        const responsAandoeningen = await axios('/api/Ervaringsdeskundige/Aandoeningen');
        setTypeOnderzoeken(responsTypeOnderzoeken.data);
        setAandoeningen(responsAandoeningen.data);
        /*
        fetch(axios.'/api/Ervaringsdeskundige/TypeOnderzoeken').then(respons => respons.json()).then((json) => setTypeOnderzoeken(json));*/
       
    }
    useEffect(() => {
        fetchOnderzoeken();
    }, [])
    
    const [geselecteerdeTypes, setGeselecteerdeTypes] = useState([]);

    const [geselecteerdeAandoeningen, setGeselecteerdeAandoeningen] = useState([]);

    const selecteerOnderzoekType = (event) => {
        const selected = Array.from(event.target.selectedOptions, (option) => {
            const onderzoek = typeOnderzoeken.find(item => item.naam === option.value);
            return { id: onderzoek.id, naam: onderzoek.naam };
             });
        setGeselecteerdeTypes(selected);
        
    };

    const selecteerAandoening = (event) => {
        const selected = Array.from(event.target.selectedOptions, (option) => {
            const aandoening = aandoeningen.find(item => item.naam === option.value);
            return { id: aandoening.id, naam: aandoening.naam };
        });
        setGeselecteerdeAandoeningen(selected);

    };

    const handleFormChange = (formData) => {
        setVoogd(formData);
        console.log(formData);
    };
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            
            const response = await axios.post(REGISTREER_URL, {
                voornaam: voornaam,
                achternaam: achternaam,
                wachtwoord: wachtwoord,
                email: email,
                postcode: postcode,
                minderjarig: minderjarig,
                telefoonnummer: telefoonnummer,
                aandoeningen: geselecteerdeAandoeningen,
                typeOnderzoeken: geselecteerdeTypes,
                voorkeurBenadering: voorkeurBenadering,
                commerciele: commerciele,
                voogdVoornaam: voogd.voogdVoornaam,
                voogdAchternaam: voogd.voogdAchternaam,
                voogdTelefoonnummer: voogd.voogdTelefoonnummer,
                voogdEmail: voogd.voogdEmail
            }
                , { 'Access-Control-Allow-Crendentials': true });
            setMessage("Account success gemaakt" );
            setSuccess(true);
            console.log(response);
            console.log(response.data['message']);
        }
        catch (err) {
            setMessage("registeer verkeert opnieuw proberen!");
            setSuccess(false);
            console.log("error"+err);
        }
    }
    return (
        <div className="container">
            <div className="header text-center">
                <h1>Registreer uw account!</h1>
            </div>
            {success ? <h1 className="text-success">{mes}</h1> : <h1 className="text-danger ">{mes}</h1> }
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="voornaam">Voornaam</label>
                    <input type="text" className="form-control" id="voornaam" placeholder="Tim" value={voornaam} onChange={(e) => { setVoornaam(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="achternaam">Achternaam</label>
                    <input type="text" className="form-control" id="achternaam" placeholder="Liu" value={achternaam} onChange={(e) => { setAchternaam(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Emailadres</label>
                    <input type="text" className="form-control" id="email" placeholder="voorbeeld@voorbeeld.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="postcode">postcode</label>
                    <input type="text" className="form-control" id="postcode" placeholder="1111DD" value={postcode} onChange={(e) => { setPostcode(e.target.value) }}  />
                </div>
                <div className="form-group">
                    <label htmlFor="telefoonnummer">telefoonnummer</label>
                    <input type="text" className="form-control" id="telefoonnummer" placeholder="0611111111" value={telefoonnummer} onChange={(e) => { setTelefoonnummer(e.target.value) }} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="wachtwoord">Wachtwoord</label>
                    <input type="password" className="form-control" id="wachtwoord" placeholder="Wachtwoord" value={wachtwoord} onChange={(e) => { setWachtwoord(e.target.value) }} />
                </div>

                <div className="form-group">
                    <label htmlFor="voorkeurBenadering">voorkeurBenadering</label>
                    <input type="text" className="form-control" id="voorkeurBenadering" placeholder="feysiek" value={voorkeurBenadering} onChange={(e) => { setVoorkeurBenadering(e.target.value) }} />
                </div>

                <div className="form-group">
                    <label htmlFor="typeOnderzoek">Kies de onderzoek Type</label>
                    <select id="typeOnderzoek" className="form-control" multiple value={geselecteerdeTypes.map(option => option.naam)} onChange={selecteerOnderzoekType}>
                        {typeOnderzoeken.map((typeOnderzoek) => (
                            <option key={typeOnderzoek.id} value={typeOnderzoek.naam}>
                                {typeOnderzoek.naam}
                            </option>
                        ))}
                    </select>

                    <p>Het keis is: {geselecteerdeTypes.map(option => `${option.naam} `).join(', ')}</p>
                </div>


                <div className="form-group">
                    <label htmlFor="Aandoeningen">Kies uw aandoeningen</label>
                    <select id="Aandoeningen" className="form-control" multiple value={geselecteerdeAandoeningen.map(option => option.naam)} onChange={selecteerAandoening}>
                        {aandoeningen.map((aandoening) => (
                            <option key={aandoening.id} value={aandoening.naam}>
                                {aandoening.naam}
                            </option>
                        ))}
                    </select>

                    <p>Het keis is: {geselecteerdeAandoeningen.map(option => `${option.naam} `).join(', ')}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="commerciele" >Commerciele </label>
                    <input type="checkbox" className="form-check-input checkBox" id="commerciele" placeholder="commerciele" value={commerciele} onChange={(e) => { setCommerciele(e.target.checked) }} />
                </div>

                <div className="form-group">
                    <label htmlFor="minderjarig" id="minderjarigCheck">Ben je minder dan 18? </label>
                    <input type="checkbox" className="form-check-input checkBox" id="minderjarig" placeholder="minderjarig" value={minderjarig} onChange={(e) => { setMinderjarig(e.target.checked) }} />
                </div>

                {minderjarig && (<Voogdformule onFormChange={handleFormChange} /> ) }

                <button type="submit" className="btn btn-primary mt-2">Registreer</button>
                <p className="registreer-tekst"><Link to="/login">Al een account? Inloggen!</Link></p>
            </form>

            
        </div>
    );
}

export default RegistreerErvaringsdeskundige;
