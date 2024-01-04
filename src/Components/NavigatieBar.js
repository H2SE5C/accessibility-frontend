import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import logo from '../images/Logo Icon/Op blauw/Transparant/icon_accessibility_on-blue_transp.png';
function NavigatieBar() {
    return (
        <nav className="navbar navigatie">
            <a className="navbar-brand" href="#">
                <img src={logo} alt="Logo" className="nav-logo" />
                {/*<div className="logo-tekst">Accessibility</div>*/}
            </a>
           <a href="#" className="login-knop">Login</a>
        </nav>
    );
}

export default NavigatieBar;
