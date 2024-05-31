import { useEffect } from 'react'
import Dashboard from './Componentes/Dasboard';
import { Spinner } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) return <div className="container-spinner d-flex flex-column align-items-center justify-content-center"><Spinner animation="grow" variant="dark"/></div>;

  return (
    <div>
      <Dashboard user={user} />
    </div>

  );
}

export default App;
