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
    const hasBedrijfRole = !isUserAuthEmpty && userAuth.roles[0] === "Bedrijf";
    const hasErvaringsdeskundigeRole = !isUserAuthEmpty && userAuth.roles[0] === "Ervaringsdeskundige";
  
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
            <Link to="/" className="navbar-brand" >
                <img src={logo} alt="logo van stichting" className="nav-logo" />
                {/*<div className="logo-tekst">Accessibility</div>*/}
            </Link>
            { hasBedrijfRole ? 
                <div>
                    <NavLink to="/bedrijf/profiel" className="BedrijfProfiel Navlink" >BedrijfProfiel</NavLink>
                </div> : <></>
            }

            { hasErvaringsdeskundigeRole ? 
                <div>
                    <NavLink to="/ervaringsdeskundige" className="ervaringsdeskundige Navlink">Onderzoeken</NavLink>
                    <NavLink to="/ervaringsdeskundige/profiel" className="ervaringsdeskundige Navlink">Profiel</NavLink>
                </div> : <></>
            }

            {!isUserAuthEmpty ? <NavLink to="/" className="login-knop Navlink" onClick={() => logUit()}>Log uit</NavLink> : <NavLink style={active} to="/login" className="login-knop Navlink">Login</NavLink>}
            
        </nav>
    );
}

export default NavigatieBar;
