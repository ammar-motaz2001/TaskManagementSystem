import React, { useState } from 'react';
import imageTwo from '../../assets/register-removebg-preview.png';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Register() {
    let [messageError, setErrorMessage] = useState("");
    let navigate = useNavigate();
    function sendRegisterData(values) {
        setErrorMessage("");
        axios.post("http://localhost:3003/signup", values)
            .then((res) => {
                if (res.data.message === "Signed Up Successfully") {
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.response.data.message);
            });
    }
    let validationSchema = yup.object({
        name: yup.string().min(3, "Minimum 3 letters for your name").max(20, "Max is 20 letters").required("Your name is required"),
        email: yup.string().email("Invalid email").required("Your email is required"),
        password: yup.string().min(6, "Minimum 6 characters").max(20, "Max is 20 characters").required("Your password is required")
    });
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            sendRegisterData(values);
        }
    });

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="container mt-5 p-4 bg-transparent shadow">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div>
                            <img src={imageTwo} className='w-100' alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className='text-center'>Register Now :</h1>
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="name" className='fw-bold'></label>
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='name' name='name' type="text" className='form-control' placeholder='Enter Your Name:' />
                                {formik.touched.name && formik.errors.name ? <p className='text-danger text-center fw-bold'>{formik.errors.name}</p> : ""}
                                <label htmlFor="email"></label>
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name='email' type="email" className='form-control' placeholder='Enter Your Email:' />
                                {formik.touched.email && formik.errors.email ? <p className='text-danger text-center fw-bold'>{formik.errors.email}</p> : ""}
                                <label htmlFor="password"></label>
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name='password' type="password" className='form-control' placeholder='Enter Your Password:' />
                                {formik.touched.password && formik.errors.password ? <p className='text-danger text-center fw-bold'>{formik.errors.password}</p> : ""}
                                <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn btn-danger w-100 mt-3'>Register</button>
                                {messageError ? <p style={{ fontSize: 25 }} className='text-center fw-bold text-danger'>{messageError}</p> : ""}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
