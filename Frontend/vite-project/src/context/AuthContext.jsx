import React from 'react';
import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token');
        const storedUserRole = localStorage.getItem('userRole');

        console.log("tokentoken", token, "userRole:", storedUserRole);


        if (token && storedUserRole) {
            setIsAuthenticated(true);
            setUserRole(storedUserRole);
            console.log('User Role Set:', storedUserRole);                                                      
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
            console.log('No token found, setting isAuthenticated to false');
        }
    }, );

    // useEffect(() => {
    //     // Function to handle updates when localStorage is modified
    //     const handleStorageChange = () => {
    //         const token = localStorage.getItem('token');
    //         const storedUserRole = localStorage.getItem('userRole');

    //         if (token && storedUserRole) {
    //             setIsAuthenticated(true);
    //             setUserRole(storedUserRole);
    //             console.log('User Role Set via Storage Change:', storedUserRole);
    //         } else {
    //             setIsAuthenticated(false);
    //             setUserRole(null); 
    //             console.log('Storage changed, no token found');
    //         }
    //     };

    //     // Attach event listener for 'storage' events
    //     window.addEventListener('storage', handleStorageChange);

    //     // Clean up the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // },[]);

    const login = (token, userRole) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', userRole);
        setIsAuthenticated(true);
        setUserRole(userRole);
      };

      const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole(null);
      };
    return (

        <AuthContext.Provider value={{ isAuthenticated, userRole , login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

