import React, { useState } from 'react';

function TaskModal({ onAddTask, onCancel, projects }) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [starting_date, setstarting_date] = useState('');
  const [ending_date, setending_date] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {label, description, starting_date, ending_date, selectedProject };
    onAddTask(newTask);
  }

  return (
    <div className="project-modal">
      <h2><i className="fas fa-plus"></i>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="label">Label</label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="project">Project</label>
          <select
            id="selectedProject"
            value={selectedProject}
            onChange={(event) => setSelectedProject(event.target.value)}
          >
            <option value="">Select a Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="starting_date">Started At</label>
          <input
            type="date"
            id="starting_date"
            value={starting_date}
            onChange={(event) => setstarting_date(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ending_date">Ended At</label>
          <input
            type="date"
            id="ending_date"
            value={ending_date}
            onChange={(event) => setending_date(event.target.value)}
          />
        </div>
        
        <button className="save" type="submit">Save</button>
        <button className="cancel" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default TaskModal;
