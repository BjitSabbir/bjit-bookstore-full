/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: "",
        token: "",
        role: "",
        userId: "",
    });

    const login = ({ email, token, role, userId }) => {
        setUser({
            email,
            token,
            role,
            userId,
        });

        console.log(user);
    };

    const logout = () => {
        setUser({
            email: "",
            token: "",
            role: "",
            userId: "",
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
