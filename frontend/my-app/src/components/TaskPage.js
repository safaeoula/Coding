import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from '../modal/TaskModal';

function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [showAddTaskModalLocal, setshowAddTaskModalLocal] = useState(false);
    
    
  
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      async function fetchTasks() {
        try {
          const result = await axios.get('http://localhost:3000/tasks');
          setTasks(result.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchTasks();
  
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
  
    const addTask = async (task) => {
      try {
        const result = await axios.post('http://localhost:3000/tasks', task);
        setTasks([...tasks, result.data]);
        setshowAddTaskModalLocal(false);
      } catch (error) {
        console.log(error);
      }
    };
    const editTask = async (taskId, updatedTasks) => {
      try {
        
        const response = await axios.put(`http://localhost:3000/tasks/${taskId}`, updatedTasks);
        if (response.status === 200) {
          const updatedTasks = tasks.map((task) =>
            task.id === taskId ? response.data : task
          );
          setTasks(updatedTasks);
          setshowAddTaskModalLocal(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const deleteTask = async (taskId) => {
      try {  
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className="project-page">
        <button id= "add" onClick={() => setshowAddTaskModalLocal(true)}>+NewTask</button>
        <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Description</th>
              <th>Project</th>
              <th>Started At</th>
              <th>Ended At</th> 
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.label}</td>
                <td>{task.description}</td>
                <td>{task.selectedProject}</td>
                <td> <i className="fas fa-calendar-alt"></i> {task.starting_date}</td>
                <td> <i className="far fa-clock"></i> {task.ending_date}</td>
                <td className="created-at-cell">{task.starting_date}</td>
                <td className="created-at-celll">{task.starting_date}</td>
                <td>
                <td><i className="fas fa-edit" onClick={() => editTask(task)}></i>
                <i className="fas fa-trash-alt" onClick={() => deleteTask(task.id)}></i></td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {showAddTaskModalLocal && (
          <TaskModal
            onAddTask={addTask}
            onCancel={() => setshowAddTaskModalLocal(false)}
            projects={projects}
          />
        )}
      </div>
    );
  }

  export default TaskPage;