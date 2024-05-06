import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap'
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import ModalDelete from './ModalDelete';

function App() {
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [modalUpdateData, setModalUpdateData] = useState(null)
  const [modalDeleteData, setModalDeleteData] = useState(null)
  const [reloadData, setReloadData] = useState()
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const handleShowModalAdd = () => setShowModalAdd(true);
  const handleShowModalDelete = () => setShowModalDelete(true);

  const handleCloseModal = () => {
    setShowModalAdd(false)
    setShowModalDelete(false)
    setReloadData(false) 
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://backend-tfg-38792dd679ce.herokuapp.com/usuarios');
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
  }, [])

  

  return (
    <div className="App m-4">
      <h1>Administrador de Tareas</h1>
      <Button variant="primary" onClick={handleShowModalAdd}>
        Agregar Tarea
      </Button>
      <TaskForm
        handleClose={handleCloseModal}
        setTask={setModalUpdateData}
        task={modalUpdateData}
        show={showModalAdd}
        users={users}
      />
      <TaskList 
        setModalUpdateData={setModalUpdateData} 
        setModalDeleteData={setModalDeleteData}
        setReloadData={setReloadData}
        handleShowModalAdd={handleShowModalAdd} 
        handleShowModalDelete={handleShowModalDelete} 
        reloadData={reloadData}
        users={users}
      />
      <ModalDelete
        handleClose={handleCloseModal}
        show={showModalDelete}
        modalDeleteData={modalDeleteData} />
    </div>
  );
}

export default App;
