function ErvaringsdeskundigeProfielBewerkenPagina() {
    return (
        <div className="container">
            <form>
                <div className="row">
                    <div className="form-group col-md-4">
                        <div className="form-group row">
                            <label htmlFor="inputVoornaam" className="col-sm-2 col-form-label">Voornaam:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputVoornaam" placeholder="voornaam"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAchternaam" className="col-sm-2 col-form-label">Achternaam:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputAchternaam" placeholder="achternaam"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputEmail" placeholder="email"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPostcode" className="col-sm-2 col-form-label">Postcode:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputPostcode" placeholder="postcode"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPlaats" className="col-sm-2 col-form-label">Plaats:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputPlaats" placeholder="plaats"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputWachtwoord" className="col-sm-2 col-form-label">Wachtwoord:</label>
                            <div className="col-sm-4">
                                <input type="password" className="form-control" id="inputWachtwoord" placeholder="wachtwoord"/>
                            </div>
                        <div className="form-group row">
                            <label htmlFor="inputTelefoon" className="col-sm-2 col-form-label">Telefoaon:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputTelefoon" placeholder="telefoon"/>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-group row">
                            <label htmlFor="inputBeperking" className="col-sm-2 col-form-label">Beperking:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputBeperking" placeholder="beperking"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputBeperkingToevoegen" className="col-sm-2 col-form-label">Beperking toevoegen:</label>
                            <div className="col-sm-4">
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
                            <label htmlFor="inputHulpmiddel" className="col-sm-2 col-form-label">Hulpmiddel:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputHulpmiddel" placeholder="hulpmiddel"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputHulpmiddelToevoegen" className="col-sm-2 col-form-label">Hulpmiddel toevoegen:</label>
                            <div className="col-sm-4">
                                <select className="form-control" id="inputHulpmiddelToevoegen">
                                    <option>-</option>
                                    <option>Software</option>
                                    <option>Keyboard</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAandoening" className="col-sm-2 col-form-label">Aandoening:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputAandoening" placeholder="Aandoening"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAandoeningToevoegen" className="col-sm-2 col-form-label">Aandoening toevoegen:</label>
                            <div className="col-sm-4">
                                <select className="form-control" id="inputAandoeningToevoegen">
                                    <option>-</option>
                                    <option>Software</option>
                                    <option>Keyboard</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputBenadering" className="col-sm-2 col-form-label">Benadering:</label>
                            <div className="col-sm-4">
                                <select className="form-control" id="inputBenadering">
                                    <option>Geen voorkeur</option>
                                    <option>Email</option>
                                    <option>Telefoon</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputVoorkeurOnderzoek" className="col-sm-2 col-form-label">Voorkeur onderzoek:</label>
                            <div className="col-sm-4">
                                <select className="form-control" id="inputVoorkeurOnderzoek">
                                    <option>Vragenlijst</option>
                                    <option>Fysiek</option>
                                    <option>Website test</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputCommercieel" className="col-sm-2 control-label">Commercieel: </label>
                            <div className="col-sm-4">
                                <label className="radio-inline"> <input type="radio" name="inputCommercieel" id="commercieelJa" value="summer"/> Ja </label>
                                <label className="radio-inline"> <input type="radio" name="inputCommercieel" id="commercieelNee" value="winter"/> Nee </label>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputVolwassene" className="col-sm-2 control-label">Volwassene: </label>
                            <div className="col-sm-4">
                                <label className="radio-inline"> <input type="radio" name="inputVolwassene" id="volwasseneJa" value="summer"/> Ja </label>
                                <label className="radio-inline"> <input type="radio" name="inputVolwassene" id="volwasseneNee" value="winter"/> Nee </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-group row">
                            <label htmlFor="inputVoogdVoornaam" className="col-sm-2 col-form-label">Voornaam:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputVoogdVoornaam" placeholder="voogd voornaam"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputVoogdAchternaam" className="col-sm-2 col-form-label">Achternaam:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputVoogdAchternaam" placeholder="voogd achternaam"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputVoogdEmail" className="col-sm-2 col-form-label">Email:</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="inputVoogdEmail" placeholder="voogd email"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ErvaringsdeskundigeProfielBewerkenPagina;