import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';

function ErvaringsdeskundigeHomePagina() {
    const bewerkKnopStyle = { "color": "blue", "textDecoration": "none", "marginRight": "10px" };
    const verwijderKnopStyle = { "color": "red", "textDecoration": "none", "fontWeight": "700" };

    const {userAuth} = useAuth();
    const [ervaringsdeskundige, setErvaringsdeskundige] = useState({});

    const fetchErvaringsdeskundige = async () => {
        try {
            const response = await axios.get(`/api/ervaringsdeskundige`, {
                headers: {
                    'Authorization': `Bearer ${userAuth.token}`
                }
            });
            setErvaringsdeskundige(response.data);
        } catch (error) {
            console.error('Fout bij het ophalen van gegevens:', error);
        }
    }

        
    useEffect(() => {
        fetchErvaringsdeskundige();
    }, []);

    return (
        <div className="container">
            <h2>Profiel</h2>
            <p>{userAuth.token}</p>
            <div className="row">
                <div className="col-md-4">
                    <ul className="list-unstyled">
                        <li>Voornaaam: { ervaringsdeskundige.voornaam }</li>
                        <li>Achternaam: Can</li>
                        <li>Email: timcan@example.com</li>
                        <li>Postcode: 1234 AB</li>
                        <li>Plaats: Den Haag</li>
                        <li>Wachtwoord: *********</li>
                        <li>Telefoon: +3161235923</li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <ul className="list-unstyled">
                        <li>Beperking: visueel</li>
                        <li>Hulpmiddel: keyboard, software</li>
                        <li>Aandoening: blind</li>
                        <li>Benadering: mail</li>
                        <li>Commercieel: ja</li>
                        <li>Onderzoek voorkeur: vragenlijst</li>
                        <li>Volwassene: nee</li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <ul className="list-unstyled">
                        <li>Voogd voornaam:</li>
                        <li>Pieter</li>
                        <li>Voogd achternaam:</li>
                        <li>Post</li>
                        <li>Voogd email:</li>
                        <li>pieterpost@example.com</li>
                    </ul>
                </div>
            </div>
            <div className="column">
                <a href="/ervaringsdeskundige/profiel/bewerken" style={bewerkKnopStyle}>bewerk</a>
                <a href="#" style={verwijderKnopStyle}>verwijder account</a>
            </div>
        </div>
    );
}

export default ErvaringsdeskundigeHomePagina