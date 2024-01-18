import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/styles.css';
import '../../../css/BedrijfProfielPagina.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';

function BedrijfProfielPagina() {
    const { userAuth } = useAuth();
    const navigate = useNavigate();
    const [bedrijf, setBedrijf] = useState({});
    const [tempBedrijf, setTempBedrijf] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
    });
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const [incorrectNewPassword, setIncorrectNewPassword] = useState(false);

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

    const handlePasswordChange = (event) => {
        setPasswordData({
            ...passwordData,
            [event.target.name]: event.target.value,
        });
    };

    const changePassword = async (passwordData) => {
        try {
            await axios.put(`/api/bedrijf/wachtwoord-change`, passwordData, {
                headers: {
                    'Authorization': `Bearer ${userAuth.token}`
                }
            });
        } catch (error) {
            throw error;
        }
    };

    const checkPasswordValidity = async () => {
        try {
            const response = await axios.put(`/api/bedrijf/wachtwoord-check`, passwordData, {
                headers: {
                    'Authorization': `Bearer ${userAuth.token}`
                }
            });
            return response.data.isValid;
        } catch (error) {
            throw error;
        }
    };

    const handleSave = async () => {
        setIncorrectPassword(false);
        setIncorrectNewPassword(false);

        if (passwordData.newPassword !== passwordData.newPasswordRepeat) {
            setIncorrectNewPassword(true);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                newPasswordRepeat: '',
            });
            setTimeout(() => {
                setIncorrectNewPassword(false);
            }, 4000);
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordPattern.test(passwordData.newPassword)) {
            setIncorrectPassword(true);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                newPasswordRepeat: '',
            });
            setTimeout(() => {
                setIncorrectPassword(false);
            }, 4000);
            return;
        }

        try {
            const isPasswordValid = await checkPasswordValidity();
            if (!isPasswordValid) {
                setIncorrectPassword(true);
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    newPasswordRepeat: '',
                });
                setTimeout(() => {
                    setIncorrectPassword(false);
                }, 4000);
                return;
            }

            await updateBedrijf(tempBedrijf);
            if (passwordData.newPassword) {
                await changePassword(passwordData);
            }
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

    const handleDelete = async () => {
        const confirmed = window.confirm('Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden gemaakt.');

        if (confirmed) {
            try {
                await axios.delete(`/api/bedrijf/delete-profiel`, {
                    headers: {
                        'Authorization': `Bearer ${userAuth.token}`
                    }
                });
                navigate('/');
            } catch (error) {
                console.error('Fout bij het verwijderen van het account:', error);
            }
        }
    };

    useEffect(() => {
        if (userAuth.token) {
            fetchBedrijf();
        }
    }, [userAuth.token]);

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
                                <div className="bio-row">
                                    <label>Huidig Wachtwoord</label>
                                    <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                                </div>
                                <div className="bio-row">
                                    <label>Nieuw Wachtwoord</label>
                                    <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
                                </div>
                                <div className="bio-row">
                                    <label>Herhaal Nieuw Wachtwoord</label>
                                    <input
                                        type="password"
                                        name="newPasswordRepeat"
                                        value={passwordData.newPasswordRepeat}
                                        onChange={handlePasswordChange}
                                    />
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
                    {incorrectPassword && (
                        <div className="alert alert-danger" role="alert">
                            Onjuist huidig wachtwoord. Controleer uw huidige wachtwoord.
                        </div>
                    )}
                    {incorrectNewPassword && (
                        <div className="alert alert-danger" role="alert">
                            Nieuwe wachtwoorden komen niet overeen.
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <div className="d-flex justify-content-between align-items-center">
                        {isEditing ? (
                            <>
                                <button type="button" onClick={handleSave} className="btn btn-primary">Opslaan</button>
                                <button type="button" onClick={handleCancel} className="btn btn-default">Annuleren</button>
                            </>
                        ) : (
                            <>
                                <button type="button" onClick={toggleEdit} className="btn btn-primary">Wijzigen</button>
                            </>
                        )}
                        <button type="button" onClick={handleDelete} className="btn btn-danger">Verwijder Account</button>
                    </div>
                    {saveSuccess && <p>Gegevens zijn gewijzigd!</p>}
                </div>
            </div>
        </div>
    );
}

export default BedrijfProfielPagina;
