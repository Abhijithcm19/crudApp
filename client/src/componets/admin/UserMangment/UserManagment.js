
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from '../../../axios/axios.js'
import Edituser from '../editUser/Edituser';
import '../NavBar/NavBar.css'
 


function UserManagment() {

  const [users, setUsers] = useState([]);
  const [search,setSearch]=useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [BlockUsered,setBlockUser]=useState(false)



 
const [showEditUser,setEditUser]=useState({
  userId:null,
  name:null,
  email:null,
  showEditUserPage:false
})
 const isAdmin=useSelector((state)=>state.token.token)
const navigate=useNavigate()





useEffect(() => {

if(isAdmin ){
 axios.get('/admin/getUser').then((respose)=>{
  setUsers(respose.data.AllUsers)
 })
}else{
  navigate('/admin')
}

},[showEditUser])





const onChangeHandler =(e)=>{
  console.log('woprking');
const serchdata= e.target.value
setSearch(serchdata)
if (serchdata !== "") { 

const newPacientes = users.filter((value) =>
value.name.includes(search)
  );
  console.log("newPaticent",newPacientes);
  setFilteredUsers(newPacientes)
}
}





const BlockUser=(async(userId)=>{
  console.log('user block');
  await axios.post(`admin/blockuser/${userId}`).then((response)=>{
console.log(response);
  setBlockUser((prev)=>{
return{
  ...prev,
  [userId]:true
}
  })
axios.get('/admin/getUser').then((respose)=>{
    setUsers(respose.data.AllUsers)
        })

  })


})




const unBlockUser=(async(userId)=>{
console.log('uswer cliked');
await axios.post(`admin/unblockuser/${userId}`).then((response)=>{
const unblock=response.data
setBlockUser((prev)=>{
  return{
    ...prev,
    [userId]: false
  }
})
axios.get('/admin/getUser').then((respose)=>{
  setUsers(respose.data.AllUsers)
      })
})
})




const EditUser=(objId)=>{
 setEditUser({
  userId:objId._id,
  name:objId.name,
  email:objId.email,
  showEditUserPage:true
 }) 



}

const handleSetValue = () => {
setEditUser({
showEditUserPage:false
    
  });

};




  return (
    <div>

<NavBar/>





<div className="container "style={{marginTop:100}}>
  <div className="col-4 d-flex m-auto">

<input type="text"
 id="exampleForm2" 
 className="form-control"
  autoFocus 
  onChange={onChangeHandler}
  placeholder='Serach....'/>
  <button className='btn btn-primary'>Search</button>  
  </div>

<button onClick={()=>navigate('/admin/adduser')} className='btn btn-info float-end mt-5'>Add User</button>

{showEditUser.showEditUserPage===false ?
<table className="table "style={{marginTop:110}}>
  <thead className="thead-dark">
    <tr>
      <th scope="col">No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">id</th>
      <th scope="col">Edit</th>
      <th scope="col">Block user</th>
    </tr>
  </thead>
  
       { search === "" &&  users.map((obj,index) => {

return(

 
  <tbody>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{obj.name}</td>
      <td>{obj.email} {obj.isBlocked || BlockUsered[obj._id]? <span className='text-danger fw-bolder ms-2 mt-1'>Blocked</span>:''}</td>
      <td>{obj._id}</td>

      <td><button onClick={()=>EditUser(obj)} className='btn btn-primary'>Edit</button></td>
      {obj.isBlocked===true ||  BlockUsered[obj._id] ?
      
      (
        <td><button onClick={() => unBlockUser(obj._id)} className="btn btn-warning" >unblock</button></td>
        
      ):(
        <td><button onClick={() => BlockUser(obj._id)} className="btn btn-danger" >Block</button></td>
      )
      }
    
    </tr>
 
   
  </tbody>
)

       

    })}
    

  
{ search !== "" &&  filteredUsers.map((obj,index) => {
    return(
  <tbody>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{obj.name}</td>
      <td>{obj.email}{obj.isBlocked || BlockUsered[obj._id]? <span className='text-danger fw-bolder ms-2 mt-1'>Blocked</span>:''} </td>
      <td>{obj._id}</td>


      <td><button onClick={()=>EditUser(obj)} className='btn btn-primary'>Edit</button></td>
      
      {obj.isBlocked===true ||  BlockUsered[obj._id]  ?
      
      (
        <td><button onClick={() => unBlockUser(obj._id)} className="btn btn-warning" >unblock</button></td>
        
      ):(
        <td><button onClick={() => BlockUser(obj._id)} className="btn btn-danger" >Block</button></td>
      )
      }
    </tr>
 
   
  </tbody>
)


    })}
      {filteredUsers.length === 0 && search !== "" && (
          <div className='d-flex w-100'>
            <h1 className='justify-content-center'>No result</h1>
          </div>
        )}

</table>
: <Edituser  UserData={showEditUser} setTrue={handleSetValue}  />} 
</div>


    </div>
   
  )
}

export default UserManagment
