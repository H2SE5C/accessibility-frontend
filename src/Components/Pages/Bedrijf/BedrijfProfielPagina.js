import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import '../../../css/BedrijfProfielPagina.css';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function BedrijfProfielPagina() {

    const { userAuth } = useAuth();
    const [bedrijfsnaam, setBedrijfsnaam] = useState("");
    const [email, setEmail] = useState("");
    const [locatie , setLocatie] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");
    const [beschrijving, setBeschrijving] = useState("");
    const [telefoon, setTelefoon] = useState("");
    const [link, setLink] = useState("");



    return (
        <div class="row">
            <div class="panel">
                <div class="profiel-info">
                    <h1>Bedrijfsprofiel</h1>
                    <div class="row">
                        <div class="bio-row">
                            <p><span>Bedrijfsnaam </span>: {bedrijfsnaam}</p>
                        </div>
                        <div class="bio-row">
                            <p><span>E-mail </span>: {email}</p>
                        </div>
                        <div class="bio-row">
                            <p><span>Locatie </span>:{locatie}</p>
                        </div>
                        <div class="bio-row">
                            <p><span>Wachtwoord</span>: {wachtwoord}</p>
                        </div>
                        <div class="bio-row">
                            <p><span>Beschrijving </span>: {beschrijving}</p>
                        </div>
                        <div class="bio-row">
                            <p><span>Telefoon </span>: {telefoon}</p>
                        </div>
                        <div class="bio-row">
                            <p><span>Website </span>: {link}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Wijzigen</button>
                <button type="reset" class="btn btn-default">Annuleren</button>
            </div>
        </div>
    );
}

export default BedrijfProfielPagina;