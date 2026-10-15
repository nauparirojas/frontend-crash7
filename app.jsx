import { useReducer, useContext } from 'react'
import tasksReducer, { initialState } from './hooks/useTasksReducer'
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext'
import TaskList from './components/TaskList'

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