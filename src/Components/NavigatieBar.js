import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import logo from '../images/Logo Icon/Op blauw/Transparant/icon_accessibility_on-blue_transp.png';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

function NavigatieBar() {
    const {userAuth}  = useAuth() || {};
    const {setAuth}  = useAuth() || {};
    const active = ({ isActive }) => { return isActive ? { /*color: "red"*/ } : {} }
    const isUserAuthEmpty = Object.keys(userAuth).length === 0;
    const logUit = async () => {
        
        setAuth({})

        try {
            await axios.post('loguit', {}, {
                'withCredentials': true
            })
        }
        catch(err) {
            console.log(err);
        }
    }
    return (
        <nav className="navbar navigatie">
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="Logo" className="nav-logo" />
                {/*<div className="logo-tekst">Accessibility</div>*/}
            </Link>
            { 
            !isUserAuthEmpty ? 
            <NavLink to="/" className="login-knop" onClick={() => logUit()}>Log uit</NavLink> 
            : 
            <NavLink style={active} to="/login" className="login-knop">Login</NavLink>
            }
        </nav>
    );
}

export default NavigatieBar;
