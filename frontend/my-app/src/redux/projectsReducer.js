const initialState = {
    projects: [],
  };
  
  const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PROJECT':
      
        return { ...state, projects: [...state.projects, action.project] };
      case 'UPDATE_PROJECT':
        
        return { ...state, projects: state.projects.map((project) => {
          if (project.id === action.project.id) {
            return action.project;
          }
          return project;
        }) };
      case 'DELETE_PROJECT':
        
        return { ...state, projects: state.projects.filter((project) => project.id !== action.projectId) };
      case 'SET_PROJECTS':
      
        return { ...state, projects: action.projects };
      case 'EMPTY_PROJECTS':
        
        return { ...state, projects: [] };
      default:
        return state;
    }
  };
  
  export default projectsReducer;
  