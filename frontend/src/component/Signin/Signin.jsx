import React, { useState } from 'react'
import imageOne from '../../assets/istockphoto-1426090631-612x612-removebg-preview.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Signin() {
    let navigate=useNavigate()
    let [message,setMessage]=useState("")
    function sendSignInrData(values){
        axios.post("http://localhost:3003/signin",values).then((res)=>{
            console.log(res)
            localStorage.setItem("token",res.data.token)
            if(res.data.message=="Success"){
                navigate("../Home")
            }
        }).catch((err)=>{
            console.log(err)
            setMessage(err.response.data.message)

        })
    }

        let validationSchema=yup.object({
            email:yup.string().email("Invalid E-mail").required("This Field is Required"),
            password:yup.string().min(6).max(20).required("Your Password is Requird")
        })

        let FormikTwo= useFormik({
        initialValues:{
            email:"",
            password:""
        },

        validationSchema,
        onSubmit:(values)=>{
            console.log(values)
            sendSignInrData(values)
        }
    })
  return (
    <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Sign in Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        <div className="container mt-3  bg-transparent shadow">
            <div className="row  d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <div>
                    <img src={imageOne} className='w-100' alt="" />
                    </div>
                </div>
                <div className="col-md-6 formy ">
                    <h1 className='text-center fw-bold'>Sign in</h1>
                    <div>
                        <form onSubmit={FormikTwo.handleSubmit}>
                            <label htmlFor="email" className='fw-bold'></label>
                            <input id='email' name='email' onChange={FormikTwo.handleChange} type="text" className='form-control' placeholder='E-mail' />
                            <label htmlFor="password"></label>
                            <input id='password' name='password' onChange={FormikTwo.handleChange}  type="password" className='form-control' placeholder='password' />
                            <button disabled={!(FormikTwo.dirty && FormikTwo.isValid)} type='submit' className='btn btn-danger w-100 mt-3'>Sign In</button>
                            {message?<p className='text-danger text-center fw-bold mt-3'>{message}</p>:""}
                            <NavLink style={{fontSize:20 ,paddingTop:"10px"}} className="fw-bold   text-dark pt-4 text-decoration-none" aria-current="page" to="../Signup"> <i className="fa-solid fa-right-to-bracket"></i> Sign Up</NavLink>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
