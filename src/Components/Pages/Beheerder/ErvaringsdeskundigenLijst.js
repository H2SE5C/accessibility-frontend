import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ErvaringsdeskundigenLijst() {
    const axiosPrivate = useAxiosPrivate();
    const [gebruikers, setGebruikers] = useState([]);
    const [gesorteerdeGebruikers, setGesorteerdeGebruikers] = useState([]);
    const [sorteerOptie, setSorteerOptie] = useState('');
    const [geselecteerdeAandoening, setGeselecteerdeAandoening] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const [geselecteerdeGebruiker, setGeselecteerdeGebruiker] = useState(null);

    useEffect(() => {
        const fetchEV = async () => {
            try {
                const response = await axiosPrivate.get(`/api/gebruiker/ervaringsdeskundigen`);
                const gebruikersData = response.data;
                setGebruikers(gebruikersData);
            } catch (error) {
                console.error('Fout bij het ophalen van gebruikersgegevens:', error);
            }
        }

        fetchEV();
    }, [axiosPrivate]);

    useEffect(() => {
        let gefilterdeGebruikers = [...gebruikers];

        if (geselecteerdeAandoening) {
            gefilterdeGebruikers = gefilterdeGebruikers.filter((gebruiker) =>
                gebruiker.aandoeningen.some((aandoening) => aandoening.naam.toLowerCase() === geselecteerdeAandoening.toLowerCase())
            );
        }

        if (filterTerm) {
            gefilterdeGebruikers = gefilterdeGebruikers.filter((gebruiker) =>
                gebruiker.voornaam.toLowerCase().includes(filterTerm.toLowerCase()) ||
                gebruiker.achternaam.toLowerCase().includes(filterTerm.toLowerCase()) ||
                gebruiker.id.toString().includes(filterTerm)
            );
        }

        if (sorteerOptie === 'naamOplopend') {
            gefilterdeGebruikers.sort((a, b) => a.voornaam.localeCompare(b.voornaam));
        } else if (sorteerOptie === 'naamAflopend') {
            gefilterdeGebruikers.sort((a, b) => b.voornaam.localeCompare(a.voornaam));
        } else if (sorteerOptie === 'idOplopend') {
            gefilterdeGebruikers.sort((a, b) => a.id - b.id);
        } else if (sorteerOptie === 'idAflopend') {
            gefilterdeGebruikers.sort((a, b) => b.id - a.id);
        }

        setGesorteerdeGebruikers(gefilterdeGebruikers);
    }, [gebruikers, geselecteerdeAandoening, filterTerm, sorteerOptie]);

    const verwijderGebruiker = async (id) => {
        const confirmed = window.confirm('Weet je zeker dat deze onderzoek wilt verwijderen? Dit kan niet ongedaan worden gemaakt.');

        if (confirmed) {
            try {
                await axiosPrivate.delete(`/api/gebruiker/${id}`);
                window.location.reload();
            } catch (error) {
                console.error('Fout bij het verwijderen van het account:', error);
            }
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
            <h1 className="text-center">ERVARINGSDESKUNDIGEN</h1>
            <div className="row align-items-start">
                <div className="col-md-4">
                    <label className="mb-2">Zoek ervaringsdeskundige:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Zoek ervaringsdeskundige"
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
                    <label className="mb-2">Filter op aandoening:</label>
                    <select className="form-select" value={geselecteerdeAandoening} onChange={(e) => setGeselecteerdeAandoening(e.target.value)}>
                        <option value="">Geen Filter</option>
                        <option value="Blindheid">Blindheid</option>
                        <option value="Slechtziendheid">Slechtziendheid</option>
                        <option value="Kleurenblindheid">Kleurenblindheid</option>
                        <option value="Doofheid">Doofheid</option>
                        <option value="Slechthorendheid">Slechthorendheid</option>
                        <option value="Verlamming">Verlamming</option>
                        <option value="Tremoren of beperkte motorische controle">Tremoren of beperkte motorische controle</option>
                        <option value="ADHD">ADHD</option>
                        <option value="Dyslexie">Dyslexie</option>
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
                    </tr>
                </thead>
                <tbody>
                    {gesorteerdeGebruikers.map((gebruiker) => (
                        <tr key={gebruiker.id}>
                            <th scope="row">{gebruiker.id}</th>
                            <td>{gebruiker.voornaam} {gebruiker.achternaam}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            {geselecteerdeGebruiker && (
                <div className="user-info-container">
                    <h2 className="user-info-header">Gebruikersinformatie</h2>
                    <div className="user-info-item">
                        <span className="user-info-label">Voornaam:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.voornaam}</span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Achternaam:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.achternaam}</span>
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
                        <span className="user-info-label">Postcode:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.postcode}</span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Benadering:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.voorkeurBenadering}</span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Aandoening(en):</span>
                        <span className="user-info-value">
                            {geselecteerdeGebruiker.aandoeningen.map((aandoening, index) => (
                                <div key={index}>{aandoening.naam}</div>
                            ))}
                        </span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Hulpmiddel(en):</span>
                        <span className="user-info-value">
                            {geselecteerdeGebruiker.hulpmiddelen.map((hulpmiddel, index) => (
                                <div key={index}>{hulpmiddel.naam}</div>
                            ))}
                        </span>
                    </div>
                    <div className="user-info-item">
                        <span className="user-info-label">Deelname onderzoek(en):</span>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Onderzoek ID</th>
                                    <th>Titel</th>
                                    <th>Bedrijf</th>
                                </tr>
                            </thead>
                            <tbody>
                                {geselecteerdeGebruiker.onderzoeken.map((onderzoek, index) => (
                                    <tr key={index}>
                                        <td>{onderzoek.id}</td>
                                        <td>{onderzoek.titel}</td>
                                        <td>{onderzoek.bedrijf}</td>
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

export default ErvaringsdeskundigenLijst;
