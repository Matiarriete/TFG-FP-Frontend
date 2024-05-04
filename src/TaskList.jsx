import React, { useState } from 'react';
import {Button, Accordion, Table, Form, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';

function TaskList({ setModalUpdateData, setModalDeleteData, handleShowModalAdd, users, handleShowModalDelete, reloadData, setReloadData}) {

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
      setReloadData(true)
  }, [reloadData]);

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
      } else {
        setReloadData(!reloadData)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateDate = (date) => {
    var fecha = Math.ceil((new Date(date) - new Date()) / (1000* 60 *60 *24))
    if(fecha === 0){
      return "Tiempo excedido"
    } else {
      if (fecha === 1) {
        fecha = Math.ceil((new Date(date) - new Date()) / (1000* 60 *60))
        if(fecha === 1) return "Menos de 1 hora"
        return fecha + " horas"
      }
    }
    return fecha + " días"
  }

  

  return (
    <div>
      <Accordion className='mt-3 mb-3'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Filters</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Label>Nombre tarea</Form.Label>
                  <Form.Control 
                    type="text"
                    name="name"
                    placeholder="Ingrese una tarea"
                    size='sm'/>
                </Col>
                <Col>
                  <Form.Label>Prioridad de la tarea</Form.Label>

                  <Form.Select name="priority" size='sm'>
                    <option value={1}>Todos</option>
                    <option value={2}>High</option>
                    <option value={3}>Medium</option>
                    <option value={4}>Low</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Usuario encargado</Form.Label>
                  <Form.Select name="users" size='sm'>
                    <option>Todos</option>
                    {users.map(user => (
                      <option key={user.idUsuarios} value={user.idUsuarios}>{user.usuario}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Finalizada</Form.Label>
                  <Form.Select name="done" size='sm'>
                    <option value={1}>Todos</option>
                    <option value={2}>Si</option>
                    <option value={3}>No</option>
                  </Form.Select>
                </Col>
              </Row>
              <Button className='mt-3' variant="primary">Buscar</Button>
              
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Table striped >
        <thead className='table-dark'>
          <tr>
            <td>Done</td>
            <td>Nombre</td>
            <td>Descripcion</td>
            <td>Fecha finalizacion</td>
            <td>Prioridad</td>
            <td>Usuario</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.idTask}>
              <td variant='dark'>
                <div>
                  <input type="checkbox" name={task.name} id={task.idTask} checked={task.done} onClick={() => markAsDone(task.idTask)} />
                </div>
              </td>
              <td className={task.done ? "text-decoration-line-through":"fw-normal"}>{task.name}</td>
              <td className={task.done ? "text-decoration-line-through":"fw-normal"}>{task.description}</td>
              <td className={task.done ? "text-decoration-line-through":"fw-normal"}>{calculateDate(task.date)}</td>
              <td className={task.done ? "text-decoration-line-through":"fw-normal"}>{task.priority == 1 ? "High" : task.priority == 2 ? "Medium" : "Low"}</td>
              <td className={task.done ? "text-decoration-line-through":"fw-normal"}>{task.user.usuario}</td>
              <td>
                <div>
                  <Button disabled={task.done} className="m-2" onClick={() => {setModalUpdateData(task); handleShowModalAdd()}}>Modificar</Button>
                  <Button disabled={task.done} variant='danger' className="m-2" onClick={() => {setModalDeleteData(task); handleShowModalDelete()}}>Eliminar</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        
      </Table>
    </div>
  );
}

export default TaskList;
