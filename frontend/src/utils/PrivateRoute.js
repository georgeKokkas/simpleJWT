import React from 'react'
import { Navigate } from 'react-router-dom'




const PrivateRoute = ({ Component }) => {
    console.log('Private route works ok!')
    const isAuthenticated = false
    
    return isAuthenticated ? (
        <Component />
  ) : (
    <Navigate to='/login' />
  )
}

export default PrivateRoute

