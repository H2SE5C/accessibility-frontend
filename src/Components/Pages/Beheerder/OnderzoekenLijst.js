import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";



function OnderzoekenLijst() {
    const axiosPrivate = useAxiosPrivate();
    const [onderzoeken, setOnderzoeken] = useState([]);
    const [gesorteerdeOnderzoeken, setGesorteerdeOnderzoeken] = useState([]);
    const [sorteerOptie, setSorteerOptie] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const [geselecteerdeOnderzoek, setGeselecteerdeOnderzoek] = useState(null);
    const isoDate = "2024-02-01T00:00:00";
    const formattedDate = new Date(isoDate).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        const fetchOnderzoeken = async () => {
            try {
                const response = await axiosPrivate.get(`/api/gebruiker/onderzoeken`);
                const onderzoekActief = response.data["onderzoekenEerste"];
                const onderzoekAfwachting = response.data["onderzoekenTweede"];
                const gecombineerdeData = [...onderzoekActief, ...onderzoekAfwachting];
                setOnderzoeken(gecombineerdeData);
            } catch (error) {
                console.error('Fout bij het ophalen van onderzoeken:', error);
            }
        }
        fetchOnderzoeken();
    }, [axiosPrivate]);

    useEffect(() => {
        let gefilterdeOnderzoeken = [...onderzoeken];

        if (filterTerm) {
            gefilterdeOnderzoeken = gefilterdeOnderzoeken.filter((onderzoek) =>
                onderzoek.titel.toLowerCase().includes(filterTerm.toLowerCase()) ||
                onderzoek.bedrijf.toLowerCase().includes(filterTerm.toLowerCase()) ||
                onderzoek.id.toString().includes(filterTerm)
            );
        }

        if (filterStatus === 'actief') {
            gefilterdeOnderzoeken = gefilterdeOnderzoeken.filter((onderzoek) => onderzoek.status === "Actief");
        } else if (filterStatus === 'afwachting') {
            gefilterdeOnderzoeken = gefilterdeOnderzoeken.filter((onderzoek) => onderzoek.status === "In afwachting");
        }

        if (sorteerOptie === 'naamOplopend') {
            gefilterdeOnderzoeken.sort((a, b) => a.titel.localeCompare(b.titel));
        } else if (sorteerOptie === 'naamAflopend') {
            gefilterdeOnderzoeken.sort((a, b) => b.titel.localeCompare(a.titel));
        } else if (sorteerOptie === 'idOplopend') {
            gefilterdeOnderzoeken.sort((a, b) => a.id - b.id);
        } else if (sorteerOptie === 'idAflopend') {
            gefilterdeOnderzoeken.sort((a, b) => b.id - a.id);
        }

        setGesorteerdeOnderzoeken(gefilterdeOnderzoeken);
    }, [onderzoeken, filterTerm, filterStatus, sorteerOptie]);

    const verwijderOnderzoek = async (id) => {
        const confirmed = window.confirm('Weet je zeker dat deze onderzoek wilt verwijderen? Dit kan niet ongedaan worden gemaakt.');

        if (confirmed) {
            try {
                await axiosPrivate.delete(`/api/Gebruiker/onderzoeken/verwijderen/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Fout bij het verwijderen van het account:', error);
            }
        }
    };

    const handleStatusClick = async (isAkkord, id) => {
        const status = isAkkord ? "AkkordStatus" : "NietAkkordStatus";
        try {
            await axiosPrivate.put(`/api/Onderzoek/${status}/${id}`);
            window.location.reload();
        } catch (error) {
            console.error("Error updating status:", error);
        };
    }

    const openOnderzoekInfo = (onderzoek) => {
        setGeselecteerdeOnderzoek(onderzoek);
    };

    const sluitGebruikerInfo = () => {
        setGeselecteerdeOnderzoek(null);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">ONDERZOEKEN</h1>
            <div className="row align-items-start">
                <div className="col-md-4">
                    <label className="mb-2">Zoek onderzoek:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Zoek Onderzoek"
                            value={filterTerm}
                            onChange={(e) => setFilterTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <label className="mb-2">Sorteer op:</label>
                    <select className="form-select" value={sorteerOptie} onChange={(e) => setSorteerOptie(e.target.value)}>
                        <option value="">Geen Sortering</option>
                        <option value="naamOplopend">Naam (Oplopend)</option>
                        <option value="naamAflopend">Naam (Aflopend)</option>
                        <option value="idOplopend">ID (Oplopend)</option>
                        <option value="idAflopend">ID (Aflopend)</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className="mb-2">Filter op status:</label>
                    <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="">Geen Filter</option>
                        <option value="actief">Actief</option>
                        <option value="afwachting">In Afwachting</option>
                    </select>
                </div>
            </div>
            <table className="table table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID#</th>
                        <th>Titel</th>
                        <th>Bedrijf</th>
                        <th>Info</th>
                        <th>Verwijderen</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {gesorteerdeOnderzoeken.map((onderzoek) => (
                        <tr key={onderzoek.id}>
                            <th scope="row">{onderzoek.id}</th>
                            <td>{onderzoek.titel}</td>
                            <td>{onderzoek.bedrijf}</td>
                            <td>
                                {geselecteerdeOnderzoek === onderzoek ? (
                                    <button className="btn btn-secondary" onClick={sluitGebruikerInfo}>Sluiten</button>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => openOnderzoekInfo(onderzoek)}>Meer info</button>
                                )}
                            </td>
                            <td><button className="btn btn-danger backBtn" onClick={() => verwijderOnderzoek(onderzoek.id)}>Verwijder</button></td>
                            <td>
                                {onderzoek.status === "Actief" ? (
                                    "Actief"
                                ) : (
                                    "In afwachting"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {geselecteerdeOnderzoek && (
                <div className="user-info-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className="user-info-header">Onderzoek Informatie</h2>
                        {geselecteerdeOnderzoek.status === "In afwachting" && (
                            <div>
                                <button className="btn btn-success mx-2" onClick={() => handleStatusClick(true, geselecteerdeOnderzoek.id)}>Accepteer</button>
                                <button className="btn btn-danger mx-2" onClick={() => handleStatusClick(false, geselecteerdeOnderzoek.id)}>Weiger</button>
                            </div>
                        )}
                    </div>
                    <p className="user-info-item">
                        <span className="user-info-label">Bedrijf:</span>
                        <span className="user-info-value">{geselecteerdeOnderzoek.bedrijf}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Titel:</span>
                        <span className="user-info-value">{geselecteerdeOnderzoek.titel}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Omschrijving:</span>
                        <span className="user-info-value">{geselecteerdeOnderzoek.omschrijving}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Type onderzoek:</span>
                        <span className="user-info-value">{geselecteerdeOnderzoek.typeOnderzoek}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Beloning:</span>
                        <span className="user-info-value">{geselecteerdeOnderzoek.beloning}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Startdatum:</span>
                        <span className="user-info-value">
                            {geselecteerdeOnderzoek && new Date(geselecteerdeOnderzoek.datum).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Beperkingen:</span>
                        <span className="user-info-value">
                            {Array.isArray(geselecteerdeOnderzoek.beperkingen) &&
                                geselecteerdeOnderzoek.beperkingen.map((beperking) => (
                                    <span className="beperking" key={beperking.id}>{beperking.naam}, </span>
                                ))}
                        </span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Ervaringsdeskundigen:</span>
                        <span className="user-info-value">
                            {Array.isArray(geselecteerdeOnderzoek.ervaringsdeskundigen) &&
                                geselecteerdeOnderzoek.ervaringsdeskundigen.map((deskundige) => (
                                    <span className="ervaringsdeskundige" key={deskundige.id}>{deskundige.email}, </span>
                                ))}
                        </span>
                    </p>

                </div>
            )}
        </div>
    );
}

export default OnderzoekenLijst;