import { createContext, useContext, useEffect, useReducer } from 'react'
import tasksReducer, { initialState } from './hooks/useTasksReducer'
import TaskList from './components/TaskList'

// Custom Hook de LocalStorage integrado
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useReducer((_, newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))
      return newValue
    } catch {
      return defaultValue
    }
  }, defaultValue, () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  })

  return [value, setValue]
}

// Contexto de Tema integrado
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
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Dashboard Principal
const Dashboard = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialState)
  const { theme, toggleTheme } = useContext(ThemeContext)

  const handleAdd = (task) => {
    dispatch({ type: 'ADD', payload: task })
  }

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const handleFilterChange = (filter) => {
    dispatch({ type: 'FILTER', payload: filter })
  }

  const handleSortChange = (sort) => {
    dispatch({ type: 'SORT', payload: sort })
  }

  return (
    <div className={`dashboard ${theme}`} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Gestor de Tareas</h1>
        <button onClick={toggleTheme} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Cambiar Tema ({theme})
        </button>
      </div>

      <TaskList
        tasks={state.items}
        filter={state.filter}
        sort={state.sort}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}