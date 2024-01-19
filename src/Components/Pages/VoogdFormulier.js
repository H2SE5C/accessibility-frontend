import 'bootstrap/dist/css/bootstrap.css';
import '../../css/styles.css';
import { useState, useEffect } from 'react';

function VoogdFormulier({ onFormChange }) {
    const [voogd, setVoogd] = useState({
        voogdVoornaam: '',
        voogdAchternaam: '',
        voogdEmail: '',
        voogdTelefoonnummer: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
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
        <div className="voogdFormulier row">
            <div className="form-group col-md-6">
                <label htmlFor="voogdVoornaam">Voornaam voogd</label>
                <input aria-required required type="text" className="form-control" name="voogdVoornaam" id="voogdVoornaam" placeholder="Kafka" value={voogd.voogdVoornaam} onChange={handleInputChange} />
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="voogdAchternaam">Achternaam voogd</label>
                <input aria-required required type="text" className="form-control" name="voogdAchternaam" id="voogdAchternaam" placeholder="Jones" value={voogd.voogdAchternaam} onChange={handleInputChange} />
            </div>
            <div className="form-group col-md-12">
                <label htmlFor="voogdEmail">Email voogd</label>
                <input aria-required required type="email" className="form-control" name="voogdEmail" id="voogdEmail" placeholder="voorbeeld@voorbeeld.com" value={voogd.voogdEmail} onChange={handleInputChange} />
            </div>
            <div className="form-group col-md-12">
                <label htmlFor="voogdTelefoonnummer">Telefoonnummer voogd</label>
                <input aria-required required type="text" className="form-control" name="voogdTelefoonnummer" id="voogdTelefoonnummer" placeholder="0611111111" value={voogd.voogdTelefoonnummer} onChange={handleInputChange} />
            </div>
        </div>
    );
}

export default VoogdFormulier;