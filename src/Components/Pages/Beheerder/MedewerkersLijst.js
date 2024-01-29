import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ErvaringsdeskundigenLijst() {
    const [gebruikers, setGebruikers] = useState([]);
    const [filterTerm, setFilterTerm] = useState('');
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchEVLijst = async () => {
            try {
                const response = await axiosPrivate.get(`/api/gebruiker/medewerkers`);
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

    const gefilterdeGebruikers = gebruikers.filter((gebruiker) => {
        const zoektermLowerCase = filterTerm.toLowerCase();
        return (
            gebruiker.id.toString().includes(zoektermLowerCase) ||
            gebruiker.naam.toLowerCase().includes(zoektermLowerCase) ||
            gebruiker.email.toLowerCase().includes(zoektermLowerCase)
        );
    });

    return (
        <div className="container mt-4">
            <h1 className="text-center">MEDEWERKERS</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Zoek medewerkers"
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
                        <th>Verwijderen</th>
                    </tr>
                </thead>
                <tbody>
                    {gefilterdeGebruikers.map((gebruiker) => (
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
