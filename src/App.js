import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap'
import TaskFormAdd from './TaskFormAdd';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [modalUpdateData, setModalUpdateData] = useState(null)
  const [error, setError] = useState(null)

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

  const handleShowModalAdd = () => setShowModalAdd(true);

  const handleCloseModal = () => {
    setShowModalAdd(false)
    setTasks(tasks)
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/task?id=' + id, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }
      setTasks(tasks.filter(task => task.idTask !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Administrador de Tareas</h1>
      <Button variant="primary" onClick={handleShowModalAdd}>
        Agregar Tarea
      </Button>
      <TaskFormAdd
        show={showModalAdd}
        handleClose={handleCloseModal}
        task={modalUpdateData}
        setTask={setModalUpdateData}
      />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} setModalUpdateData={setModalUpdateData} handleShowModalAdd={handleShowModalAdd}/>
    </div>
  );
}

export default App;
