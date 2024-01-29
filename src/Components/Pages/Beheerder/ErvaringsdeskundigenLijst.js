import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ErvaringsdeskundigenLijst() {
    const [gebruikers, setGebruikers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [filterTerm, setFilterTerm] = useState('');
    const [geselecteerdeGebruiker, setGeselecteerdeGebruiker] = useState(null);

    useEffect(() => {
        const fetchEVLijst = async () => {
            try {
                const response = await axiosPrivate.get(`/api/gebruiker/ervaringsdeskundigen`);
                setGebruikers(response.data);
            } catch (error) {
                console.error('Fout bij het ophalen van bedrijfsgegevens:', error);
            }
        }
        fetchEVLijst();
    }, [axiosPrivate]);

    const verwijderGebruiker = async (id) => {
        try {
            await axiosPrivate.delete(`/api/gebruiker/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Fout bij het verwijderen van het account:', error);
        }
    };

    const openGebruikerInfo = (gebruiker) => {
        setGeselecteerdeGebruiker(gebruiker);
    };

    const sluitGebruikerInfo = () => {
        setGeselecteerdeGebruiker(null);
    };

    const gefilterdeGebruikers = gebruikers.filter((gebruiker) => {
        const zoektermLowerCase = filterTerm.toLowerCase();
        return (
            (gebruiker.id && gebruiker.id.toString().includes(zoektermLowerCase)) ||
            (gebruiker.voornaam && gebruiker.voornaam.toLowerCase().includes(zoektermLowerCase)) ||
            (gebruiker.achternaam && gebruiker.achternaam.toLowerCase().includes(zoektermLowerCase)) ||
            (gebruiker.email && gebruiker.email.toLowerCase().includes(zoektermLowerCase))
        );
    });

    return (
        <div className="container mt-4">
            <h1 className="text-center">ERVARINGSDESKUNDIGEN</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Zoek ervaringsdeskundige"
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                />
            </div>
            <table className="table table-bordered">
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
                    {gefilterdeGebruikers.map((gebruiker) => (
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
                    <p className="user-info-item">
                        <span className="user-info-label">Voornaam:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.voornaam}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Achternaam:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.achternaam}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Email:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.email}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Telefoon:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.phoneNumber}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Postcode:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.postcode}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Benadering:</span>
                        <span className="user-info-value">{geselecteerdeGebruiker.voorkeurBenadering}</span>
                    </p>
                    <p className="user-info-item">
                        <span className="user-info-label">Aandoening(en):</span>
                        <span className="user-info-value">
                            {geselecteerdeGebruiker.aandoeningen.map((aandoening, index) => (
                                <span key={index}>{aandoening.naam}</span>
                            ))}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default ErvaringsdeskundigenLijst;
