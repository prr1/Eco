import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './navigationbar.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/src/collapse.js";
import { loginContext } from '../../Contexts/loginContext';

function NavigationBar() {

  let [currentUser,error,userLoginStatus,loginUser,logoutUser] = useContext(loginContext);

  // if link is active
  let activeLink={
    color:'#2b12a4',
    fontSize:'1.5 rem',
    fontWeight:'bold',
    fontFamily:'georgia'
  }
  
  //if link is inactive
  let inactiveLink={
    fontSize:'1 rem',
    color:'white'
  }
  
  return(
  <nav className="navbar navbar-expand-lg navbar-light bg-secondary" id='navi'>
    <img src='https://cdn.vectorstock.com/i/1000x1000/21/50/logo-shop-vector-12032150.webp' width='65px'/>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="navbar-collapse collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <NavLink className='nav-link' to='/' style={({isActive})=>{
          return isActive? activeLink : inactiveLink;
        }}>Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className='nav-link' to='/register' style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }}>Register</NavLink>
      </li>
      {userLoginStatus?<li className="nav-item">
      <NavLink className='nav-link' to='/login' style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }} onClick={logoutUser}>Logout</NavLink>
      </li>:
      <li className="nav-item">
      <NavLink className='nav-link' to='/login' style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }}>Login</NavLink>
      </li>}
      <li className="nav-item">
      <NavLink className='nav-link' to='/aboutus' style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }}>About Us</NavLink>
      </li>
    </ul>
  </div>
</nav>
)
}

export default NavigationBar;