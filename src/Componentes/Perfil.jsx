import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Perfil() {

    const [user, setUser] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <Col id="imgCol">
                        <img src={user.picture}/>
                    </Col>
                    <Col>
                        <h3>Usuario: {user.nickname}</h3>
                        <h3>Correo: {user.email}</h3>
                        <h3>Nombre: {user.name}</h3>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Perfil;