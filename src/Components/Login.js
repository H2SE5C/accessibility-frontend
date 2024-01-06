import 'bootstrap/dist/css/bootstrap.css';
import '../css/styles.css';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
function Login() {
    const LOGIN_URL = '/api/authenticatie/login';
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ email, wachtwoord }), {
                'headers': { 'Content-Type': 'application/json' },
                'Access-Control-Allow-Crendentials': true
            });
            console.log(response);
        }
        catch (err) {
            console.log(err?.response?.data.message);
        }
        /*      console.log(email, locatie, wachtwoord);*/
    }
    return (
        <div className="container">
            <div className="header text-center">
                <h1>Login</h1>
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
            </form>
        </div>
    );
}

export default Login;
