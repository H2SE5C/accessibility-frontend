import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import logo from '../images/Logo Icon/Op blauw/Transparant/icon_accessibility_on-blue_transp.png';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

function NavigatieBar() {
    const { userAuth } = useAuth() || {};
    const { setAuth } = useAuth() || {};
    const active = ({ isActive }) => { return isActive ? { /*color: "red"*/ } : {} }

    const isUserAuthEmpty = Object.keys(userAuth).length === 0;
    const hasBedrijfRole = !isUserAuthEmpty && userAuth.roles[0] === "Bedrijf";
    const hasErvaringsdeskundigeRole = !isUserAuthEmpty && userAuth.roles[0] === "Ervaringsdeskundige";
    const hasMedewerkerRole = !isUserAuthEmpty && userAuth.roles[0] === "Medewerker";
    const hasBeheerderRole = !isUserAuthEmpty && userAuth.roles[0] === "Beheerder";
  
    const logUit = async () => {

        setAuth({})

        try {
            await axios.post('loguit', {}, {
                'withCredentials': true
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className="navbar navigatie">
            <Link to={!isUserAuthEmpty ? `/${userAuth.roles[0]}` : "/"} className="navbar-brand">
                <img src={logo} alt="logo van stichting" className="nav-logo" />
                {/*<div className="logo-tekst">Accessibility</div>*/}
            </Link>

            {hasBeheerderRole ?
                <div>
                    <NavLink to="/beheerder" className="BEheerderHome Navlink">Beheerder Home</NavLink>
                    <NavLink to="/beheerder/ervaringsdeskundigen" className="BEheerderHome Navlink">Ervaringsdeskundigen</NavLink>
                    <NavLink to="/beheerder/bedrijven" className="BEheerderHome Navlink">Bedrijven</NavLink>
                    <NavLink to="/beheerder/medewerkers" className="BEheerderHome Navlink">Medewerkers</NavLink>
                </div> : <></>
            }
           {hasMedewerkerRole ?
                <div>
            <NavLink to="/medewerker" className="MedewerkerfHome Navlink">Medewerker Home</NavLink>
                </div> : <></>
            }

            { hasBedrijfRole ? 
                <div>
                    <NavLink to="/bedrijf" className="BedrijfHome Navlink">Bedrijf Home</NavLink>
                    <NavLink to="/bedrijf/vragenlijsten" className="BedrijfVragenlijsten Navlink">Vragenlijsten</NavLink>
                    <NavLink to="/bedrijf/profiel" className="BedrijfProfiel Navlink" >Bedrijf Profiel</NavLink>
                    <NavLink to="/bedrijf/chat" className="BedrijfProfiel Navlink" >Chat</NavLink>
                </div> : <></>
            }

            { hasErvaringsdeskundigeRole ? 
                <div>
                    <NavLink to="/ervaringsdeskundige" className="ervaringsdeskundige Navlink">Onderzoeken</NavLink>
                    <NavLink to="/ervaringsdeskundige/profiel" className="ervaringsdeskundige Navlink">Profiel</NavLink>
                    <NavLink to="/ervaringsdeskundige/chat" className="ervaringsdeskundige Navlink">Chat</NavLink>
                </div> : <></>
            }

            {!isUserAuthEmpty ? <NavLink to="/" className="login-knop Navlink" onClick={() => logUit()}>Log uit</NavLink> : <NavLink style={active} to="/login" className="login-knop Navlink">Login</NavLink>}

        </nav>
    );
}

export default NavigatieBar;
