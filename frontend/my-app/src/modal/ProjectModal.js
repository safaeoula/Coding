import React, { useState } from 'react';

function ProjectModal({ onAddProject, onCancel }) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
 

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newProject = { label, description, startingDate, endingDate };
    onAddProject(newProject);
  }

  return (
    <div className="project-modal">
      <h2><i className="fas fa-plus"></i>Add Project</h2>
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
          <label htmlFor="startingDate">Started At</label>
          <input
            type="date"
            id="startingDate"
            value={startingDate}
            onChange={(event) => setStartingDate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endingDate">Ended At</label>
          <input
            type="date"
            id="endingDate"
            value={endingDate}
            onChange={(event) => setEndingDate(event.target.value)}
          />
        </div>
        
        <button className="save" type="submit">Save</button>
        <button className="cancel" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default ProjectModal;
