import "bootstrap/dist/css/bootstrap.css";
import "../../css/styles.css";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link, NavLink } from "react-router-dom";
import VoogdFormulier from "./VoogdFormulier";
import Loading from "../Loading";

function RegistreerErvaringsdeskundige() {
  const REGISTREER_URL = "/api/Authenticatie/registreer-ervaringsdeskundige";
  const benaderingOpties = ["Email", "Telefoonnummer", "Geen voorkeur"];
  const [bericht, setBericht] = useState("");
  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [telefoonnummer, setTelefoonnummer] = useState("");
  const [voorkeurBenadering, setVoorkeurBenadering] = useState(benaderingOpties[0]);
  const [typeOnderzoeken, setTypeOnderzoeken] = useState([]);
  const [aandoeningen, setAandoeningen] = useState([]);
  const [hulpmiddelen, setHulmiddelen] = useState([]);
  const [voogd, setVoogd] = useState([]);
  const [commerciele, setCommerciele] = useState(false);
  const [minderjarig, setMinderjarig] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(commerciele);
  },[commerciele])
  const fetchOnderzoeken = async () => {
    try {
        const responsTypeOnderzoeken = await axios(
            "/api/Ervaringsdeskundige/TypeOnderzoeken"
          );
        const responsAandoeningen = await axios(
            "/api/Ervaringsdeskundige/Aandoeningen"
          );
          const responsHulpmiddelen = await axios(
            "/api/Ervaringsdeskundige/Hulpmiddelen"
          );
          setTypeOnderzoeken(responsTypeOnderzoeken.data);
          setAandoeningen(responsAandoeningen.data);
          setHulmiddelen(responsHulpmiddelen.data);
    }
   catch(err) {
    setError(true);
    setBericht("Probleem met database-> "+err);
   }
   finally {
    setLoading(false);
   }
};

  useEffect(() => {
    fetchOnderzoeken();
  }, []);

  const [geselecteerdeTypes, setGeselecteerdeTypes] = useState([]);
  const [geselecteerdeAandoeningen, setGeselecteerdeAandoeningen] = useState([]);
  const [geselecteerdeHulpmiddelen, setGeselecteerdeHulmiddelen] = useState([]);

  const selecteerOnderzoekType = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => {
      const onderzoek = typeOnderzoeken.find(
        (item) => item.naam === option.value
      );
      return { id: onderzoek.id, naam: onderzoek.naam };
    });
    setGeselecteerdeTypes(selected);
  };

  const selecteerHulpmiddel = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => {
      const hulpmiddel = hulpmiddelen.find(
        (item) => item.naam === option.value
      );
      return { id: hulpmiddel.id, naam: hulpmiddel.naam };
    });
    setGeselecteerdeHulmiddelen(selected);
  };

  const selecteerAandoening = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => {
      const aandoening = aandoeningen.find(
        (item) => item.naam === option.value
      );
      return { id: aandoening.id, naam: aandoening.naam };
    });
    setGeselecteerdeAandoeningen(selected);
  };

  const handleFormChange = (formData) => {
    setVoogd(formData);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        REGISTREER_URL,
        {
          voornaam: voornaam,
          achternaam: achternaam,
          wachtwoord: wachtwoord,
          email: email,
          postcode: postcode,
          minderjarig: minderjarig,
          telefoonnummer: telefoonnummer,
          aandoeningen: geselecteerdeAandoeningen,
          typeOnderzoeken: geselecteerdeTypes,
          hulpmiddelen: geselecteerdeHulpmiddelen,
          voorkeurBenadering: voorkeurBenadering,
          commerciële: commerciele,
          voogdVoornaam: voogd.voogdVoornaam,
          voogdAchternaam: voogd.voogdAchternaam,
          voogdTelefoonnummer: voogd.voogdTelefoonnummer,
          voogdEmail: voogd.voogdEmail,
        }
        // { "Access-Control-Allow-Crendentials": true }
      );
      setBericht(response?.data["message"]);
      setSuccess(true);
    }
    catch (err) {
        setError(true);
        setBericht(err.message);
        console.log("error (kan wachtwoord probleem zijn): " + JSON.stringify(err));
    }
    finally {
        setLoading(false);
    }
  }
  return (
    <div className="container">
         <Loading isLoading={isLoading}>
        {success ? 
        <>
        <h1>{bericht}</h1>
        <NavLink to="/login">Naar login</NavLink>
        </>
       : 
        <>
        <div className="header text-center">
        <h1>Registreer als ervaringsdeskundige</h1>
        {error ? <p className="text-danger">{bericht}</p> : null}
      </div>
      
      <form onSubmit={handleSubmit} className="row">
        <div className="form-group col-md-6">
          <label htmlFor="voornaam">Voornaam</label>
          <input
          required
            type="text"
            className="form-control"
            id="voornaam"
            placeholder="Tim"
            value={voornaam}
            onChange={(e) => {
              setVoornaam(e.target.value);
            }}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="achternaam">Achternaam</label>
          <input
          required
            type="text"
            className="form-control"
            id="achternaam"
            placeholder="Liu"
            value={achternaam}
            onChange={(e) => {
              setAchternaam(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Emailadres</label>
          <input
          required
            type="email"
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
          <label htmlFor="postcode">Postcode</label>
          <input
          required
            type="text"
            className="form-control"
            id="postcode"
            placeholder="1111DD"
            value={postcode}
            onChange={(e) => {
              setPostcode(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefoonnummer">Telefoonnummer</label>
          <input
          required
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
          <label htmlFor="wachtwoord">Wachtwoord (tenminste 1 hoofdletter, 1 cijfer, 1 speciale teken)</label>
          <input
          required
            type="password"
            className="form-control"
            id="wachtwoord"
            placeholder="Wachtwoord"
            value={wachtwoord}
            onChange={(e) => {
              setWachtwoord(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
        <label htmlFor="voorkeurBenadering">
            Voorkeur benadering voor bedrijven/stichting
          </label>
          <select required id="voorkeurBenadering" className="form-select" aria-label="Voorkeur benadering voor bedrijven/stichting" 
          onChange={(e) => {setVoorkeurBenadering(e.target.value);}}>

                {benaderingOpties.map((optie, key) => {
                    return <option key={key} value={optie}>{optie}</option>
                })}
          </select>
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="hulpmiddel">
            Kies de hulmiddel(en) dat u gebruikt (niet verplicht)
          </label>
          <select
            id="hulpmiddel"
            className="form-control"
            multiple
            value={geselecteerdeHulpmiddelen.map((option) => option.naam)}
            onChange={selecteerHulpmiddel}>
            {hulpmiddelen.map((hulpmiddel) => (
              <option key={hulpmiddel.id} value={hulpmiddel.naam}>{hulpmiddel.naam}</option>
            ))}
          </select>

        <div className="selectie-container">
            <p className="selectie">Uw geselecteerde hulpmiddelen:</p>
            <span className="gekozen">{geselecteerdeHulpmiddelen.map((option) => ` ${option.naam}`).join(",")}</span>
        </div>
          
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="typeOnderzoek">
            Kies uw voorkeur voor de type onderzoeken 
          </label>
          <select
            id="typeOnderzoek"
            className="form-control"
            multiple
            // size={3}
            value={geselecteerdeTypes.map((option) => option.naam)}
            onChange={selecteerOnderzoekType}>
            {typeOnderzoeken.map((typeOnderzoek) => (
              <option key={typeOnderzoek.id} value={typeOnderzoek.naam}>{typeOnderzoek.naam}</option>
            ))}
          </select>

        <div className="selectie-container">
            <p className="selectie">Uw geselecteerde onderzoekstypes:</p>
            <span className="gekozen">{geselecteerdeTypes.map((option) => ` ${option.naam}`).join(",")}</span>
        </div>
          
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="Aandoeningen">Kies de toepassende aandoening(en)</label>
          <select
          required
            id="Aandoeningen"
            className="form-control"
            multiple
            value={geselecteerdeAandoeningen.map((option) => option.naam)}
            onChange={selecteerAandoening}
          >
            {aandoeningen.map((aandoening) => (
              <option key={aandoening.id} value={aandoening.naam}>
                {aandoening.naam}
              </option>
            ))}
          </select>
          <div className="selectie-container">
            <p className="selectie">Uw geselecteerde aandoeningen:</p>
            <span className="gekozen">{geselecteerdeAandoeningen.map((option) => ` ${option.naam}`).join(",")}</span>
          </div>
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            className="form-check-input checkBox"
            id="commerciele"
            placeholder="commerciele"
            value={commerciele}
            onChange={(e) => {
              setCommerciele(e.target.checked);
            }}
          />
          <label htmlFor="commerciele">
            Wilt u toestaan dat 3de partijen u mag bereiken?
          </label>
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            className="form-check-input checkBox"
            id="minderjarig"
            placeholder="minderjarig"
            value={minderjarig}
            onChange={(e) => {
              setMinderjarig(e.target.checked);
            }}
          />
          <label htmlFor="minderjarig" id="minderjarigCheck">
            Bent u jonger dan 18?
          </label>
        </div>

        {minderjarig && <VoogdFormulier onFormChange={handleFormChange} />}

        <button type="submit" className="btn btn-primary mt-2">
          Registreer
        </button>
        <p className="registreer-tekst">
          <Link to="/login">Al een account? Log in!</Link>
        </p>
      </form>
        </>
      }
      </Loading>
    </div>
  );
}

export default RegistreerErvaringsdeskundige;
