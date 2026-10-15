import { useState, useMemo, useCallback, useRef, useEffect } from 'react'

const TaskList = ({ tasks, filter, sort, onRemove, onAdd, onFilterChange, onSortChange }) => {
  const [title, setTitle] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const processedTasks = useMemo(() => {
    let result = [...tasks]
    
    if (filter === 'completed') {
      result = result.filter(t => t.completed)
    } else if (filter === 'pending') {
      result = result.filter(t => !t.completed)
    }

    result.sort((a, b) => {
      if (sort === 'asc') {
        return a.title.localeCompare(b.title)
      } else {
        return b.title.localeCompare(a.title)
      }
    })

    return result
  }, [tasks, filter, sort])

  const handleRemove = useCallback((id) => {
    onRemove(id)
  }, [onRemove])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ id: Date.now(), title, completed: false })
    setTitle('')
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
          style={{ padding: '8px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Agregar</button>
      </form>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)} style={{ padding: '6px' }}>
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>

        <select value={sort} onChange={(e) => onSortChange(e.target.value)} style={{ padding: '6px' }}>
          <option value="asc">Ascendente (A-Z)</option>
          <option value="desc">Descendente (Z-A)</option>
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {processedTasks.length === 0 ? (
          <p style={{ color: '#666' }}>No hay tareas registradas.</p>
        ) : (
          processedTasks.map(task => (
            <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span>{task.title}</span>
              <button onClick={() => handleRemove(task.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default TaskList