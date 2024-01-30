import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link } from 'react-router-dom';

function VragenlijstenPagina() {
    const API_URL = '/api/Vragenlijst/';
    const [vragenlijsten, setVragenlijsten] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    
    useEffect(() => {
        const Vragenlijsten = async () => {
            try {
                const response = await axiosPrivate.get(API_URL);
                setVragenlijsten(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        Vragenlijsten();
    },[axiosPrivate])

    return (
        <div className="container">
            <h1>Vragenlijsten</h1>
            <div className="Vragenlijsten">
            {Array.isArray(vragenlijsten) &&<> 
                { vragenlijsten.map((vragenlijst) => (
                    <div className="from-group onderzoek" key={vragenlijst.id}>
                        <div className="title">Titel: {vragenlijst.naam}</div>
                        <button className="btn btn-primary"><Link className="link" to={`/bedrijf/onderzoek-detail/${vragenlijst.id}`}>Details</Link></button>
                    </div>
                ))}
               
                </>}
            </div>
            <button className="btn btn-success"><Link className="link" to="/bedrijf/#">Nieuwe vragenlijst</Link></button>
        </div>
    );
}

export default VragenlijstenPagina;