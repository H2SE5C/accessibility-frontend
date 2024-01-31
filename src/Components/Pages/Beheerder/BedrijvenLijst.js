import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function BedrijvenLijst() {
    const axiosPrivate = useAxiosPrivate();
    const [gebruikers, setGebruikers] = useState([]);
    const [gesorteerdeGebruikers, setGesorteerdeGebruikers] = useState([]);
    const [sorteerOptie, setSorteerOptie] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const [geselecteerdeGebruiker, setGeselecteerdeGebruiker] = useState(null);

    useEffect(() => {
        const fetchBedrijven = async () => {
            try {
                const response = await axiosPrivate.get(`/api/gebruiker/bedrijven`);
                const bedrijvenTrueData = response.data["bedrijvenTrue"];
                const bedrijvenAfwachtingData = response.data["bedrijvenFalse"];
                const gecombineerdeData = [...bedrijvenTrueData, ...bedrijvenAfwachtingData];
                setGebruikers(gecombineerdeData);
            } catch (error) {
                console.error('Fout bij het ophalen van gebruikersgegevens:', error);
            }
        }

        fetchBedrijven();
    }, [axiosPrivate]);

    useEffect(() => {
        let gefilterdeGebruikers = [...gebruikers];

        if (filterTerm) {
            gefilterdeGebruikers = gefilterdeGebruikers.filter((gebruiker) =>
                gebruiker.bedrijfsnaam.toLowerCase().includes(filterTerm.toLowerCase()) ||
                gebruiker.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
                gebruiker.id.toString().includes(filterTerm)
            );
        }

        if (filterStatus === 'actief') {
            gefilterdeGebruikers = gefilterdeGebruikers.filter((gebruiker) => gebruiker.emailConfirmed === true);
        } else if (filterStatus === 'afwachting') {
            gefilterdeGebruikers = gefilterdeGebruikers.filter((gebruiker) => gebruiker.emailConfirmed === false);
        }

        if (sorteerOptie === 'naamOplopend') {
            gefilterdeGebruikers.sort((a, b) => a.bedrijfsnaam.localeCompare(b.bedrijfsnaam));
        } else if (sorteerOptie === 'naamAflopend') {
            gefilterdeGebruikers.sort((a, b) => b.bedrijfsnaam.localeCompare(a.bedrijfsnaam));
        } else if (sorteerOptie === 'idOplopend') {
            gefilterdeGebruikers.sort((a, b) => a.id - b.id);
        } else if (sorteerOptie === 'idAflopend') {
            gefilterdeGebruikers.sort((a, b) => b.id - a.id);
        }

        setGesorteerdeGebruikers(gefilterdeGebruikers);
    }, [gebruikers, filterTerm, filterStatus, sorteerOptie]);

    const verwijderGebruiker = async (id) => {
        const confirmed = window.confirm('Weet je zeker dat je deze gebruiker wilt verwijderen? Dit kan niet ongedaan worden gemaakt.');

        if (confirmed) {
            try {
                await axiosPrivate.delete(`/api/gebruiker/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Fout bij het verwijderen van het account:', error);
            }
        }
    };


    const setEmailverifyTrue = async (id) => {
        try {
            const response = await axiosPrivate.put(`api/Gebruiker/bedrijf/${id}`);
            if (response.status === 200) {
                console.log("Email is bevestigd");
                window.location.reload();
            } else {
                console.error("Onverwachte statuscode:", response.status);
            }
        } catch (error) {
            console.error("Fout bij het bijwerken van de status:", error);
        }
    };


    const openGebruikerInfo = (gebruiker) => {
        setGeselecteerdeGebruiker(gebruiker);
    };

    const sluitGebruikerInfo = () => {
        setGeselecteerdeGebruiker(null);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">BEDRIJVEN</h1>
            <div className="row align-items-start">
                <div className="col-md-4">
                    <label className="mb-2">Zoek bedrijf:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Zoek bedrijf"
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
                        <th>Naam</th>
                        <th>Email</th>
                        <th>Info</th>
                        <th>Verwijderen</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {gesorteerdeGebruikers.map((gebruiker) => (
                        <tr key={gebruiker.id}>
                            <th scope="row">{gebruiker.id}</th>
                            <td>{gebruiker.bedrijfsnaam}</td>
                            <td>{gebruiker.email}</td>
                            <td>
                                {geselecteerdeGebruiker === gebruiker ? (
                                    <button className="btn btn-secondary" onClick={sluitGebruikerInfo}>Sluiten</button>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => openGebruikerInfo(gebruiker)}>
                                        Meer Info
                                    </button>
                                )}
                            </td>
                            <td><button className="btn btn-danger backBtn" onClick={() => verwijderGebruiker(gebruiker.id)}>Verwijder</button></td>
                            <td>
                                {gebruiker.emailConfirmed ? (
                                    "Actief"
                                ) : (
                                    "In afwachting"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {geselecteerdeGebruiker && (
                <div className="user-info-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className="user-info-header">Informatie</h2>
                        {geselecteerdeGebruiker.emailConfirmed === false && (
                            <button className="btn btn-warning" onClick={() => setEmailverifyTrue(geselecteerdeGebruiker.id)}>Accepteer</button>
                        )}
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Bedrijfsnaam:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.bedrijfsnaam}</span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Omschrijving:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.omschrijving}</span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Email:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.email}</span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Telefoon:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.phoneNumber}</span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Website:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.linkNaarBedrijf}</span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Onderzoek(en):</span>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Onderzoek ID</th>
                                    <th>Titel</th>
                                    <th>Omschrijving</th>
                                </tr>
                            </thead>
                            <tbody>
                                {geselecteerdeGebruiker.bedrijfsOnderzoekslijst.map((onderzoek, index) => (
                                    <tr key={index}>
                                        <td>{onderzoek.id}</td>
                                        <td>{onderzoek.titel}</td>
                                        <td>{onderzoek.omschrijving}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BedrijvenLijst;
