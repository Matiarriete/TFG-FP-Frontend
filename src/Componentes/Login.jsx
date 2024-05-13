import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'react-bootstrap'

function Login() {
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    if (isAuthenticated) {
        window.location.href = '/Dashboard';
        return null;
      }

    return (
        <div>
            <Button onClick={() => loginWithRedirect()} >Log In</Button>
        </div>

    )
}

export default Login;