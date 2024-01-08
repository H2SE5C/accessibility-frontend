import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import logo from '../images/Logo Icon/Op blauw/Transparant/icon_accessibility_on-blue_transp.png';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
function NavigatieBar() {
    const { userAuth } = useAuth();
    const { setAuth } = useAuth();
    
    const active = ({ isActive }) => { return isActive ? { /*color: "red"*/ } : {} }
    const isUserAuthEmpty = Object.keys(userAuth).length === 0;
    return (
        <nav className="navbar navigatie">
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="Logo" className="nav-logo" />
                {/*<div className="logo-tekst">Accessibility</div>*/}
            </Link>
            <Link to="/ervaringsdeskundige">Ervaringsdeskundige</Link>
            { !isUserAuthEmpty ? <NavLink to="/" className="login-knop" onClick={() => setAuth({})}>Log uit</NavLink> : <NavLink style={active} to="/login" className="login-knop">Login</NavLink>}
        </nav>
    );
}

export default NavigatieBar;
