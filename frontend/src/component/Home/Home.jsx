import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import {Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink} from 'react-router-dom'
import { toast } from 'react-toastify';
import * as yup from 'yup'
export default function Home() {
  useEffect(()=>{
    getAllTasks()
  },[])
  const [data, setData] = useState([]);
  const [message,setMessage]=useState("")
  function addTask(values) {
    axios.post("http://localhost:3003/tasks", values, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(({ data }) => {
      setData(data.task)
      localStorage.setItem('tasksData', JSON.stringify(data.task));

      getAllTasks()
      if(data.message=='success'){
        toast.success("Task Added Successfully")
      }
      // Update data state correctly with the new task
    })
    .catch((err) => {
      setMessage(err.response.data.message)
    });
  }
  function getAllTasks(){
    axios.get("http://localhost:3003/tasks",{
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(({data})=>{
      setData(data.AllTasks.reverse())
    }).catch((err)=>{
      console.log(err)
    })
  }
  function deleteTask(id){
    axios.delete(`http://localhost:3003/tasks/${id}`,{
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(({data})=>{
      if(data.message=="deleted successfully"){
        getAllTasks()
        toast.error("Task Deleted Successfully")
      }
      
    }).catch((err)=>{
      console.log(err)
    })
  }
  function updateTask(id,values){
    axios.put(`http://localhost:3003/tasks/${id}`,values,{
      headers:{
        token: localStorage.getItem("token")
      }
    }).then(({data})=>{
      console.log(data)
      if(data.message="updated successfully"){
        getAllTasks()
        toast.success("updated successfully")
      }
    }).catch((err)=>{
      console.log(err)
      setMessage(err.response.data.message)
    })
  }
  let validationSchema=yup.object({
    title:yup.string().required(),
    description:yup.string().required()
  })
  let formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    validationSchema,
    onSubmit: (values) => {
      addTask(values);
      updateTask(values);
    }
  });

  useEffect(() => {
    localStorage.getItem("tasksData")
  },[]);
  

  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <NavLink style={{fontSize:15 ,paddingTop:"10px"}} className="fw-bold  text-dark text-decoration-none btn btn-danger my-4 ms-3 text-white" aria-current="page" to="/">  Log Out <i className="fa-solid fa-right-to-bracket"></i></NavLink>
      <div className="container py-5 shadow mb-3 bg-transparent">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="form-floating mb-3">
              <input onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="title"
                placeholder="ABS"
              />
              {formik.touched.title && formik.errors.title ? <p className='text-danger text-center fw-bold'>{formik.errors.title}</p> : ""}

              <label htmlFor="title">Task Title</label>
            </div>
            <div className="form-floating">
              <input onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="description"
                placeholder="description"
              />
            {formik.touched.description && formik.errors.description ? <p className='text-danger text-center fw-bold'>{formik.errors.description}</p> : ""}

              <label htmlFor="description">Description</label>
            </div>
          </div>
          <button disabled={!(formik.dirty && formik.isValid)} className='btn btn-primary w-100 my-3' type='submit'>Add Task <i className="fa-solid fa-circle-plus"></i></button>
        </form>
        <Table className='table table_striped text-center fst-italic '>
          <thead className=' active table-dark' >
            <tr>
              
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>actions</th>

            </tr>
          </thead>
          <tbody>
            {data.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={()=>deleteTask(task.id)} className='btn btn-danger'>Delete</button>
                  <button onChange={formik.handleChange} type='submit' onClick={()=>updateTask(task.id,formik.values)} className='btn btn-warning ms-4'>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>
    </>
  );
}
