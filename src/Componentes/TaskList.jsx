import React, { useState } from 'react';
import { Button, Accordion, Table, Form, Row, Col, ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';

function TaskList({ setModalData, handleShowModalAdd, handleShowModalDelete, reloadData, setReloadData, users }) {

  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)
  const [form, setForm] = useState()
  const searchParams = new URLSearchParams();

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://backend-tfg-38792dd679ce.herokuapp.com/task');
      if (!response.ok) {
        throw new Error('Error al obtener las tareas');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    doneCount()
    setReloadData(true)
  }, [reloadData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {
    try {
      filter(form.done, form.name, form.priority, form.user)
    } catch (error) {
      fetchTasks()
    }
  }

  const markAsDone = async (id) => {
    try {
      const response = await fetch('https://backend-tfg-38792dd679ce.herokuapp.com/task?id=' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(response.json());
      } else {
        setReloadData(false)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filter = async (done, name, priority, userId) => {
    try {
      if (done != undefined) if (done != "Todos") searchParams.set("done", done)
      if (name != undefined) if (name != "") searchParams.set("nombre", name)
      if (priority != undefined) if (priority != 0) searchParams.set("priority", priority)
      if (userId != undefined) if (userId != "Todos") searchParams.set("idUser", userId)
      const response = await fetch('https://backend-tfg-38792dd679ce.herokuapp.com/task/filter?'
        + searchParams.toString()
      )
      if (!response.ok) {
        throw new Error(response.json());
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateDate = (date) => {
    var fecha = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24))
    if (fecha <= 0) {
      return "Tiempo excedido"
    } else {
      if (fecha === 1) {
        fecha = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60))
        if (fecha === 1) return "Menos de 1 hora"
        return fecha + " horas"
      }
    }
    return fecha + " días"
  }

  const doneCount = (count) => {
    var done = 0
    tasks.map(element => {
      if (element.done) {
        done = done + 1
      }
    });
    var resultado = done * 100 / count
    return resultado.toFixed(2)
  }

  const noDoneCount = (count) => {
    var noDone = 0
    tasks.map(element => {
      if (!element.done) {
        noDone = noDone + 1
      }
    });
    var resultado = noDone * 100 / count
    return resultado.toFixed(2)
  }

  return (
    <div>
      <div id='progreso' className='m-3 p-1'>
        <h2 className='d-flex justify-content-center'>Progreso de tareas</h2>
        <ProgressBar className='m-3'>
          <ProgressBar
            className='doneClass'
            now={doneCount(tasks.length) >= 0 ? doneCount(tasks.length) : 100}
            label={`${doneCount(tasks.length) >= 0 ? doneCount(tasks.length) : 100}%`}
          />
          <ProgressBar
            className='noDoneClass'
            now={noDoneCount(tasks.length) > 0 ? noDoneCount(tasks.length) : 0}
            label={`${noDoneCount(tasks.length) > 0 ? noDoneCount(tasks.length) : 0}%`}
          />
        </ProgressBar>
      </div>

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
                    size='sm'
                    onChange={handleChange} />
                </Col>
                <Col>
                  <Form.Label>Prioridad de la tarea</Form.Label>

                  <Form.Select name="priority" size='sm' onChange={handleChange}>
                    <option value={0}>Todos</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Usuario encargado</Form.Label>
                  <Form.Select name="user" size='sm' onChange={handleChange}>
                    <option>Todos</option>
                    {users.map(user => (
                      <option key={user.idUsuarios} value={user.idUsuarios}>{user.usuario}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Finalizada</Form.Label>
                  <Form.Select name="done" size='sm' onChange={handleChange}>
                    <option>Todos</option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </Col>
              </Row>
              <Button className='mt-3' variant="primary" onClick={handleClick}>Buscar</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Table striped >
        <thead className='table-dark'>
          <tr>
            <td className="fw-semibold">Done</td>
            <td className="fw-semibold">Nombre</td>
            <td className="fw-semibold">Descripcion</td>
            <td className="fw-semibold">Fecha finalizacion</td>
            <td className="fw-semibold">Prioridad</td>
            <td className="fw-semibold">Usuario</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.idTask}>
              <td variant='dark'>
                <div>
                  <input className="form-check-input" type="checkbox" name={task.name} id={task.idTask} checked={task.done} onChange={() => markAsDone(task.idTask)} />
                </div>
              </td>
              <td className={task.done ? "text-decoration-line-through" : "fw-normal"}>{task.name}</td>
              <td className={task.done ? "text-decoration-line-through" : "fw-normal"}>{task.description}</td>
              <td className={task.done ? "text-decoration-line-through" : "fw-normal"}>{calculateDate(task.date)}</td>
              <td className={task.done ? "text-decoration-line-through" : "fw-normal"}>{task.priority == 1 ? "High" : task.priority == 2 ? "Medium" : "Low"}</td>
              <td className={task.done ? "text-decoration-line-through" : "fw-normal"}>{task.user.usuario}</td>
              <td>
                <div>
                  <Button variant={task.done ? "success" : "primary"} className="m-2" onClick={() => { setModalData(task); handleShowModalAdd() }}>{task.done ? "Ver" : "Modificar"}</Button>
                  <Button disabled={task.done} variant='danger' className="m-2" onClick={() => { setModalData(task); handleShowModalDelete() }}>Eliminar</Button>
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
