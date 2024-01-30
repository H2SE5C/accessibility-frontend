import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate, useParams } from 'react-router-dom';

function VragenlijstDetailPagina() {
    const [vragenlijst, setVragenlijst] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const API_URL = '/api/Vragenlijst/details/';
    const navigate = useNavigate();
    const pathArray = window.location.pathname.split('/');
    const rolNaam = pathArray[1];

    useEffect(() => {
        const fetchVragenlijst = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + id);
                console.log(response.data);
                setVragenlijst(response.data);
            } catch (error) {
                console.error('Fout bij het ophalen van de vragenlijsten:', error);
            }
        }
        fetchVragenlijst();
    }, [axiosPrivate]);

    const verwijderVragenlijst = async () => {
        const confirmed = window.confirm('Weet je zeker dat deze vragenlijst wilt verwijderen? Dit kan niet ongedaan worden gemaakt.');

        if (confirmed) {
            try {
                await axiosPrivate.delete(`/api/vragenlijst/verwijderen/${id}`);
                navigate(`/${rolNaam}/vragenlijsten`);
            } catch (error) {
                console.error('Fout bij het verwijderen van de vragenlijst:', error);
            }
        }
    };

    return (
        <div className="container"> 
            <div className="header">
                <div className="title">Titel: {vragenlijst.naam}</div>
                <div className="d-flex">
                    <button className="btn btn-primary backBtn" ><Link className="link" to={`/${rolNaam}/vragenlijsten`}>Terug</Link></button>
                    <button className="btn btn-warning backBtn" ><Link className="link" to={`/${rolNaam}/vragenlijst-wijzig/${vragenlijst.id}`}>wijzigen</Link></button>
                    <button className="btn btn-danger backBtn" onClick={()=>verwijderVragenlijst()} >verwijderen</button>
                </div>
            </div>
        </div>
               
               
    );
}

export default VragenlijstDetailPagina;