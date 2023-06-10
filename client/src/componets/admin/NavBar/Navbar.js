import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { removetoken } from '../../../Redux/token/token';
import './NavBar.css' 




function Adminhome() {


  const navigate = useNavigate();

const dispatch=useDispatch()


  


    const LogoutHandler= () => {


      let data ={
        token:null,
        id:null,
        email:null,
        name:null 
      }
  dispatch(removetoken(data))
  navigate('/admin')
    }

  


  return (
    <div>
           <header>
      <Navbar className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <Nav className="navbar-brand text-white">Admin Panel</Nav>
    </div>
    <ul className="nav navbar-nav navbar-right">
      <Button>
              <li><span onClick={LogoutHandler} className="glyphicon glyphicon-log-in text-white">Logout</span></li>
        </Button>
    </ul>
  </div>
</Navbar>
      </header>
<section>
  <div className="container mt-5  ">
<h1 className='text-center text-decoration-underline mb-5'>User Managment</h1>
  </div>
</section>

    </div>
  )
}

export default Adminhome
