import 'bootstrap/dist/css/bootstrap.css';
import '../../css/styles.css';
import { useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { NavLink } from 'react-router-dom';

function RegistreerBedrijf() {
    const REGISTREER_URL = '/api/authenticatie/registreer-bedrijf';
    const [bedrijfsnaam, setBedrijfsnaam] = useState("");
    const [email, setEmail] = useState("");
    const [locatie, setLocatie] = useState("");
    const [website, setWebsite] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");
    const [omschrijving, setOmschrijving] = useState("");
    const [telefoonnummer, setTelefoonnummer] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [bericht, setBericht] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    console.log(isLoading);
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(REGISTREER_URL, {
                bedrijfsnaam: bedrijfsnaam,
                email: email,
                locatie: locatie,
                telefoonnummer: telefoonnummer,
                linkNaarBedrijf: website,
                wachtwoord: wachtwoord,
                omschrijving: omschrijving
            });
            setSuccess(true);
            setBericht(
                "Account is aangemaakt! Een medewerker zal het informatie eerst bekijken en na een tijdje zal uw account geactiveerd worden."
            + " Er zal een bevestiging verstuurd worden naar: " + email + " wanneer u kunt inloggen!");
            console.log(response);
        }
        catch (err){
            // console.log(err?.request?.response);
            setError(true);
            setBericht(err?.message);
            console.log(err);
        }
        finally {
            setLoading(false);
        }
  /*      console.log(email, locatie, wachtwoord);*/
    }
    return (
        <div className="container">
            <Loading isLoading={isLoading}>
                {success ? 
                <>
        <h1>{bericht}</h1>
        <NavLink to="/login">Naar login</NavLink>
        </> : <>
            <div className="header text-center">
                <h1>Registreer uw Bedrijf!</h1>
                { error && <p className='text-danger'>{bericht}</p>} 
            </div>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="bedrijfsnaam">Bedrijfsnaam</label>
                    <input type="text" required className="form-control" id="bedrijfsnaam" placeholder="Bedrijfsnaam" value={bedrijfsnaam} onChange={(e) => { setBedrijfsnaam(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Emailadres</label>
                    <input type="text" required className="form-control" id="email" placeholder="voorbeeld@voorbeeld.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="locatie">Locatie</label>
                    <input type="text" required className="form-control" id="locatie" placeholder="1111DD voorbeeldstraat 999" value={locatie} onChange={(e) => { setLocatie(e.target.value) }}  />
                </div>
                <div className="form-group">
                     <label htmlFor="telefoonnummer">Telefoonnummer</label>
                     <input required type="text" className="form-control" id="telefoonnummer" placeholder="0611111111" value={telefoonnummer} onChange={(e) => { setTelefoonnummer(e.target.value);}} />
                  </div>
                <div className="form-group">
                    <label htmlFor="website">Website van uw bedrijf</label>
                    <input type="text" required className="form-control" id="website" placeholder="voorbeeld.nl" value={website} onChange={(e) => { setWebsite(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="omschrijving">Beschrijf wat uw bedrijf doet</label>
                    <textarea required className="form-control" id="omschrijving" placeholder="Omschrijving" value={omschrijving} onChange={(e) => { setOmschrijving(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="wachtwoord">Wachtwoord (tenminste 1 hoofdletter, 1 cijfer, 1 speciale teken)</label>
                    <input type="password" required className="form-control" id="wachtwoord" placeholder="Wachtwoord" value={wachtwoord} onChange={(e) => { setWachtwoord(e.target.value) }} />
                </div>

                <button type="submit" className="btn btn-primary mt-2">Registreer</button>
                <p className="registreer-tekst"><Link to="/login">Al een account? Log in!</Link></p>
            </form>
            </>}
            </Loading>
        </div>
    );
}

export default RegistreerBedrijf;
