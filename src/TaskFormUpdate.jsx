import React, {useEffect, useState} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function TaskModal({ show, handleClose, task }) {
  const [updatedTask, setUpdatedTask] = useState(task)
  const [name, setName] = useState('')
  const [description, setDescription] = useState()
  const [priority, setPriority] = useState(0)
  const [userSelected, setUserSelected] = useState()
  const [users, setUsers] = useState([])
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const putData = {
    user: userSelected,
    description,
    name,
    priority,
    date
  }

  useEffect(() => {
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
  }, []);

  const updateTask = async (putData, id) => {

    try {
      const response = await fetch('http://localhost:8080/task?id=' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });
      if (!response.ok) {
        throw new Error('Error al agregar la tarea');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeTab = (e) => {
    setUserSelected()
    setDescription('')
    setPriority(0)
    setName('')
    setDate('')
    handleClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    updateTask(putData)
    setUserSelected()
    setDescription('')
    setPriority(0)
    setName('');
    setDate('')
    handleClose()
  };

  const handleChange = (e) => {
    const userId = e.target.value
    const selectedUser = users.find(user => user.idUsuarios == userId);
    setUserSelected(selectedUser)
  }

  return (
    <Modal show={show} onHide={closeTab}>
      <Modal.Header closeButton>
        <Modal.Title>Modificar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        {console.log(updatedTask)}
          <Form.Group controlId="formTaskName">
            <Form.Label>Nombre de la Tarea</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese una tarea"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Form.Label>Nombre de la Prioridad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese una prioridad"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />

            <Form.Label>Nombre de la descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese una descripcion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Form.Label>Usuario</Form.Label>
            <Form.Select aria-label="Default select example" onChange={handleChange} >
              <option>Open this select menu</option>
              {users.map(user => (
                <option key={user.idUsuarios} value={user.idUsuarios}>{user.usuario}</option>
              ))}
            </Form.Select>

            <Form.Label>Fecha de tarea</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="Ingrese una fecha y hora"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Agregar Tarea
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TaskModal;
