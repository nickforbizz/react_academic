import React from 'react'
// dependencies
import AppAuth from '../../appauth'
import { Redirect } from 'react-router-dom'

export default function logout() {

    
    const processLogout = () => {
        AppAuth.deAuthenticate()
    }
    
    processLogout()
    return (
        <div>
            <Redirect to="login" />
        </div>
    )
}
