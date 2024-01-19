import "bootstrap/dist/css/bootstrap.css";
import "../../css/styles.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { NavLink } from "react-router-dom";

function RegistreerBedrijf() {
  const REGISTREER_URL = "/api/authenticatie/registreer-bedrijf";
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

  useEffect(() => {
    setError(false);
    setBericht('');
  },[bedrijfsnaam, locatie, email, website, wachtwoord, omschrijving, telefoonnummer])

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(REGISTREER_URL, {
        bedrijfsnaam: bedrijfsnaam,
        email: email,
        locatie: locatie,
        PhoneNumber: telefoonnummer,
        linkNaarBedrijf: website,
        wachtwoord: wachtwoord,
        omschrijving: omschrijving,
      });
      setSuccess(true);
      setBericht(
        "Account is aangemaakt! Een medewerker zal het informatie eerst bekijken en na een tijdje zal uw account geactiveerd worden." +
          " Er zal een bevestiging verstuurd worden naar: " +
          email +
          " wanneer u kunt inloggen!"
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      if (err?.message === "Network Error") {
        setBericht("Kan database niet bereiken... Probeer later nog een keer.");
      } else if (err?.request?.response) {
        setBericht(JSON.parse(err?.request?.response)?.message);
      } else {
        setBericht(JSON.stringify(err?.message));
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container">
      <Loading isLoading={isLoading}>
        {success ? (
          <>
            <h1 aria-live="assertive">{bericht}</h1>
            <NavLink to="/login" className="naar-login">Naar login</NavLink>
          </>
        ) : (
          <>
            <div className="header text-center">
              <h1>Registreer uw Bedrijf!</h1>
              <p className={error ? "text-danger" : "buitenscherm"} tabIndex={0} aria-live="assertive">Foutmelding: {bericht}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="bedrijfsnaam">Bedrijfsnaam</label>
                <input
                  type="text"
                  required
                  aria-required
                  className="form-control"
                  id="bedrijfsnaam"
                  placeholder="Bedrijfsnaam"
                  value={bedrijfsnaam}
                  onChange={(e) => {
                    setBedrijfsnaam(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Emailadres</label>
                <input
                  type="email"
                  required
                  aria-required
                  className="form-control"
                  id="email"
                  placeholder="voorbeeld@voorbeeld.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="locatie">Locatie</label>
                <input
                  type="text"
                  required
                  aria-required
                  className="form-control"
                  id="locatie"
                  placeholder="1111DD voorbeeldstraat 999"
                  value={locatie}
                  onChange={(e) => {
                    setLocatie(e.target.value);
                  }}
                />
            </div>
            <div className="form-group">
            <label htmlFor="telefoonnummer">Telefoonnummer</label>
             <input
               required
               aria-required
               type="text"
               className="form-control"
               id="telefoonnummer"
               placeholder="0611111111"
               value={telefoonnummer}
               onChange={(e) => {
               setTelefoonnummer(e.target.value);
               }}
               />
             </div>
              <div className="form-group">
                <label htmlFor="website">Website van uw bedrijf</label>
                <input
                  type="text"
                  required
                  aria-required
                  className="form-control"
                  id="website"
                  placeholder="voorbeeld.nl"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="omschrijving">
                  Beschrijf wat uw bedrijf doet
                </label>
                <textarea
                  required
                  aria-required
                  className="form-control"
                  id="omschrijving"
                  placeholder="Omschrijving"
                  value={omschrijving}
                  onChange={(e) => {
                    setOmschrijving(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="wachtwoord">
                  Wachtwoord 
                </label>
                <input
                  type="password"
                  required
                  aria-required
                  className="form-control"
                  id="wachtwoord"
                  placeholder="(tenminste 1 hoofdletter, 1 kleine letter, 1
                  cijfer, 1 speciale teken en 6 letters in totaal)"
                  value={wachtwoord}
                  onChange={(e) => {
                    setWachtwoord(e.target.value);
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                Registreer
              </button>
              <p className="registreer-tekst">
                <Link to="/login">Al een account? Log in!</Link>
              </p>
            </form>
          </>
        )}
      </Loading>
    </div>
  );
}

export default RegistreerBedrijf;
