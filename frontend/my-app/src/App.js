import React, { useState, useEffect } from 'react';
import ProjectPage from './components/ProjectPage';
import TaskPage from './components/TaskPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



function App() {
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  
  return (
    <div className="form-container">
      <div className="button-container">
      <button id="-button" onClick={() => setShowProjects(true)}>Projects</button>
      <button id="-button" onClick={() => setShowTasks(true)}>Tasks</button>
      </div>
      {showProjects && (
        <div>
          <ProjectPage showAddProjectModal={showAddProjectModal} setShowAddProjectModal={setShowAddProjectModal} />
        </div>
      )}
      {showTasks && <TaskPage />}
    </div>
    
  );
}

export default App;
