import 'bootstrap/dist/css/bootstrap.css';
import '../../css/styles.css';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loading from '../Loading';
//moet nog errors laten zien
function Login() {
    const LOGIN_URL = '/api/authenticatie/login';
    const location = useLocation();
    const navigate = useNavigate();
    
    const { setAuth } = useAuth();
    const [email, setEmail] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [bericht, setBericht] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(LOGIN_URL, { email, wachtwoord }, {
                'withCredentials': true
            });
            const expiration = response?.data?.expiration;
            const token = response?.data?.token;
            const roles = response?.data?.roles;
            setAuth({expiration, token, roles});
            
            const from = location.state?.from?.pathname || "/"+[roles];

            navigate(from, {replace: true});
        }
        catch (err) {
            //error catches kan misschien apart zodat het niet meerdere keren wordt herhaalt op andere pagina's
            console.log(JSON.parse(err?.request?.response).message);
           if(err?.message === "Network Error") {
            setBericht("Kan database niet bereiken... Probeer later nog een keer.");
           }
           else if (err?.request?.response) {
            setBericht(JSON.parse(err?.request?.response)?.message);
           }
           else {
            setBericht(JSON.stringify(err?.message));
           }
           setError(true);
        }
        finally {
            setLoading(false);
        }
        /*      console.log(email, locatie, wachtwoord);*/
    }
    return (
        <div className="container">
            <Loading isLoading={isLoading}>
            <div className="header text-center">
                <h1>Login</h1>
                {error && <p className='text-danger'>{bericht}</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Emailadres</label>
                    <input required type="text" className="form-control" id="email" placeholder="voorbeeld@voorbeeld.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="wachtwoord">Wachtwoord</label>
                    <input required type="password" className="form-control" id="wachtwoord" placeholder="Wachtwoord" value={wachtwoord} onChange={(e) => { setWachtwoord(e.target.value) }} />
                </div>

                <button type="submit" className="btn btn-primary mt-2">Login</button>
                <p className="registreer-tekst"><Link to="/registreer-bedrijf">Geen account? Registreer hier als bedrijf!</Link></p>
                <p className="registreer-tekst"><Link to="/registreer-ervaringsdeskundige">Geen account? Registreer hier als ervaringsdeskundige!</Link></p>
            </form>
            </Loading>
        </div>
    );
}

export default Login;
