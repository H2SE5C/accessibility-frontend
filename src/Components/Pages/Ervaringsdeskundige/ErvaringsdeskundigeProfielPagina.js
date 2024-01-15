import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';

function ErvaringsdeskundigeProfielPagina() {
    const bewerkKnopStyle = { "color": "blue", "textDecoration": "none", "marginRight": "10px", "backgroundColor": "transparent", "border": "none" };
    const verwijderKnopStyle = { "color": "red", "textDecoration": "none", "fontWeight": "700", "backgroundColor": "transparent", "border": "none" };

    const {userAuth} = useAuth();
    const [ervaringsdeskundige, setErvaringsdeskundige] = useState({});
    const [tempErvaringsdeskundige, setTempErvaringsdeskundige] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const fetchErvaringsdeskundige = async () => {
        try {
            const response = await axios.get(`/api/ervaringsdeskundige/profiel`, {
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

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setTempErvaringsdeskundige(ervaringsdeskundige);
        }
    };

    const handleInputChange = (event) => {
        setTempErvaringsdeskundige({ ...tempErvaringsdeskundige, [event.target.name]: event.target.value });
    };

    const handleSave = async () => {
        try {
            await updateErvaringsdeskundige(tempErvaringsdeskundige);
            setSaveSuccess(true);
            setIsEditing(false);
        } catch (error) {
            console.error('Fout bij het opslaan van gegevens:', error);
            setSaveSuccess(false);
        }
    };

    const handleCancel = () => {
        setTempErvaringsdeskundige(ervaringsdeskundige);
        setIsEditing(false);
    };

    const updateErvaringsdeskundige = async (updatedData) => {
        try {
            await axios.put(`/api/ervaringsdeskundige/profiel`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${userAuth.token}`
                }
            });
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            { !isEditing ? (
            <div className="container">
            <h2>Profiel</h2>
            <div className="row">
                <div className={ ervaringsdeskundige.voogd == null ? "col-md-6" : "col-md-4" }>
                    <ul className="list-unstyled">
                        <li>Voornaaam: { ervaringsdeskundige.voornaam }</li>
                        <li>Achternaam: { ervaringsdeskundige.achternaam }</li>
                        <li>Email: { ervaringsdeskundige.email }</li>
                        <li>Postcode: { ervaringsdeskundige.postcode }</li>
                        <li>Plaats: { ervaringsdeskundige.plaats }</li>
                        <li>Wachtwoord: *********</li>
                        <li>Telefoon: { ervaringsdeskundige.phoneNumber }</li>
                    </ul>
                </div>
                <div className={ ervaringsdeskundige.voogd == null ? "col-md-6" : "col-md-4" }>
                    <ul className="list-unstyled">
                        <li>Beperking: visueel -</li>
                        <li>Hulpmiddel: keyboard, software -</li>
                        <li>Aandoening: blind -</li>
                        <li>Benadering: { ervaringsdeskundige.voorkeurBenadering }</li>
                        <li>Commercieel: { ervaringsdeskundige.commerciele ? "ja" : "nee" }</li>
                        <li>Onderzoek voorkeur: vragenlijst -</li>
                        <li>Volwassene: { ervaringsdeskundige.minderjarig ? "nee" : "ja" }</li>
                    </ul> 
                </div>
                { ervaringsdeskundige.voogd != null &&
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
                }
            </div>
            <div className="column">
                <button type="button" style={bewerkKnopStyle} onClick={toggleEdit} className="btn btn-primary">bewerk</button>
                <button type="button" style={verwijderKnopStyle} className="btn btn-primary">verwijder account</button>
            </div>
        </div>
        ) : ( 
        <div className="container">
            <form>
                <div className="row">
                    <div className={ervaringsdeskundige.minderjarig ? "form-group col-md-4" : "form-group col-md-6"}>
                        <div className="form-group row">
                            <label htmlFor="inputVoornaam" className="col-md-5 col-form-label">Voornaam:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputVoornaam" placeholder="voornaam" defaultValue={ ervaringsdeskundige.voornaam }/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAchternaam" className="col-md-5 col-form-label">Achternaam:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputAchternaam" placeholder="achternaam" defaultValue={ ervaringsdeskundige.achternaam }/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail" className="col-md-5 col-form-label">Email:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputEmail" placeholder="email" defaultValue={ ervaringsdeskundige.email }/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPostcode" className="col-md-5 col-form-label">Postcode:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputPostcode" placeholder="postcode" defaultValue={ ervaringsdeskundige.postcode }/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPlaats" className="col-md-5 col-form-label">Plaats:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputPlaats" placeholder="plaats" defaultValue={ ervaringsdeskundige.plaats }/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputWachtwoord" className="col-md-5 col-form-label">Wachtwoord:</label>
                            <div className="col-md-7">
                                <input type="password" className="form-control" id="inputWachtwoord" placeholder="wachtwoord"/>
                            </div>
                        <div className="form-group row">
                            <label htmlFor="inputTelefoon" className="col-md-5 col-form-label">Telefoon:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputTelefoon" placeholder="telefoon" pattern="[0-9]{10}" defaultValue={ ervaringsdeskundige.phoneNumber }/>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className={ervaringsdeskundige.minderjarig ? "form-group col-md-4" : "form-group col-md-6"}>
                        <div className="form-group row">
                            <label htmlFor="inputBeperking" className="col-md-5 col-form-label">Beperking:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputBeperking" placeholder="beperking"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputBeperkingToevoegen" className="col-md-5 col-form-label">Beperking toevoegen:</label>
                            <div className="col-md-7">
                                <select className="form-control" id="inputBeperkingToevoegen">
                                    <option>-</option>
                                    <option>Visueel</option>
                                    <option>Motorisch</option>
                                    <option>Verstandelijk</option>
                                    <option>Auditief</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputHulpmiddel" className="col-md-5 col-form-label">Hulpmiddel:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputHulpmiddel" placeholder="hulpmiddel"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputHulpmiddelToevoegen" className="col-md-5 col-form-label">Hulpmiddel toevoegen:</label>
                            <div className="col-md-7">
                                <select className="form-control" id="inputHulpmiddelToevoegen">
                                    <option>-</option>
                                    <option>Software</option>
                                    <option>Keyboard</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAandoening" className="col-md-5 col-form-label">Aandoening:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="inputAandoening" placeholder="Aandoening"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAandoeningToevoegen" className="col-md-5 col-form-label">Aandoening toevoegen:</label>
                            <div className="col-md-7">
                                <select className="form-control" id="inputAandoeningToevoegen">
                                    <option>-</option>
                                    <option>Software</option>
                                    <option>Keyboard</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputBenadering" className="col-md-5 col-form-label">Benadering:</label>
                            <div className="col-md-7">
                                <select className="form-control" id="inputBenadering">
                                    { ervaringsdeskundige.voorkeurBenadering === "geen voorkeur" ? <option selected> Geen voorkeur</option> : <option> Geen voorkeur</option> }
                                    { ervaringsdeskundige.voorkeurBenadering === "email" ? <option selected> Email</option> : <option> Email</option> }
                                    { ervaringsdeskundige.voorkeurBenadering === "telefoon" ? <option selected> Telefoon</option> : <option> Telefoon</option> }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputVoorkeurOnderzoek" className="col-md-5 col-form-label">Voorkeur onderzoek:</label>
                            <div className="col-md-7">
                                <select className="form-control" id="inputVoorkeurOnderzoek">
                                    <option>Vragenlijst</option>
                                    <option>Fysiek</option>
                                    <option>Website test</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputCommercieel" className="col-md-5 control-label">Commercieel: </label>
                            <div className="col-md-7">
                                { ervaringsdeskundige.commerciele ? (
                                    <div>
                                        <label className="radio-inline"> <input type="radio" name="inputCommercieel" id="commercieelJa" value="commercieelJa" defaultChecked /> Ja </label>
                                        <label className="radio-inline"> <input type="radio" name="inputCommercieel" id="commercieelNee" value="commercieelNee"/> Nee </label>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="radio-inline"> <input type="radio" name="inputCommercieel" id="commercieelJa" value="commercieelJa" /> Ja </label>
                                        <label className="radio-inline"> <input type="radio" name="inputCommercieel" id="commercieelNee" value="commercieelNee" defaultChecked/> Nee </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputVolwassene" className="col-md-5 control-label">Volwassene: </label>
                            <div className="col-md-7">
                                { ervaringsdeskundige.minderjarig ? (
                                    <div>
                                        <label className="radio-inline"> <input type="radio" name="inputVolwassene" id="volwasseneJa" value="volwasseneJa"/> Ja </label>
                                        <label className="radio-inline"> <input type="radio" name="inputVolwassene" id="volwasseneNee" value="volwasseneNee" defaultChecked/> Nee </label>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="radio-inline"> <input type="radio" name="inputVolwassene" id="volwasseneJa" value="volwasseneJa" defaultChecked/> Ja </label>
                                        <label className="radio-inline"> <input type="radio" name="inputVolwassene" id="volwasseneNee" value="volwasseneNee"/> Nee </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    { ervaringsdeskundige.minderjarig &&
                        <div className="form-group col-md-4">
                            <div className="form-group row">
                                <label htmlFor="inputVoogdVoornaam" className="col-md-5 col-form-label">Voornaam:</label>
                                <div className="col-md-7">
                                    <input type="text" className="form-control" id="inputVoogdVoornaam" placeholder="voogd voornaam"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputVoogdAchternaam" className="col-md-5 col-form-label">Achternaam:</label>
                                <div className="col-md-7">
                                    <input type="text" className="form-control" id="inputVoogdAchternaam" placeholder="voogd achternaam"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputVoogdEmail" className="col-md-5 col-form-label">Email:</label>
                                <div className="col-md-7">
                                    <input type="text" className="form-control" id="inputVoogdEmail" placeholder="voogd email"/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    <button type="button" onClick={handleSave} className="btn btn-primary">Opslaan</button>
                    <button type="button" onClick={handleCancel} className="btn btn-default">Annuleren</button>
                </div>
            </form>
        </div>
        )}
        </div>
    );
}

export default ErvaringsdeskundigeProfielPagina;