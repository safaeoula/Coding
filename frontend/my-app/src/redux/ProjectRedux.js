// projectActions.js
export const addProject = (project) => ({
    type: 'ADD_PROJECT',
    project,
  });
  
  export const updateProject = (project) => ({
    type: 'UPDATE_PROJECT',
    project,
  });
  
  export const deleteProject = (projectId) => ({
    type: 'DELETE_PROJECT',
    projectId,
  });
  
  export const setProjects = (projects) => ({
    type: 'SET_PROJECTS',
    projects,
  });
  
  export const emptyProjects = () => ({
    type: 'EMPTY_PROJECTS',
  });
  