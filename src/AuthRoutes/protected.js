import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// dependencies
import appAuth from '../appauth'

export default function ProtectedRoute({
    authenticated,
    component: Component,
    ...rest
}) {
    return (
        <React.Fragment>
            


            <Route {...rest}  render={props => (
                appAuth.isAuthenticated ? <Component  {...props} /> : <Redirect to="/login" />
            )}/>


        </React.Fragment>
    )
}
