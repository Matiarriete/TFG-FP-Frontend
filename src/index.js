import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Componentes/Login';
import Perfil from './Componentes/Perfil';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react"
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/App.css'
import PageUnderConstruction from './Componentes/PageUnderConstruction';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },{
    path: "/Dashboard",
    element: <App/>
  },{
    path: "/Perfil/:email",
    element: <PageUnderConstruction/>
  }
]);

root.render(
  <React.StrictMode>
    <Auth0Provider domain='dev-b2k6kow8hxdc7sns.us.auth0.com' clientId='4J1462bUIZKuvvyOcyCCrYCYyEPzV1eF' authorizationParams={{
      redirect_uri: window.location.origin
    }}>
      <RouterProvider router={router} />
    </Auth0Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
