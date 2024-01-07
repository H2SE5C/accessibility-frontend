import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import logo from '../images/Logo Icon/Op blauw/Transparant/icon_accessibility_on-blue_transp.png';
import { Link } from 'react-router-dom';
function NavigatieBar() {
    return (
        <nav className="navbar navigatie">
            <a className="navbar-brand" href="#">
                <img src={logo} alt="Logo" className="nav-logo" />
                {/*<div className="logo-tekst">Accessibility</div>*/}
            </a>
           <Link to="/login" className="login-knop">Login</Link>
        </nav>
    );
}

export default NavigatieBar;
