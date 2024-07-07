import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Authlayout() {
  return (
    <>
     <h1>Auth LayOut</h1> 
     <Outlet/>
    </>
  )
}
