const initialState = {
    tasks: [],
  };
  
  const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TASK':
      
        return { ...state, tasks: [...state.tasks, action.task] };
      case 'UPDATE_TASK':
    
        return { ...state, tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) {
            return action.task;
          }
          return task;
        }) };
      case 'DELETE_TASK':
        
        return { ...state, tasks: state.tasks.filter((task) => task.id !== action.taskId) };
      case 'SET_TASKS':
        
        return { ...state, tasks: action.tasks };
      case 'EMPTY_TASKS':
        
        return { ...state, tasks: [] };
      default:
        return state;
    }
  };
  
  export default tasksReducer;
  