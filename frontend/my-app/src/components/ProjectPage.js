import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectModal from '../modal/ProjectModal';

function ProjectPage({ showAddProjectModal, setShowAddProjectModal }) {
    const [projects, setProjects] = useState([]);
    const [showAddProjectModalLocal, setShowAddProjectModalLocal] = useState(false);
   
   
  
    useEffect(() => {
      async function fetchProjects() {
        try {
          const result = await axios.get('http://localhost:3000/projects');
          setProjects(result.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchProjects();
    }, []);
  
    const addProject = async (project) => {
      try {
        const result = await axios.post('http://localhost:3000/projects', project);
        setProjects([...projects, result.data]);
        setShowAddProjectModalLocal(false);
        setShowAddProjectModal(false);
      } catch (error) {
        console.log(error);
      }
    };
    
    const editProject = async (projectId, updatedProject) => {
      try {
        
        const response = await axios.put(`http://localhost:3000/projects/${projectId}`, updatedProject);
        if (response.status === 200) {
          const updatedProjects = projects.map((project) =>
            project.id === projectId ? response.data : project
          );
          setProjects(updatedProjects);
          setShowAddProjectModalLocal(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const deleteProject = async (projectId) => {
      try {  
        await axios.delete(`http://localhost:3000/projects/${projectId}`);
        const updatedProjects = projects.filter((project) => project.id !== projectId);
        setProjects(updatedProjects);
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
      <div className="project-page">
        <button id="add" onClick={() => setShowAddProjectModalLocal(true)}>+NewProject</button>
        <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Description</th>
              <th>Started At</th>
              <th>Ended At</th> 
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.label}</td>
                <td>{project.description}</td>
                <td> <i className="fas fa-calendar-alt"></i> {project.startingDate}</td>
                <td> <i className="far fa-clock"></i> {project.endingDate}</td>
                <td className="created-at-cell">{project.startingDate}</td>
                <td className="created-at-celll">{project.startingDate}</td>
                <td>
                <td><i className="fas fa-edit" onClick={() => editProject(project)}></i>
                <i className="fas fa-trash-alt" onClick={() => deleteProject(project.id)}></i></td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {showAddProjectModalLocal && (
          <ProjectModal
            onAddProject={addProject}
            onCancel={() => setShowAddProjectModalLocal(false)}
          />
        )}
      </div>
    );
  }

  export default ProjectPage;