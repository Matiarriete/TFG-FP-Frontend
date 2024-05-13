import Dashboard from './Componentes/Dasboard';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  
  const { user } = useAuth0()

  return (
    <div>
      <Dashboard user={user}/>
    </div>

  );
}

export default App;
