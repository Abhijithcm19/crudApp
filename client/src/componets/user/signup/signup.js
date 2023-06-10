
import React, { useState } from 'react';
import axios from '../../../axios/axios.js';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function Signup() {
const navigate=useNavigate()
const auth = useSelector((state)=>state)

console.log("this is sata",auth);

const [errors,setErrors] = useState({});
const [formValues,setFormValues]=useState({
  name:"",
  email:"",
  password:"",
  password_confirm:""
})



  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });

  };

  const handleSubmit = async(event)=>{
    event.preventDefault();

   await axios.post('/signup',{
        name:formValues.name,
        email: formValues.email,
        password: formValues.password,
        password_confirm: formValues.password_confirm
        
    }).then((response)=>{
      console.log(response.data);
        navigate('/login')
    }).catch((error)=>{
      console.log(error.response.data);
      setErrors(error.response.data);
      
    })
    
}


  return (
    <div>
      <section className="vh-100">
  <div className="container  h-100">

    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" >

          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Signup</h3>
            <form onSubmit={handleSubmit} >

            <div className="form-outline mb-4">
            <label className="form-label float-start" >Name</label>
              <input type="name" 
              id="typeEmailX-2" 
              className="form-control form-control-lg"
              onChange={onChangeHandle} 
              value={formValues.name}
              name="name"/>
 {errors && <p style={{color:"red"}}>{errors.name}</p>}
            </div>

            <div className="form-outline mb-4">
            <label className="form-label float-start" >Email</label>
              <input type="email" 
              id="typeEmailX-2" 
              className="form-control form-control-lg"
              onChange={onChangeHandle} 
              value={formValues.email}
              name="email"/>
 {errors && <p style={{color:"red"}}>{errors.email}</p>}
            </div>

            <div className="form-outline mb-4">
            <label className="form-label float-start" >Password</label>
              <input type="password"
               id="typePasswordX-2"
                className="form-control form-control-lg"
                value={formValues.password}
                onChange={onChangeHandle} 
                 name="password"/>
    {errors && <p style={{color:"red"}}>{errors.password}</p>}
            </div>
            
            <div className="form-outline mb-4">
            <label className="form-label float-start" >conform password</label>
              <input type="password" 
              id="typePasswordX-2" 
              className="form-control form-control-lg"
              value={formValues.password_confirm}
              onChange={onChangeHandle} 
              name="password_confirm"/>
        {errors && <p style={{color:"red"}}>{errors.password_confirm}</p>}
            </div>

        

            <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">Create account</button>

            </form>
      

          </div>
        </div>
      </div>
    </div>
  </div>

</section>
    </div>
  )
}

export default Signup
