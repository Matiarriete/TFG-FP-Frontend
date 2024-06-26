import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Image } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ModalDelete from './ModalDelete';
import Perfil from './Perfil';
import 'bootstrap/dist/css/bootstrap.css';

function Dashboard({user}) {
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalProfile, setShowModalProfile] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [error, setError] = useState(null)
    const [users, setUsers] = useState([])
    const [reloadData, setReloadData] = useState()
    const { isAuthenticated, logout } = useAuth0()

    const handleShowModalAdd = () => setShowModalAdd(true);
    const handleShowModalDelete = () => setShowModalDelete(true);
    const handleShowModalProfile = () => setShowModalProfile(true);

    const handleCloseModal = () => {
        setShowModalAdd(false)
        setShowModalDelete(false)
        setShowModalProfile(false)
        setReloadData(false)
    }

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
        }
    };

    useEffect(() => {
        localStorage.setItem('nickname', user.nickname)
        localStorage.setItem('picture', user.picture)
        localStorage.setItem('email', user.email)
        console.log(user)
        fetchUsers()
    }, [])

    return (
        isAuthenticated && (
            <div className="App m-4">
                <div className='d-flex justify-content-between'>
                    <h1>Administrador de Tareas</h1>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <Image src={user.picture} id="profileImage" roundedCircle />
                            {"  " + user.nickname + "  "}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleShowModalProfile()}>Ver perfil</Dropdown.Item>
                            <Dropdown.Item onClick={() => logout()}>Cerrar Sesion</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Button variant="primary" onClick={handleShowModalAdd}>
                    Agregar Tarea
                </Button>
                <TaskForm
                    handleClose={handleCloseModal}
                    setTask={setModalData}
                    task={modalData}
                    show={showModalAdd}
                    users={users}
                />
                <TaskList
                    setModalData={setModalData}
                    setReloadData={setReloadData}
                    handleShowModalAdd={handleShowModalAdd}
                    handleShowModalDelete={handleShowModalDelete}
                    reloadData={reloadData}
                    user={user}
                    users={users}
                />
                <ModalDelete
                    handleClose={handleCloseModal}
                    show={showModalDelete}
                    modalData={modalData}
                    users={users} />

                <Perfil
                    handleClose={handleCloseModal}
                    show={showModalProfile} />
            </div>
        )
    );
}

export default Dashboard;