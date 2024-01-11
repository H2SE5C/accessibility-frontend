import 'bootstrap/dist/css/bootstrap.css';
import '../../css/styles.css';
import { useState, useEffect } from 'react';

function Voogdformule({ onFormChange }) {
    const [voogd, setVoogd] = useState({
        voogdVoornaam: '',
        voogdAchternaam: '',
        voogdEmail: '',
        voogdTelefoonnummer: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVoogd(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (voogd.voogdVoornaam && voogd.voogdAchternaam && voogd.voogdEmail && voogd.voogdTelefoonnummer) {
            onFormChange(voogd);
        }
    }, [voogd, onFormChange]);


    return (


        <div className="voogdFormules">
            <div className="form-group">
                <label htmlFor="voornaam">voogdVoornaam</label>
                <input type="text" className="form-control" name="voogdVoornaam" placeholder="Kaka" value={voogd.voogdVoornaam} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="achternaam">voogdAchternaam</label>
                <input type="text" className="form-control" name="voogdAchternaam" placeholder="Liu" value={voogd.voogdAchternaam} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">voogdEmailadres</label>
                <input type="text" className="form-control" name="voogdEmail" placeholder="voorbeeld@voorbeeld.com" value={voogd.voogdEmail} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="telefoonnummer">voogdTelefoonnummer</label>
                <input type="text" className="form-control" name="voogdTelefoonnummer" placeholder="0611111111" value={voogd.voogdTelefoonnummer} onChange={handleInputChange} />
            </div>
        </div>
    );
}

export default Voogdformule;