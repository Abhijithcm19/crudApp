import React ,{useState}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router';
import axios from '../../../axios/axios'


function AddUsre() {


    const navigate = useNavigate()
    const [errors,setErrors] = useState({});

const [addNewUserForm,setAddNewUserForm]=useState({
    name:"",
    email:"",
    password:"",
    password_confirm:""
})


const onChangeHandler =(e)=>{
    const {name,value}=e.target
    setAddNewUserForm({...addNewUserForm,[name]:value})
}

console.log(addNewUserForm);

  const handleSubmit = async(event)=>{
    event.preventDefault();

   await axios.post('/signup',{
        name:addNewUserForm.name,
        email: addNewUserForm.email,
        password: addNewUserForm.password,
        password_confirm: addNewUserForm.password_confirm
        
    }).then((response)=>{
      console.log(response.data);
        navigate('/admin/home')
    }).catch((error)=>{
      console.log(error.response.data);
      setErrors(error.response.data);
      
    })

}


  return ( 
    <div >

      <form onSubmit={handleSubmit}>
        <h2 className='text-center mt-4 text-decoration-underline ' >Add User</h2>
        <div className="container mt-5"> 
        <div className="form-group mb-3 ">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" className="form-control"
        placeholder="Enter Name"
         autoFocus="true" 
         name='name'
         onChange={onChangeHandler}
         value={addNewUserForm.name}/>
 {errors && <p style={{color:"red"}}>{errors.name}</p>}
  </div>
  <div className="form-group mb-3 ">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control"
        placeholder="Enter email"
         autoFocus="true" 
         name='email'
         onChange={onChangeHandler}
         value={addNewUserForm.email}/>
 {errors && <p style={{color:"red"}}>{errors.email}</p>}
  </div>
  <div className="form-group mb-3">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" 
     placeholder="Password"
     name='password' 
     onChange={onChangeHandler}
         value={addNewUserForm.password}/>
          {errors && <p style={{color:"red"}}>{errors.password}</p>}
  </div>

  <div className="form-group mb-3">

    <label for="exampleInputPassword1">Cofirm Password</label>
    <input type="password" 
    className="form-control" 
    id="exampleInputPassword1" 
    name='password_confirm'
    placeholder="Password"
    value={addNewUserForm.password_confirm} 
    onChange={onChangeHandler}
    />
 {errors && <p style={{color:"red"}}>{errors.password_confirm}</p>}
  </div>
  <button type="submit" className="btn btn-primary float-end ">Submit</button>


  </div>
</form>
  <button onClick={()=>navigate('/admin/home')} type="submit" className="btn btn-danger float-end me-3">Cancel</button>
    </div>
  )
}

export default AddUsre
