import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete({handleClose, show, modalDeleteData, setReloadData}) {

    useEffect(() => {
        if (modalDeleteData) {
            setForm(modalDeleteData);
        }
    }, [modalDeleteData])

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
          const response = await fetch('http://localhost:8080/task?id=' + id, {
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