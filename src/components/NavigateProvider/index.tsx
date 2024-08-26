import React, { createContext, useContext } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { NavigateProviderProps } from './interface';

const NavigateContext = createContext<NavigateFunction | null>(null);

export const NavigateProvider: React.FC<NavigateProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    return (
        <NavigateContext.Provider value={navigate}>
            {children}
        </NavigateContext.Provider>
    );
};

export const useNavigateContext = () => {
    const context = useContext(NavigateContext);
    if (!context) {
        throw new Error('useNavigateContext must be used within a NavigateProvider');
    }
    return context;
};
