import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import '../../../css/BedrijfProfielPagina.css';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';

function BedrijfProfielPagina() {
    const {userAuth} = useAuth();
    const [bedrijf, setBedrijf] = useState({});

    const fetchBedrijf = async () => {
        try {
            const response = await axios.get(`/api/bedrijf/profiel`, {
                headers: {
                    'Authorization': `Bearer ${userAuth.token}`
                }
            });
            setBedrijf(response.data);
        } catch (error) {
            console.error('Fout bij het ophalen van bedrijfsgegevens:', error);
        }
    }

        
    useEffect(() => {
        fetchBedrijf();
    }, []);

    return (
        <div className="row">
            <div className="panel">
                    <div className="profiel-info">
                        <h1>Bedrijfsprofiel</h1>
                        <div className="row">
                            <div className="bio-row">
                                <p><span>Bedrijfsnaam </span>: {bedrijf.bedrijfsnaam}</p>
                            </div>
                            <div className="bio-row">
                                <p><span>E-mail </span>: {bedrijf.email}</p>
                            </div>
                            <div className="bio-row">
                                <p><span>Locatie </span>: {bedrijf.locatie}</p>
                            </div>
                            <div className="bio-row">
                                <p><span>Wachtwoord</span>: *******</p>
                            </div>
                            <div className="bio-row">
                                <p><span>Beschrijving </span>: {bedrijf.omschrijving}</p>
                            </div>
                            <div className="bio-row">
                                <p><span>Telefoon </span>: {bedrijf.phonenumber}</p>
                            </div>
                            <div className="bio-row">
                                <p><span>Website </span>: {bedrijf.linkNaarBedrijf}</p>
                            </div>
                        </div>
                    </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Wijzigen</button>
                    <button type="reset" className="btn btn-default">Annuleren</button>
                </div>
            </div>
        </div>
    );
}

export default BedrijfProfielPagina;