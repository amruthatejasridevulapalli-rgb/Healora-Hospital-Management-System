import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("lavender");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("healora-theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("healora-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);