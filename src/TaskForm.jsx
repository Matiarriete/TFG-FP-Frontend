import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function TaskModal({ show, handleClose, task, setTask, users}) {

  const initailForm = {
    description: "",
    name: "",
    priority: 1,
    done: false,
    user: {
      idUsuarios: 0,
      usuario: "",
      email: ""
    },
    date: 0
  }
  const [form, setForm] = useState(initailForm)

  const [buttonText, setButtonText] = useState("Agregar")
  const [error, setError] = useState('')

  useEffect(() => {

    if (task) {
      setButtonText("Modificar")
      setForm(task);
    } else {
      setForm(initailForm);
    }
  }, [task]);


  const closeTab = (e) => {
    setForm(initailForm)
    setButtonText("Agregar")
    handleClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (buttonText === "Agregar") addTask(form)
    else modifyTask(form.idTask, form)
    closeTab()
  };

  const addTask = async (postData) => {
    try {
      const response = await fetch('https://backend-tfg-38792dd679ce.herokuapp.com/task/add', {
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
      const response = await fetch('https://backend-tfg-38792dd679ce.herokuapp.com/task/update?id=' + id, {
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
        <Modal.Title>{form.done ? "Ver Tarea" : buttonText === "Agregar" ? "Agregar Tarea" : "Modificar Tarea"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskName">
            <Form.Label>Nombre de la Tarea</Form.Label>
            <Form.Control
              type="text"
              disabled={form.done}
              required={true}
              name="name"
              placeholder="Ingrese una tarea"
              value={form.name}
              onChange={handleChange}
            />

            <Form.Label>Descripcion de la tarea</Form.Label>
            <Form.Control
              type="text"
              disabled={form.done}
              required={true}
              name="description"
              placeholder="Ingrese una descripcion"
              value={form.description}
              onChange={handleChange}
            />

            <Form.Label>Prioridad de la tarea</Form.Label>
            <Form.Select value={form.priority} name="priority" disabled={form.done} onChange={handleChange} required={true}>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </Form.Select>

            <Form.Label>Responsable de la tarea</Form.Label>
            <Form.Select aria-label="Default select example" name="user" disabled={form.done} required={true} onChange={handleChange} value={form.user.idUsuarios}>
              <option>Open this select menu</option>
              {users.map(user => (
                <option key={user.idUsuarios} value={user.idUsuarios}>{user.usuario}</option>
              ))}
            </Form.Select>

            <Form.Label>Fecha de la tarea</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              disabled={form.done}
              required={true}
              placeholder="Ingrese una fecha y hora"
              value={form.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className={form.done ? 'invisible' : ''} type='submit' variant="primary" onClick={handleSubmit}>
            {buttonText}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskModal;
