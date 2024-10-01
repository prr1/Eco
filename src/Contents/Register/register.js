import React from 'react';
import './register.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {

  //useState
  let [err,setErr]=useState('');

  // useForm 
  let {register,handleSubmit,formState:{errors}}=useForm();

  //useNavigate
  const navigate=useNavigate();

  //submit form
  let submitForm=(user)=>{
    console.log(user);
    //post data to DB
    axios.post('http://localhost:4000/users-api/register',user)
    .then(res=>{
      //console.log(res);
      if(res.status===201){
        //navigate to login component
        navigate('/login');
        setErr('');
      }
      else{
        setErr(res.data.message);
      }
    })
    .catch(error=>{
      if(error.response){
        setErr(error.message);
      }
      else if(err.request){
        setErr(error.message);
      }
      else{
        setErr(error.message);
      }
    })
  }
  
  return (
    <div className='container-fluid mx-3 mx-auto'>
      <p className='display-5 text-center'>Add New User</p>
      {err.length!==0 && <p className='display-4 text-danger text-center'>{err}</p>}
      <div className='row'>
        <div className='mx-auto col col-11 col-sm-8 col-md-6'>
      <form onSubmit={handleSubmit(submitForm)} className='mx-auto'>
        <div>
        <label>Username</ label>
        <input type='text' id='username' className='form-control mb-2' {...register('username',{required:true,minLength:'6',maxLength:'15'})} />
        {errors.username?.type==="required" && <p className='text-danger'>* Username is mandatory</p>}
        {errors.username?.type==="minLength" && <p className='text-danger'>* Min Length is 6</p>}
        {errors.username?.type==="maxLength" && <p className='text-danger'>* Max Length is 15</p>}
        </div>
        <div>
        <label >Password</label>
        <input type='password'  className='form-control mb-2' {...register('password',{required:true})}/>
        {errors.password?.type==="required" && <p className='text-danger'>* Password is mandatory</p>}
        </div>
        <div>
        <label>Email</label>
        <input type='email'  className='form-control mb-2' {...register('email',{required:true})}/>
        {errors.email?.type==="required" && <p className='text-danger'>* Email is mandatory</p>}
        </div>
        <div>
        <label>Date of birth</label>
        <input type='date'  className='form-control mb-2' {...register('date',{required:true})}/>
        {errors.date?.type==="required" && <p className='text-danger'>* Date is mandatory</p>}
        </div>
        <div>
        <label>User Image</label>
        <input type='url'  className='form-control mb-2' {...register('image',{required:true})}/>
        {errors.image?.type==="required" && <p className='text-danger'>* Image is mandatory</p>}
        </div>
        <button type='submit' id='btn' className='btn btn-success float-end fs-5 h-50 mb-3'>Register</button>
      </form>    
      </div>
      </div>
     </div>
  )
}

export default Register;