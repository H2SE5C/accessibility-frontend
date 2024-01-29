import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import { useState, useEffect } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";


function AllesGebruiekrsPagina() {
    const API_URL = '/api/gebruiker/';
    const [gebruikers, setGebruikers] = useState([]);
    const [bedrijvenAfwachting, setBedrijvenAfwachting] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const pathArray = window.location.pathname.split('/');
    const rolNaam = pathArray[2];
    const Titel = rolNaam.toUpperCase();

    useEffect(() => {
        const fetchGebruikers = async () => {
            try {
                if (rolNaam === "bedrijven") {
                    const respons = await axiosPrivate.get(API_URL + rolNaam);
                    setBedrijvenAfwachting(respons.data["bedrijvenFalse"]);
                    setGebruikers(respons.data["bedrijvenTrue"]);
                } else {
                    const respons = await axiosPrivate.get(API_URL + rolNaam);
                    setGebruikers(respons.data);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchGebruikers();
    }, [rolNaam, axiosPrivate])

    const verwijderGebruiker = async (id) => {
        try {
            await axiosPrivate.delete(`/api/gebruiker/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Fout bij het verwijderen van het account:', error);
        }
    };

    const setEmailverifTrue = async (id) => {
        try {
            await axiosPrivate.put(API_URL + `bedrijf/${id}`);
            window.location.reload();
        } catch (error) {
            console.error("Error updating status:", error);
        };
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center">{Titel}</h1>
            <table className="table  table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Naam</th>
                        <th>Email</th>
                        <th>Verwijderen</th>
                    </tr>
                </thead>
                <tbody>
                    {gebruikers.map(gebruiker => (
                        <tr key={gebruiker.id}>
                            <th scope="row">{gebruiker.id}</th>
                            {gebruiker.voornaam && <td>{gebruiker.voornaam} {gebruiker.achternaam}</td>}
                            {gebruiker.bedrijfsnaam && <td>{gebruiker.bedrijfsnaam} </td>}
                            {gebruiker.naam && <td>{gebruiker.naam}</td>}
                            <td>{gebruiker.email}</td>
                            <td><button className="btn btn-danger backBtn" onClick={() => verwijderGebruiker(gebruiker.id)} >verwijderen</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {rolNaam === "bedrijven" &&

                <table className="table  table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Bedrijfsnaam</th>
                            <th>Email</th>
                            <th>Omschrijving</th>
                            <th>Telephone Nummer</th>
                            <th>Locatie</th>
                            <th>Website</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bedrijvenAfwachting.map(gebruiker => (
                            <tr key={gebruiker.id}>
                                <th scope="row">{gebruiker.id}</th>
                                <td>{gebruiker.bedrijfsnaam} </td>
                                <td>{gebruiker.email}</td>
                                <td>{gebruiker.omschrijving}</td>
                                <td>{gebruiker.phoneNumber}</td>
                                <td>{gebruiker.locatie}</td>
                                <td>{gebruiker.linkNaarBedrijf}</td>
                                <td><button className="btn btn-primary backBtn" onClick={() => setEmailverifTrue(gebruiker.id)} >Akkoord</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default AllesGebruiekrsPagina;