import React from 'react'
import Navbar from './component/Navbar.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './component/Home.jsx'
import Mainlayout from './layout/Mainlayout.jsx'
import About from './component/About.jsx'
import Authlayout from './layout/Authlayout.jsx'
import Signin from './component/Signin.jsx'




let router=createBrowserRouter([
  {path:'/',element:<Mainlayout/>,children:[
    {path:"home",element:<Home/>},
    {path:"About",element:<About/>},

    
  ]},
  {path:'/',element:<Authlayout/>,children:[
    {path:'signin',element:<Signin/>}
  ]}
])
export default function App() {
  return (
    
    <>
    <RouterProvider router={router}/>
    </>
  )
}
