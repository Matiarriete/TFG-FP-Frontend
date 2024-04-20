import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap'
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [modalUpdateData, setModalUpdateData] = useState(null)
  const [error, setError] = useState(null)

  const handleShowModalAdd = () => setShowModalAdd(true);

  const handleCloseModal = () => {
    setShowModalAdd(false)
  };

  return (
    <div className="App">
      <h1>Administrador de Tareas</h1>
      <Button variant="primary" onClick={handleShowModalAdd}>
        Agregar Tarea
      </Button>
      <TaskForm
        show={showModalAdd}
        handleClose={handleCloseModal}
        task={modalUpdateData}
        setTask={setModalUpdateData}
      />
      <TaskList setModalUpdateData={setModalUpdateData} handleShowModalAdd={handleShowModalAdd}/>
    </div>
  );
}

export default App;
