import React from 'react'
import Login from '../admin/login/login'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import Landingpage from '../admin/UserMangment/UserManagment'
import Edituser from '../admin/editUser/Edituser'
import AddUsre from '../admin/addUser/AddUsre'
function AdminComponents() {
  return (
    
   
    <BrowserRouter>
<Routes>
<Route exact  path="/admin"  element={<Login/>}></Route>
<Route   path="/admin/home"  element={<Landingpage/>}></Route>
<Route path='/admin/edituser' element={<Edituser />}></Route>
<Route path='/admin/adduser' element={<AddUsre />}></Route>
    </Routes>
    </BrowserRouter>

  )
}

export default AdminComponents
