import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import logo from '../images/Logo Icon/Op blauw/Transparant/icon_accessibility_on-blue_transp.png';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function NavigatieBar() {
    const {userAuth}  = useAuth() || {};
    const {setAuth}  = useAuth() || {};
    console.log(userAuth);
    const active = ({ isActive }) => { return isActive ? { /*color: "red"*/ } : {} }

    const isUserAuthEmpty = Object.keys(userAuth).length === 0;
    const hasBedrijfRole = !isUserAuthEmpty && userAuth.roles[0] === "Bedrijf";
  
    return (
        <nav className="navbar navigatie">
            <Link to="/" className="navbar-brand" >
                <img src={logo} alt="Logo" className="nav-logo" />
                {/*<div className="logo-tekst">Accessibility</div>*/}
            </Link>
            {hasBedrijfRole ? 
                <div>
                <NavLink to="/bedrijf/profiel" className="BedrijfProfiel Navlink" >BedrijfProfiel</NavLink>
                </div>
                : <></>}
            {!isUserAuthEmpty ? <NavLink to="/" className="login-knop Navlink" onClick={() => setAuth({})}>Log uit</NavLink> : <NavLink style={active} to="/login" className="login-knop Navlink">Login</NavLink>}
            
        </nav>
    );
}

export default NavigatieBar;
