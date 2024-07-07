import React from 'react'
import Navbar from '../component/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function Mainlayout() {
  return (
    <>
     <Navbar/>
     <Outlet/> 
    </>
  )
}
