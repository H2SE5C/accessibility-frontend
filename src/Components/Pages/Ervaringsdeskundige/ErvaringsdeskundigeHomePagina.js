function ErvaringsdeskundigeHomePagina () {
    const kolomDivStyle = { "maxHeight": "75vh", "overflow": "auto" };
    const onderzoekDivStyle = {
        "borderRadius": "10px",
        "border": "1px solid black",
        "boxShadow": "0px 5px 7px 1px rgba(0,0,0,0.12)",
        "marginBottom": "10px",
        "padding": "5px"
    };
    const detailsKnopStyle = { "fontWeight": "700", "color": "blue" };
    const uitschrijvenKnopStyle = { "fontWeight": "700", "color": "red" };
    const listStyle = { "margin": "0" };

    return (
        <div className="container">
            <div className="row">
                <div id="deelnemend" className="col-md-6" style={kolomDivStyle}>
                    <h2>Deelnemende onderzoeken</h2>
                    <div style={onderzoekDivStyle}>
                        <ul style={listStyle} className="list-unstyled">
                            <li>Titel: Albert Heijn vragenlijst</li>
                            <li>Bedrijf: Albert Heijn</li>
                            <li>Locatie: Online</li>
                            <li>Beloning: &euro;140</li>
                            <li style={detailsKnopStyle}>Details</li>
                            <li style={uitschrijvenKnopStyle}>Uitschrijven</li>
                        </ul>
                    </div>
                    <div style={onderzoekDivStyle}>
                        <ul style={listStyle} className="list-unstyled">
                            <li>Titel: Jumbo vragenlijst</li>
                            <li>Bedrijf: Jumbo</li>
                            <li>Locatie: Online</li>
                            <li>Beloning: &euro;140</li>
                            <li style={detailsKnopStyle}>Details</li>
                            <li style={uitschrijvenKnopStyle}>Uitschrijven</li>
                        </ul>
                    </div>
                    <div style={onderzoekDivStyle}>
                        <ul style={listStyle} className="list-unstyled">
                            <li>Titel: Dirk vragenlijst</li>
                            <li>Bedrijf: Dirk</li>
                            <li>Locatie: Online</li>
                            <li>Beloning: &euro;140</li>
                            <li style={detailsKnopStyle}>Details</li>
                            <li style={uitschrijvenKnopStyle}>Uitschrijven</li>
                        </ul>
                    </div>
                    <div style={onderzoekDivStyle}>
                        <ul style={listStyle} className="list-unstyled">
                            <li>Titel: Co-op vragenlijst</li>
                            <li>Bedrijf: Co-op</li>
                            <li>Locatie: Online</li>
                            <li>Beloning: &euro;140</li>
                            <li style={detailsKnopStyle}>Details</li>
                            <li style={uitschrijvenKnopStyle}>Uitschrijven</li>
                        </ul>
                    </div>
                    <div style={onderzoekDivStyle}>
                        <ul style={listStyle} className="list-unstyled">
                            <li>Titel: Hoogvliet vragenlijst</li>
                            <li>Bedrijf: Hoogvliet</li>
                            <li>Locatie: Online</li>
                            <li>Beloning: &euro;140</li>
                            <li style={detailsKnopStyle}>Details</li>
                            <li style={uitschrijvenKnopStyle}>Uitschrijven</li>
                        </ul>
                    </div>
                </div>
                <div id="openstaand"className="col-md-6" style={kolomDivStyle}>
                    <h2>Openstaande onderzoeken</h2>
                    <div style={onderzoekDivStyle}>
                        <ul style={listStyle} className="list-unstyled">
                            <li>Titel: Zara vragenlijst</li>
                            <li>Bedrijf: Zara</li>
                            <li>Locatie: Online</li>
                            <li>Beloning: &euro;140</li>
                            <li style={detailsKnopStyle}>Details</li>
                            <li style={uitschrijvenKnopStyle}>Uitschrijven</li>
                        </ul>
                    </div>
                    <div style={onderzoekDivStyle}>
                        <ul style={listStyle} className="list-unstyled">
                            <li>Titel: Ikea vragenlijst</li>
                            <li>Bedrijf: Ikea</li>
                            <li>Locatie: Online</li>
                            <li>Beloning: &euro;140</li>
                            <li style={detailsKnopStyle}>Details</li>
                            <li style={uitschrijvenKnopStyle}>Uitschrijven</li>
                        </ul>
                    </div>
                    <div style={onderzoekDivStyle}>
                        <ul style={listStyle} className="list-unstyled">
                            <li>Titel: HHS vragenlijst</li>
                            <li>Bedrijf: HHS</li>
                            <li>Locatie: Online</li>
                            <li>Beloning: &euro;140</li>
                            <li style={detailsKnopStyle}>Details</li>
                            <li style={uitschrijvenKnopStyle}>Uitschrijven</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErvaringsdeskundigeHomePagina;