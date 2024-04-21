import React, { useState } from 'react';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';

function TaskList({ setModalUpdateData, handleShowModalAdd}) {

  const [tasks, setTasks] = useState([])
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
  }, [tasks]);

  const markAsDone = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/task?id=' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
    <table>
      <thead>
        <tr>
          <td>Done</td>
          <td>Nombre</td>
          <td>Descripcion</td>
          <td>Prioridad</td>
          <td>Usuario</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.idTask} style={{backgroundColor: task.done === true ? "#63BE4B" : "#BF4930"}}>
            <td><div><input type="checkbox" name={task.name} id={task.idTask} checked={task.done} onClick={() => markAsDone(task.idTask)} /></div></td>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.priority == 1 ? "High" : task.priority == 2 ? "Medium" : "Low"}</td>
            <td>{task.user.usuario}</td>
            <td>
              <div>
                <Button className="m-2" onClick={() => {setModalUpdateData(task); handleShowModalAdd()}}>Modificar</Button>
                <Button variant='danger' className="m-2" onClick={() => deleteTask(task.idTask)}>Eliminar</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      
    </table>
  );
}

export default TaskList;
