// taskActions.js
export const addTask = (task) => ({
    type: 'ADD_TASK',
    task,
  });
  
  export const updateTask = (task) => ({
    type: 'UPDATE_TASK',
    task,
  });
  
  export const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    taskId,
  });
  
  export const setTasks = (tasks) => ({
    type: 'SET_TASKS',
    tasks,
  });
  
  export const emptyTasks = () => ({
    type: 'EMPTY_TASKS',
  });
  