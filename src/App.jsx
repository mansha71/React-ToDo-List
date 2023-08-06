import React, { useState } from 'react';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState([]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput('');
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckboxStatus((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index]; // Toggle the checkbox status
      return newState;
    });
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1); // Remove the task at the specified index
      return updatedTasks;
    });
    setCheckboxStatus((prevCheckboxStatus) => {
      const updatedCheckboxStatus = [...prevCheckboxStatus];
      updatedCheckboxStatus.splice(index, 1); // Remove the corresponding checkbox status
      return updatedCheckboxStatus;
  });

  }

  return (
    <>
      <h3>Enter Task</h3>
      <form onSubmit={handleAddTask}>
        <label htmlFor="taskInput">Task:</label>
        <input type="text" value={taskInput} onChange={handleInputChange} />
        <button className='btn' type="submit">Add</button>
      </form>
      <h3>Current Tasks:</h3>
      <div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={checkboxStatus[index] ? 'completed-task' : ''}>
              <label>
                <input type="checkbox" checked={checkboxStatus[index]} onChange={() => handleCheckboxChange(index)}/>
                {task}
              </label>
              <button className='btn btn-danger' onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
