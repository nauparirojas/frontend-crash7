export const initialState = { 
  items: [], 
  filter: 'all', 
  sort: 'asc' 
}

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case 'FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'SORT':
      return {
        ...state,
        sort: action.payload
      }
    default:
      return state
  }
}

export default tasksReducer