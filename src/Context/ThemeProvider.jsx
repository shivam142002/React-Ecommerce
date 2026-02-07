
import React, { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        // Get theme from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });

    const toggleMode = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newMode);
            return newMode;
        });
    };

    useEffect(() => {
        // Update body background color based on theme
        if (mode === 'dark') {
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        } else {
            document.body.style.backgroundColor = 'white';
        }
    }, [mode]);

    const value = {
        mode,
        toggleMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;