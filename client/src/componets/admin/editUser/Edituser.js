import React,{useEffect, useState} from 'react'
import Navbar from '../NavBar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '../../../axios/axios'



function Edituser({UserData,setTrue}) {
  

const [errors,setErrors] = useState({});
let [NewName,setNewName]=useState('')


const HandleSubmit=(e)=>{
  console.log(e);
e.preventDefault()
axios.post('admin/edituser',{
  name:NewName,
  userId:UserData.userId
}).then((response)=>{
  console.log("user data here",response.data);
  handleSetValue()
}).catch((error)=>{
  console.log(error.response.data);
  setErrors(error.response.data); 

})
}




const handleSetValue=()=>{
  setTrue();
}

  return (
    <div>


        <div className="container"> 
              <form onSubmit={HandleSubmit}>
  <div class="row">
    <div class="col-6">
        <label className='mb-3'>Current Name</label>
      <input type="text"  value={UserData.name} className="form-control"  disabled="true"/>
    </div>
    <div class="col-6">
    <label  className='mb-3'>Enter New Name</label>
      <input type="text"
       className="form-control w-80"
        placeholder="Enter.."
         autoFocus="true"
         name='name'
         required="true"
         value={NewName}
         onChange={(e)=>setNewName(e.target.value)}
      
       />
  {errors && <p style={{color:"red"}}>{errors.email}</p>}
    </div>
  
  </div>
  
  <button  className='btn btn-primary float-end mt-5'>Submit</button>
 </form> 
 <button onClick={handleSetValue} className='btn btn-danger float-end mt-5 me-3'>Cancel</button>
  </div>
  


    </div>
  )
}

export default Edituser
