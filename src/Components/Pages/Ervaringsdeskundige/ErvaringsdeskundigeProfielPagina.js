function ErvaringsdeskundigeHomePagina() {
    const buttonsWrapperStyle = { "align-items": "right" };
    const bewerkKnopStyle = { "color": "blue", "text-decoration": "none", "margin-right": "10px" };
    const verwijderKnopStyle = { "color": "red", "text-decoration": "none", "font-weight": "700" };

    return (
        <div className="container">
            <h2>Profiel</h2>
            <div className="row">
                <div className="col-md-4">
                    <ul className="list-unstyled">
                        <li>Voornaam: Tim</li>
                        <li>Achternaam: Can</li>
                        <li>Email: timcan@example.com</li>
                        <li>Postcode: 1234 AB</li>
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
                <a href="#" style={bewerkKnopStyle}>bewerk</a>
                <a href="#" style={verwijderKnopStyle}>verwijder account</a>
            </div>
        </div>
    );
}

export default ErvaringsdeskundigeHomePagina