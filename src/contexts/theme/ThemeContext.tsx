import { createContext, useState } from 'react';

type ThemeContextType = {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  setPrimary: (color: string) => void;
  setSecondary: (color: string) => void;
  setTertiary: (color: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>([]);

export const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimary] = useState<string>('white');
  const [secondaryColor, setSecondary] = useState<string>('black');
  const [tertiaryColor, setTertiary] = useState<string>('grey');

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        tertiaryColor,
        setPrimary,
        setSecondary,
        setTertiary,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
