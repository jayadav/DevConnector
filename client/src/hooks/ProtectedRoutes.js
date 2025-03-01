import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoutes() {

    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading) {
        return <>Loading....</>;
    }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}

export default ProtectedRoutes
