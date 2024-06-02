import { Col, Container, Row, Image, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Perfil({show, handleClose}) {

    const [user, setUser] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        setUser({
            nickname : localStorage.getItem("nickname"),
            picture : localStorage.getItem("picture"),
            email : localStorage.getItem("email")
        })
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <h2 className="m-3">Información de Perfil</h2>
            <Container>
                <Row>
                    <Col id="imgCol">
                        <Image src={user.picture} roundedCircle className="m-4"/>
                    </Col>
                    <Col className="m-3">
                        <h5>Usuario</h5>
                        <p>{user.nickname}</p>
                        <h5>Correo</h5>
                        <p>{user.email}</p>
                    </Col>
                </Row>
            </Container>
        </Modal>
    )
}

export default Perfil;