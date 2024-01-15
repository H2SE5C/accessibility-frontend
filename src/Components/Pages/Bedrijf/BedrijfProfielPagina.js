import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import '../../../css/BedrijfProfielPagina.css';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';

function BedrijfProfielPagina() {
    const { userAuth } = useAuth();
    const [bedrijf, setBedrijf] = useState({});
    const [tempBedrijf, setTempBedrijf] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const fetchBedrijf = async () => {
        try {
            const response = await axios.get(`/api/bedrijf/profiel`, {
                headers: {
                    'Authorization': `Bearer ${userAuth.token}`
                }
            });
            setBedrijf(response.data);
            setTempBedrijf(response.data);
        } catch (error) {
            console.error('Fout bij het ophalen van bedrijfsgegevens:', error);
        }
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setTempBedrijf(bedrijf);
        }
    };

    const handleInputChange = (event) => {
        setTempBedrijf({ ...tempBedrijf, [event.target.name]: event.target.value });
    };

    const handleSave = async () => {
        try {
            await updateBedrijf(tempBedrijf);
            setSaveSuccess(true);
            setIsEditing(false);
            setBedrijf(tempBedrijf);
        } catch (error) {
            console.error('Fout bij het opslaan van bedrijfsgegevens:', error);
            setSaveSuccess(false);
        }
    };

    const handleCancel = () => {
        setTempBedrijf(bedrijf);
        setIsEditing(false);
    };

    const updateBedrijf = async (updatedData) => {
        try {
            await axios.put(`/api/bedrijf/update`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${userAuth.token}`
                }
            });
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchBedrijf();
    }, []);

    return (
        <div className="row">
            <div className="panel">
                <div className="profiel-info">
                    <h1>Bedrijfsprofiel</h1>
                    <div className="row">
                        {isEditing ? (
                            <>
                                <div className="bio-row">
                                    <label>Bedrijfsnaam</label>
                                    <input type="text" name="bedrijfsnaam" value={tempBedrijf.bedrijfsnaam || ''} onChange={handleInputChange} />
                                </div>
                                <div className="bio-row">
                                    <label>Locatie</label>
                                    <input type="text" name="locatie" value={tempBedrijf.locatie || ''} onChange={handleInputChange} />
                                </div>
                                <div className="bio-row">
                                    <label>Beschrijving</label>
                                    <input type="text" name="omschrijving" value={tempBedrijf.omschrijving || ''} onChange={handleInputChange} />
                                </div>
                                <div className="bio-row">
                                    <label>Website</label>
                                    <input type="text" name="linkNaarBedrijf" value={tempBedrijf.linkNaarBedrijf || ''} onChange={handleInputChange} />
                                </div>
                                <div className="bio-row">
                                    <label>Email</label>
                                    <input type="text" name="email" value={tempBedrijf.email || ''} onChange={handleInputChange} />
                                </div>
                                <div className="bio-row">
                                    <label>Telefoon</label>
                                    <input type="text" name="phoneNumber" value={tempBedrijf.phoneNumber || ''} onChange={handleInputChange} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bio-row"><p><span>Bedrijfsnaam </span>: {bedrijf.bedrijfsnaam}</p></div>
                                <div className="bio-row"><p><span>Locatie </span>: {bedrijf.locatie}</p></div>
                                <div className="bio-row"><p><span>Beschrijving </span>: {bedrijf.omschrijving}</p></div>
                                <div className="bio-row"><p><span>Website </span>: {bedrijf.linkNaarBedrijf}</p></div>
                                <div className="bio-row"><p><span>Email </span>: {bedrijf.email}</p></div>
                                <div className="bio-row"><p><span>Telefoon </span>: {bedrijf.phoneNumber}</p></div>
                            </>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    {isEditing ? (
                        <>
                            <button type="button" onClick={handleSave} className="btn btn-primary">Opslaan</button>
                            <button type="button" onClick={handleCancel} className="btn btn-default">Annuleren</button>
                        </>
                    ) : (
                        <button type="button" onClick={toggleEdit} className="btn btn-primary">Wijzigen</button>
                    )}
                    {saveSuccess && <p>Gegevens zijn gewijzigd!</p>}
                </div>
            </div>
        </div>
    );
}

export default BedrijfProfielPagina;
