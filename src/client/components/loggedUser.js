import { createContext, useContext, useState } from 'react';

const userContext = createContext();

export const LoggedUserProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState('');

    return (
        <userContext.Provider value={{ loggedUser, setLoggedUser }}>
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => useContext(userContext);