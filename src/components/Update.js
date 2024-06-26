import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Back from './Back';

const Update = () => {
  const navigate = useNavigate();
  const apiaddress=process.env.REACT_APP_API_USER_ADDRESS;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token && typeof token === 'string') {
      try {
        const decoded = jwtDecode(token);
        setFormData({
          firstName: decoded.firstname,
          lastName: decoded.lastname,
          email: decoded.email,
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      
      }
    }
    else{
      navigate('/login');
    }
  }, [navigate]);



  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const SubmitformData = (e) => {
    e.preventDefault();
    
    if(formData.password !==''){
      if(formData.password.length < 8){
        alert('Password should be minimum 8 characters');
        return;
      }
      else if(formData.password !== formData.confirmPassword){
        alert('Password and Confirm Password should be same');
        return;
      }
      else{
        axios.post(`${apiaddress}/update`, {
          "firstName":formData.firstName,
           "lastName":formData.lastName,
           "email":formData.email,
           "password":formData.password
      })
      .then(response => {
        if(response.status === 200){
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
      })
      }
    }
    else{
      axios.post(`${apiaddress}/update1`, {
        "firstName":formData.firstName,
         "lastName":formData.lastName,
         "email":formData.email
    })
    }
    
  }

  return (
    <div>
        {localStorage.getItem('token') !== null && 
        <div>
          <Back />
          <div className='h-full w-full  py-5 '>
          <div className=' flex justify-center w-full h-20 text-4xl font-bold items-center'>Update Details</div>
          <div className='mt-10 px-10'>
            <input
              name='firstName'
              onChange={handleFormChange}
              value={formData.firstName}
              placeholder='First Name'
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1' />
          </div>
          <div className='mt-10 px-10'>
            <input
              name='lastName'
              onChange={handleFormChange}
              value={formData.lastName}
              placeholder='Last Name'
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1' />
          </div>
          <div className='mt-10 px-10'>
            <input
              name='email'
              disabled
              placeholder={formData.email}
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1' />
          </div>
          <div className='mt-10 px-10'>
            <input
              disabled
              name='password'
              onChange={handleFormChange}
              type='password'
              placeholder='Password'
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1' />
          </div>
          <div className='mt-10 px-10'>
            <input
              disabled
              name='confirmPassword'
              onChange={handleFormChange}
              type='password'
              placeholder='Confirm Password'
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1' />
          </div>
          <div className='mt-10 px-10'>
            <button
              onClick={SubmitformData}
              className='px-10 mt-10 text-white font-bold text-2xl rounded-2xl bg-green-600 h-20 w-full flex items-center justify-center'>Save Changes</button>
          </div>
        </div>
        </div>
        }
        {localStorage.getItem('token') ==null && <div className='h-full w-full  py-5 '>
          <div className=' flex justify-center w-full h-20 text-4xl font-bold items-center'>Please Login to Update Details
          </div>
          </div>}
    </div>
  )
}

export default Update;
