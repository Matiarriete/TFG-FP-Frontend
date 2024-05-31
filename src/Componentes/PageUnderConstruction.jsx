import React from "react";
import Lottie from 'react-lottie'
import { Button } from 'react-bootstrap'
import animationData from '../lotties/construction.json';

function PageUnderConstruction() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        controls: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div id="constructionPage" className="d-flex flex-column align-items-center">
            <Lottie
                options={defaultOptions}
                height={500}
                width={500}
            />
            <h1 class="constrText">Pagina en construcción</h1>
            <h3 class="constrText">Disculpe, nos encontramos haciendo mejoras en esta pagina</h3>
            <Button onClick={() => window.location.href = '/'}>Volver a pagina principal</Button>
        </div>
    )
}

export default PageUnderConstruction;