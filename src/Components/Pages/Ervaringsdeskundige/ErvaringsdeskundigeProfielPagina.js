import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import axios from '../../../api/axios';

function ErvaringsdeskundigeProfielPagina() {
    const bewerkKnopStyle = { "color": "blue", "textDecoration": "none", "marginRight": "10px", "backgroundColor": "transparent", "border": "none" };
    const verwijderKnopStyle = { "color": "red", "textDecoration": "none", "fontWeight": "700", "backgroundColor": "transparent", "border": "none" };
    const axiosPrivate = useAxiosPrivate();
    const {userAuth} = useAuth();
    const navigate = useNavigate();
    const [ervaringsdeskundige, setErvaringsdeskundige] = useState({});
    const [tempErvaringsdeskundige, setTempErvaringsdeskundige] = useState({});
    const [isEditing, setIsEditing] = useState(false);

   
    useEffect(() => {
        const fetchErvaringsdeskundige = async () => {
            try {
                const response = await axiosPrivate.get(`/api/ervaringsdeskundige/profiel`);
                setErvaringsdeskundige(response.data);
            } catch (error) {
                console.error('Fout bij het ophalen van gegevens:', error);
            }
        }

        fetchErvaringsdeskundige();
    }, [axiosPrivate]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setTempErvaringsdeskundige(ervaringsdeskundige);
        }
    };

    const handleInputChange = (event) => {
        console.log({ ...tempErvaringsdeskundige, [event.target.name]: event.target.value });
        setTempErvaringsdeskundige({ ...tempErvaringsdeskundige, [event.target.name]: event.target.value });
    };

    const handleSave = async () => {
        try {
            await updateErvaringsdeskundige(tempErvaringsdeskundige);
            setIsEditing(false);
            setErvaringsdeskundige(tempErvaringsdeskundige);
        } catch (error) {
            console.error('Fout bij het opslaan van gegevens:', error);
        }
    };

    const handleCancel = () => {
        setTempErvaringsdeskundige(ervaringsdeskundige);
        setIsEditing(false);
    };

    const updateErvaringsdeskundige = async (updatedData) => {
        try {
            await axios.put(`/api/Ervaringsdeskundige/update`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${userAuth.token}`
                }
            });
        } catch (error) {
            throw error;
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden gemaakt.');
        if(confirmed) {
            try {
                await axios.delete(`/api/ervaringsdeskundige/delete-profiel`, {
                    headers: {
                        'Authorization': `Bearer ${userAuth.token}`
                    }
                });
                navigate('/');
            } catch (error) {
                console.error('Fout bij het verwijderen van het account:', error);
            }
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
                <button type="button" style={verwijderKnopStyle} onClick={handleDelete} className="btn btn-primary">verwijder account</button>
            </div>
        </div>
        ) : ( 
        <div className="container">
            <form>
                <div className="row">
                    <div className="form-group col-md-4">
                        <div className="form-group row">
                            <label htmlFor="voornaam" className="col-md-5 col-form-label">Voornaam:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="voornaam" placeholder="voornaam" defaultValue={ tempErvaringsdeskundige.voornaam } onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="achternaam" className="col-md-5 col-form-label">Achternaam:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="achternaam" placeholder="achternaam" defaultValue={ ervaringsdeskundige.achternaam } onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-md-5 col-form-label">Email:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="email" placeholder="email" defaultValue={ ervaringsdeskundige.email } onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="postcode" className="col-md-5 col-form-label">Postcode:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="postcode" placeholder="postcode" defaultValue={ ervaringsdeskundige.postcode } onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="plaats" className="col-md-5 col-form-label">Plaats:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="plaats" placeholder="plaats" defaultValue={ ervaringsdeskundige.plaats } onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-md-5 col-form-label">Wachtwoord:</label>
                            <div className="col-md-7">
                                <input type="password" className="form-control" name="password" placeholder="wachtwoord" onChange={handleInputChange}/>
                            </div>
                        <div className="form-group row">
                            <label htmlFor="phoneNumber" className="col-md-5 col-form-label">Telefoon:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="phoneNumber" placeholder="telefoon" pattern="[0-9]{10}" defaultValue={ ervaringsdeskundige.phoneNumber } onChange={handleInputChange}/>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-group row">
                            <label htmlFor="beperking" className="col-md-5 col-form-label">Beperking:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="beperking" placeholder="beperking" onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="beperkingToevoegen" className="col-md-5 col-form-label">Beperking toevoegen:</label>
                            <div className="col-md-7">
                                <select className="form-control" name="beperkingToevoegen">
                                    <option>-</option>
                                    <option>Visueel</option>
                                    <option>Motorisch</option>
                                    <option>Verstandelijk</option>
                                    <option>Auditief</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="hulpmiddel" className="col-md-5 col-form-label">Hulpmiddel:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="hulpmiddel" placeholder="hulpmiddel" onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="hulpmiddelToevoegen" className="col-md-5 col-form-label">Hulpmiddel toevoegen:</label>
                            <div className="col-md-7">
                                <select className="form-control" name="hulpmiddelToevoegen">
                                    <option>-</option>
                                    <option>Software</option>
                                    <option>Keyboard</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="aandoening" className="col-md-5 col-form-label">Aandoening:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="aandoening" placeholder="Aandoening" onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="aandoeningToevoegen" className="col-md-5 col-form-label">Aandoening toevoegen:</label>
                            <div className="col-md-7">
                                <select className="form-control" name="aandoeningToevoegen">
                                    <option>-</option>
                                    <option>Software</option>
                                    <option>Keyboard</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="voorkeurBenadering" className="col-md-5 col-form-label">Voorkeur benadering:</label>
                            <div className="col-md-7">
                                <select className="form-control" name="voorkeurBenadering" onChange={handleInputChange}>
                                    { ervaringsdeskundige.voorkeurBenadering === "geen voorkeur" ? <option selected value="geen voorkeur"> Geen voorkeur</option> : <option value="geen voorkeur"> Geen voorkeur</option> }
                                    { ervaringsdeskundige.voorkeurBenadering === "email" ? <option selected value="email"> Email</option> : <option value="email"> Email</option> }
                                    { ervaringsdeskundige.voorkeurBenadering === "telefoon" ? <option selected value="telefoon"> Telefoon</option> : <option value="telefoon"> Telefoon</option> }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="voorkeurOnderzoek" className="col-md-5 col-form-label">Voorkeur onderzoek:</label>
                            <div className="col-md-7">
                                <select className="form-control" id="voorkeurOnderzoek">
                                    <option>Vragenlijst</option>
                                    <option>Fysiek</option>
                                    <option>Website test</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="commerciele" className="col-md-5 control-label">Commercieel: </label>
                            <div className="col-md-7">
                                { ervaringsdeskundige.commerciele ? (
                                    <div>
                                        <label className="radio-inline"> <input type="radio" name="commerciele" id="commercieelJa" value="commercieelJa" defaultChecked onChange={handleInputChange}/> Ja </label>
                                        <label className="radio-inline"> <input type="radio" name="commerciele" id="commercieelNee" value="commercieelNee" onChange={handleInputChange}/> Nee </label>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="radio-inline"> <input type="radio" name="commerciele" id="commercieelJa" value="commercieelJa" onChange={handleInputChange}/> Ja </label>
                                        <label className="radio-inline"> <input type="radio" name="commerciele" id="commercieelNee" value="commercieelNee" defaultChecked onChange={handleInputChange}/> Nee </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="minderjarig" className="col-md-5 control-label">Volwassene: </label>
                            <div className="col-md-7">
                                { ervaringsdeskundige.minderjarig ? (
                                    <div>
                                        <label className="radio-inline"> <input type="radio" name="minderjarig" id="volwasseneJa" value="volwasseneJa" onChange={handleInputChange}/> Ja </label>
                                        <label className="radio-inline"> <input type="radio" name="minderjarig" id="volwasseneNee" value="volwasseneNee" defaultChecked onChange={handleInputChange}/> Nee </label>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="radio-inline"> <input type="radio" name="minderjarig" id="volwasseneJa" value="volwasseneJa" defaultChecked onChange={handleInputChange}/> Ja </label>
                                        <label className="radio-inline"> <input type="radio" name="minderjarig" id="volwasseneNee" value="volwasseneNee" onChange={handleInputChange}/> Nee </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-group row">
                            <label htmlFor="voogdVoornaam" className="col-md-5 col-form-label">Voornaam:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="voogdVoornaam" placeholder="voogd voornaam" onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="voogdAchternaam" className="col-md-5 col-form-label">Achternaam:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="voogdAchternaam" placeholder="voogd achternaam" onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="voogdEmail" className="col-md-5 col-form-label">Email:</label>
                            <div className="col-md-7">
                                <input type="text" className="form-control" name="voogdEmail" placeholder="voogd email" onChange={handleInputChange}/>
                            </div>
                        </div>
                    </div>
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