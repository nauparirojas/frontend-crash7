import { createContext, useEffect } from 'react'
import { useLocalStorage } from "./hooks/useLocalStorage";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('app_theme', 'light')

  useEffect(() => {
    document.body.className = theme
    return () => {
      document.body.className = ''
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}