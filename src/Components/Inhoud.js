import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import RegistreerBedrijf from '../Components/RegistreerBedrijf'
import Login from './Login';
function Inhoud() {
    return (
        <div className="inhoud container">
            <Login />
        </div>
    );
}

export default Inhoud;
