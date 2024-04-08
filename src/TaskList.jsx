import React, { useState } from 'react';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

function TaskList({ tasks, onDeleteTask }) {

  return (
    <table>
      <thead>
        <tr>
          <td>Nombre</td>
          <td>Descripcion</td>
          <td>Prioridad</td>
          <td>Usuario</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.idTask}>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.priority}</td>
            <td>{task.user.usuario}</td>
            <td><Button onClick={() => onDeleteTask(task.idTask)}>Eliminar</Button></td>
          </tr>
        ))}
      </tbody>
      
    </table>
  );
}

export default TaskList;
