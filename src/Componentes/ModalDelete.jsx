import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete({handleClose, show, modalData, setReloadData}) {

    useEffect(() => {
        if (modalData) {
            setForm(modalData);
        }
    }, [modalData])

    const initailForm = {
        idTask: 0,
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
    
    const deleteTask = async (id) => {
        try {
          const response = await fetch('https://backend-tfg-38792dd679ce.herokuapp.com/task?id=' + id, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Usted esta por eliminar la tarea: {form.name}. Seguro desea hacerlo?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => {deleteTask(form.idTask); handleClose()}}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDelete;