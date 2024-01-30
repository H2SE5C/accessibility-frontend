import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function VragenlijstWijzigenPagina() {
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const navigate = useNavigate();
    const [naam, setNaam] = useState("");
    const [success, setSuccess] = useState(true);
    const API_URL = '/api/vragenlijst/details/';
    const pathArray = window.location.pathname.split('/');
    const rolNaam = pathArray[1];

    useEffect(() => {
        const VragenlijstDetail = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + id);
                const vragenlijst = response.data;
                setNaam(vragenlijst.naam);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        VragenlijstDetail();
    }, [id, axiosPrivate])

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axiosPrivate.put('/api/vragenlijst/update/' + id, {
                naam: naam
            });
            console.log(response);
            navigate(`/${rolNaam}/vragenlijsten`);
        } catch (err) {
            console.log(err);
            setSuccess(false);
        }
    }

    return (
        <div className="container">
            <div className="header">
                {success ? <></> : <h1 className="text-danger ">Verkeerd ingevuld</h1>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titel">Titel</label>
                        <input type="text" required className="form-control" id="titel" placeholder="Titel" value={naam} onChange={(e) => { setNaam(e.target.value) }} />
                    </div>

                    <button type="submit" className="btn btn-success mt-2">Wijzigen</button>
                    <p className="terug"><Link to={`/${rolNaam}/vragenlijst-detail/${id}`}>Annuleer</Link></p>
                </form>
            </div>
        </div>
               
               
    );
}

export default VragenlijstWijzigenPagina;