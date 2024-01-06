import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
function RegistreerBedrijf() {
    const REGISTREER_URL = '/api/authenticatie/registreer-bedrijf';
    const [bedrijfsnaam, setBedrijfsnaam] = useState("");
    const [email, setEmail] = useState("");
    const [locatie, setLocatie] = useState("");
    const [website, setWebsite] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios(REGISTREER_URL);
            console.log(response);
        }
        catch (err){
            console.log(err);
        }
  /*      console.log(email, locatie, wachtwoord);*/
    }
    return (
        <div className="container">
            <div className="header text-center">
                <h1>Registreer uw Bedrijf!</h1>
            </div>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="bedrijfsnaam">Bedrijfsnaam</label>
                    <input type="text" className="form-control" id="bedrijfsnaam" placeholder="Bedrijfsnaam" value={bedrijfsnaam} onChange={(e) => { setBedrijfsnaam(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Emailadres</label>
                    <input type="text" className="form-control" id="email" placeholder="voorbeeld@voorbeeld.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="locatie">Locatie</label>
                    <input type="text" className="form-control" id="locatie" placeholder="1111DD voorbeeldstraat 999" value={locatie} onChange={(e) => { setLocatie(e.target.value) }}  />
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website van uw bedrijf</label>
                    <input type="text" className="form-control" id="website" placeholder="voorbeeld.nl" value={website} onChange={(e) => { setWebsite(e.target.value) }} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="wachtwoord">Wachtwoord</label>
                    <input type="password" className="form-control" id="wachtwoord" placeholder="Wachtwoord" value={wachtwoord} onChange={(e) => { setWachtwoord(e.target.value) }} />
                </div>

                <button type="submit" className="btn btn-primary mt-2">Registreer</button>
            </form>
        </div>
    );
}

export default RegistreerBedrijf;
