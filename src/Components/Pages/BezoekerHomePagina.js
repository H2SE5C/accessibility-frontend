import 'bootstrap/dist/css/bootstrap.css';
import '../../css/styles.css';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
function BezoekerHomePagina() {
    return (
        <div className="container">
            <div className="header text-center">
                <h1>Welkom</h1>
            </div>
            
            <div className="welkom-tekst">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.bz</p>
            </div>
        </div>
    );
}

export default BezoekerHomePagina;
