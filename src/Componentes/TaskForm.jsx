import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function TaskModal({ show, handleClose, task, setTask, users }) {

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
  const [errors, setErrors] = useState({})
  const [errorFlag, setErrorFlag] = useState(0)
  const [error, setError] = useState(null)

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
    setErrors({})
    setButtonText("Agregar")
    handleClose();
  }

  const validateForm = () => {
    const { name, description, date, user } = form
    const newErrors = {}

    if (!name || name === '') newErrors.name = 'Ingrese el nombre de la tarea'
    else if (name.length > 45) newErrors.name = 'El nombre de la tarea no debe tener mas de 45 caracteres'
    if (!description || description === '') newErrors.description = 'Ingrese el descripcion de la tarea'
    else if (description.length > 255) newErrors.description = 'La descripcion de la tarea no debe tener mas de 255 caracteres'
    if (!date || date === '') newErrors.date = 'Ingrese el fecha de la tarea'
    if (!user || user.idUsuarios == 0) newErrors.user = 'Seleccione el responsable de la tarea'

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      setErrorFlag(1)
    } else {
      if (buttonText === "Agregar") addTask(form)
      else modifyTask(form.idTask, form)
      closeTab()
    }
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
    if ([e.target.name] == "user" && e.target.value != 0) {
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

    if (!!errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
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
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formTaskDescription'>
            <Form.Label>Descripcion de la tarea</Form.Label>
            <Form.Control
              type="text"
              disabled={form.done}
              required={true}
              name="description"
              placeholder="Ingrese una descripcion"
              value={form.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='formTaskPriority'>
            <Form.Label>Prioridad de la tarea</Form.Label>
            <Form.Select value={form.priority} name="priority" disabled={form.done} onChange={handleChange} required={true}>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId='formTaskUser'>
            <Form.Label>Responsable de la tarea</Form.Label>
            <Form.Select className={!!errors.user && 'red_border'} aria-label="Default select example" name="user" disabled={form.done} required={true} onChange={handleChange} value={form.user.idUsuarios}>
              <option value={0}>Open this select menu</option>
              {users.map(user => (
                <option key={user.idUsuarios} value={user.idUsuarios}>{user.usuario}</option>
              ))}
            </Form.Select>
            <div className='red'>{errors.user}</div>
          </Form.Group>
          <Form.Group controlId='formTaskDate'>
            <Form.Label>Fecha de la tarea</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              disabled={form.done}
              required={true}
              placeholder="Ingrese una fecha y hora"
              value={form.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className={form.done ? 'invisible' : '' + "mt-3"} type='submit' variant="primary" onClick={handleSubmit}>
            {buttonText}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskModal;
