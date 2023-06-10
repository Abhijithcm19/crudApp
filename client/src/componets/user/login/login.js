import React from 'react'
import { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom';
import axios from '../../../axios/axios'
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { storetoken } from '../../../Redux/token/token';
import './login.css'


function Login() {

const token=useSelector((state)=> state.token)
const dispatch=useDispatch()

console.log('token',token);
  const navigate = useNavigate();


 


  const [errors,setErrors] = useState({});
  const [loginform,setloginform]= useState({
    email:"",
    password:""
  })

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setloginform({...loginform,[name]:value})
};


const handleSubmit =async(event) => {
  event.preventDefault();

await axios.post('/login',{
    email:loginform.email,
    password:loginform.password
  }).then((response)=>{
  const{email,id,name,token}=response.data
  const userData = { email, id, name, token };
dispatch (storetoken(userData))
  navigate('/');

  }).catch((error)=>{
    console.log(error.response.data);
    setErrors(error.response.data);
    
  })

 
}

  return (
<section className="vh-100">
  <form onSubmit={handleSubmit}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" >
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">login</h3>

            <div className="form-outline mb-4">
            <label className="form-label float-start">Email</label>
              <input type="email"
               id="typeEmailX-2" 
               className="form-control form-control-lg" 
                 onChange={onChangeHandle}
                 value={loginform.email} 
                  name="email"/>
                   {errors && <p style={{color:"red"}}>{errors.email}</p>}
            </div>

            <div className="form-outline mb-4">
            <label className="form-label float-start">Password</label>
              <input
               type="password" 
               id="typePasswordX-2"
              className="form-control form-control-lg"
              onChange={onChangeHandle}
              value={loginform.password}
                name="password" />
           {errors && <p style={{color:"red"}}>{errors.password}</p>}
            </div>

        
          

            <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">Login</button>

    <p >Don't have an account?<Link className='ms-1' to='/signup'>Click Here</Link> </p>
      

          </div>
        </div>
      </div>
    </div>
  </div>
  </form>
</section>
  )
}

export default Login
