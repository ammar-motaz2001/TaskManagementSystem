import React from 'react'
import { Helmet } from 'react-helmet'

export default function Notfound() {
  return ( 
        
    <div className='d-flex justify-content-center align-items-center vh-100'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Not Found  Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div>
      <h1 className='fw-bold'>Not Found Page <i class="fa-solid fa-face-sad-tear"></i> !! </h1>
      </div>
    </div>
  )
}
