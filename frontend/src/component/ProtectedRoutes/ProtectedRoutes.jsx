import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoutes({children}) { // to protect all routes and donnot go to home page before sign in 
   let token= localStorage.getItem("token")
   try {
    const decoded = jwtDecode(token);
    if(decoded) return children
      } catch (error) {
      localStorage.clear()
      return <Navigate to='/' />
   }
  

}
