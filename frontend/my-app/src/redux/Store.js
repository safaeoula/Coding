import { createStore, combineReducers } from 'redux';
import projectsReducer from './reducers/projectsReducer';
import tasksReducer from './reducers/tasksReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

const store = createStore(rootReducer);

export default store;
