import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userAuth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ userAuth, setAuth }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;