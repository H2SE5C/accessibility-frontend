import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ErvaringsdeskundigenLijst() {
    const axiosPrivate = useAxiosPrivate();
    const [gebruikers, setGebruikers] = useState([]);
    const [gesorteerdeGebruikers, setGesorteerdeGebruikers] = useState([]);
    const [sorteerOptie, setSorteerOptie] = useState('');
    const [filterTerm, setFilterTerm] = useState('');

    useEffect(() => {
        const fetchMedewerkers = async () => {
            try {
                const response = await axiosPrivate.get(`/api/gebruiker/medewerkers`);
                setGebruikers(response.data);
            } catch (error) {
                console.error('Fout bij het ophalen van gebruikersgegevens:', error);
            }
        }

        fetchMedewerkers();
    }, [axiosPrivate]);

    useEffect(() => {
        let gefilterdeGebruikers = [...gebruikers];

        if (filterTerm) {
            gefilterdeGebruikers = gefilterdeGebruikers.filter((gebruiker) =>
                gebruiker.naam.toLowerCase().includes(filterTerm.toLowerCase()) ||
                gebruiker.id.toString().includes(filterTerm)
            );
        }

        if (sorteerOptie === 'naamOplopend') {
            gefilterdeGebruikers.sort((a, b) => a.naam.localeCompare(b.naam));
        } else if (sorteerOptie === 'naamAflopend') {
            gefilterdeGebruikers.sort((a, b) => b.naam.localeCompare(a.naam));
        } else if (sorteerOptie === 'idOplopend') {
            gefilterdeGebruikers.sort((a, b) => a.id - b.id);
        } else if (sorteerOptie === 'idAflopend') {
            gefilterdeGebruikers.sort((a, b) => b.id - a.id);
        }

        setGesorteerdeGebruikers(gefilterdeGebruikers);
    }, [gebruikers, filterTerm, sorteerOptie]);

    const verwijderGebruiker = async (id) => {
        try {
            await axiosPrivate.delete(`/api/gebruiker/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Fout bij het verwijderen van het account:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">MEDEWERKERS</h1>
            <div className="row align-items-start">
                <div className="col-md-4">
                    <label className="mb-2">Zoek medewerkers:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Zoek medewerkers"
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
            </div>

            <table className="table table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID#</th>
                        <th>Naam</th>
                        <th>Email</th>
                        <th>Verwijderen</th>
                    </tr>
                </thead>
                <tbody>
                    {gesorteerdeGebruikers.map((gebruiker) => (
                        <tr key={gebruiker.id}>
                            <th scope="row">{gebruiker.id}</th>
                            {gebruiker.naam && <td>{gebruiker.naam}</td>}
                            <td>{gebruiker.email}</td>
                            <td><button className="btn btn-danger backBtn" onClick={() => verwijderGebruiker(gebruiker.id)}>Verwijder</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ErvaringsdeskundigenLijst;
