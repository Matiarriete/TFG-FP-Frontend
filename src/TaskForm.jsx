import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function TaskModal({ show, handleClose, task, setTask }) {

  const initailForm = {
    description: "",
    name: "",
    priority: 0,
    user: {
      idUsuarios: 0,
      usuario: "",
      email: ""
    },
    date: 0
  }
  const [form, setForm] = useState(initailForm)

  const [users, setUsers] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [buttonText, setButtonText] = useState("Agregar")
  const [error, setError] = useState('')

  useEffect(() => {

    if (task) {
      // setDisabled(true)
      setButtonText("Modificar")
      setForm(task);
    } else {
      setForm(initailForm);
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/usuarios');
        if (!response.ok) {
          throw new Error('Error al obtener los usuario');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchUsers();
  }, [task]);


  const closeTab = (e) => {
    setForm(initailForm)
    setDisabled(false)
    setButtonText("Agregar")
    handleClose();
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (buttonText === "Agregar") addTask(form)
    else modifyTask(form.idTask, form)
    closeTab()
    handleClose()
  };

  const addTask = async (postData) => {
    try {
      const response = await fetch('http://localhost:8080/task/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error(response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const modifyTask = async (id, putData) => {
    try {
      const response = await fetch('http://localhost:8080/task/update?id=' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });
      if (!response.ok) {
        throw new Error(response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    if ([e.target.name] == "user") {
      const userId = e.target.value
      const selectedUser = users.find(user => user.idUsuarios == userId);
      setForm({
        ...form,
        [e.target.name]: selectedUser
      })
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <Modal show={show} onHide={closeTab}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskName">
            <Form.Label>Nombre de la Tarea</Form.Label>
            <Form.Control
              type="text"
              name="name"
              disabled={disabled}
              placeholder="Ingrese una tarea"
              value={form.name}
              onChange={handleChange}
            />

            <Form.Label>Descripcion de la tarea</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Ingrese una descripcion"
              disabled={disabled}
              value={form.description}
              onChange={handleChange}
            />

            <Form.Label>Prioridad de la tarea</Form.Label>
            <Form.Select disabled={disabled} value={form.priority} name="priority" onChange={handleChange}>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </Form.Select>

            <Form.Label>Responsable de la tarea</Form.Label>
            <Form.Select aria-label="Default select example" name="user" onChange={handleChange} disabled={disabled} value={form.user.idUsuarios}>
              <option>Open this select menu</option>
              {users.map(user => (
                <option key={user.idUsuarios} value={user.idUsuarios}>{user.usuario}</option>
              ))}
            </Form.Select>

            <Form.Label>Fecha de la tarea</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              placeholder="Ingrese una fecha y hora"
              disabled={disabled}
              value={form.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleClick}>
            {buttonText}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskModal;
