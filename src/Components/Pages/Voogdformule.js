import 'bootstrap/dist/css/bootstrap.css';
import '../../css/styles.css';
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';

function Voogdformule() {
    const [voogdVoornaam, setVoogdVoornaam] = useState("");
    const [voogdAchternaam, setVoogdAchternaam] = useState("")
    const [voogdEmail, setVoogdEmail] = useState("")
    const [voogdTelefoonnummer, setVoogdTelefoonnummer] = useState("")

    return (
        <div className="voogdFormule">
            <div className="form-group">
                <label htmlFor="voornaam">voogdVoornaam</label>
                <input type="text" className="form-control" id="voornaam" placeholder="Tim" value={voogdVoornaam} onChange={(e) => { setVoogdVoornaam(e.target.value) }} />
            </div>
            <div className="form-group">
                <label htmlFor="achternaam">voogdAchternaam</label>
                <input type="text" className="form-control" id="achternaam" placeholder="Liu" value={voogdAchternaam} onChange={(e) => { setVoogdAchternaam(e.target.value) }} />
            </div>
            <div className="form-group">
                <label htmlFor="email">voogdEmailadres</label>
                <input type="text" className="form-control" id="email" placeholder="voorbeeld@voorbeeld.com" value={voogdEmail} onChange={(e) => { setVoogdEmail(e.target.value) }} />
            </div>
            <div className="form-group">
                <label htmlFor="telefoonnummer">voogdTelefoonnummer</label>
                <input type="text" className="form-control" id="telefoonnummer" placeholder="0611111111" value={voogdTelefoonnummer} onChange={(e) => { setVoogdTelefoonnummer(e.target.value) }} />
            </div>
        </div>
    );
}

export default Voogdformule;