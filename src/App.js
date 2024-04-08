import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap'
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/task');
        if (!response.ok) {
          throw new Error('Error al obtener las tareas');
        }
        const data = await response.json(); 
        setTasks(data);
      } catch (error) {
        setError(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const deleteTask = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/task?id=' + id, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }
      const data = await response;
      setTasks(tasks.filter(task => task.idTask !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Administrador de Tareas</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Agregar Tarea
      </Button>
      <TaskForm
        show={showModal}
        handleClose={handleCloseModal}
      />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
    </div>
  );
}

export default App;
