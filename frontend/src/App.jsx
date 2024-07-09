import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Home from './component/Home/Home.jsx'
import Signin from './component/Signin/Signin.jsx'
import Signup from './component/Signup/Signup.jsx'
import Notfound from './component/Notfound/Notfound.jsx'
import { Offline, Online } from "react-detect-offline";
import { ToastContainer, toast } from 'react-toastify';
import imgOffline from '../src/assets/png-transparent-dino-t-rex-runner-tyrannosaurus-dino-chrome-dinosaur-game-angle-white-removebg-preview.png'
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes.jsx'


let router=createHashRouter([ // Routing
  {path:'/',children:[
    {path:'/home',element:<ProtectedRoutes> <Home/></ProtectedRoutes>},
    {path:'*',element:<Notfound/>}
  ]},
  {path:'/',children:[
    {index:true,element:<Signin/>}, //index:true to make a main page a sign in
    {path:'/signup',element:<Signup/>}
  ]}
])
export default function App() {
  return (
    // to detect when be offline
    <>
      <Online><RouterProvider router={router}/></Online>
      <ToastContainer theme='colored' autoClose={2000}/>
      <Offline>
        <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>
        <img src={imgOffline} alt="imgOffline" />
        <h2 className='text-dark' >You Are Offline Now <i class="fa-solid fa-face-sad-tear"></i> </h2>
        </div>
      </Offline>
 
    </>
  )
}
