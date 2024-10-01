import React,{useContext} from 'react';
import { loginContext } from '../../Contexts/loginContext';
import './userprofile.css';
import {NavLink,Outlet} from 'react-router-dom';


function UserProfile() {
  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext);

  const activeLink = {
    color: "red",
    fontSize: "1.4rem",
    fontWeight: "bold",
  };

  const inactiveLink = {
    color: "black",
    fontSize: "1.4rem"
  };
  return (
    <div>
      <p className='display-5 text-center'>Welcome, {currentUser.username} <img src={currentUser.image} width='130px' className='profilepic float-end' /></p>
      <ul className="nav justify-content-around">
      <li className="nav-item">
              <NavLink
                className="nav-link"
                to="products"
                style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink;
                }}
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item">
            <NavLink
                className="nav-link"
                to="cart"
                style={({ isActive }) => {
                  return isActive ? activeLink : inactiveLink;
                }}
              >
                Cart
              </NavLink>
            </li>
      </ul>

      <Outlet />
    </div>
  )
}

export default UserProfile;