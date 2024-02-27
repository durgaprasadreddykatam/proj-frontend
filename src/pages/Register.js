import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const Register = () => {
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    function handleFormChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      }



    const SubmitformData = (e) => {
        e.preventDefault();
        if(formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === ''){
            alert('All fields are required');
            return;
        }
        
        else if(formData.password !== formData.confirmPassword){
            alert('Password and Confirm Password should be same');
            return;
        }
        else if(formData.password.length < 8){
            alert('Password should be minimum 8 characters');
            return;
        }
        else if(formData.email.indexOf('@'&& '.') === -1){
            alert('Invalid Email');
            return;
        }
        else{
            axios.post('http://localhost:8080/api/users/register', {
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "email": formData.email,
            "password": formData.password
})
.then(response => {
    if(response.status === 200){
   console.log('User registered successfully', response);
   localStorage.setItem('token', response.data.token);
    }
})
.catch(error => {
    console.error('Error registering user', error);
});
        }
      }
    return (
        <div>
    
          <div className='h-full w-full  py-5 '>
            <div className=' flex justify-center w-full h-20 text-4xl font-bold items-center'>Register</div>
            <div className='mt-10 px-10'>
              <input 
                name='firstName'
                onChange={handleFormChange}
              value={formData.firstName}
              placeholder='First Name' 
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1'/>
            </div>
            <div className='mt-10 px-10'>
              <input
              name='lastName'
                onChange={handleFormChange}
               placeholder='Last Name' 
               className='h-20 w-full rounded-2xl pl-5 text-3xl border-1'/>
            </div>
            <div className='mt-10 px-10'>
              <input 
                name='email'
                onChange={handleFormChange}
              type='email'
              placeholder='Email' 
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1'/>
            </div>
            <div className='mt-10 px-10'>
              <input 
                name='password'
                onChange={handleFormChange}
                type='password'
              placeholder='Password' 
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1'/>
            </div>
            <div className='mt-10 px-10'>
              <input 
                name='confirmPassword'
                onChange={handleFormChange}
                type='password'
              placeholder='Confirm Password' 
              className='h-20 w-full rounded-2xl pl-5 text-3xl border-1'/>
            </div>
            <div className='mt-10 px-10'>
              <button 
              onClick={SubmitformData} 
              className='px-10 mt-10 text-white font-bold text-2xl rounded-2xl bg-green-600 h-20 w-full flex items-center justify-center'>Register</button>
            </div>
            <div className='mt-10 flex items-center justify-center cursor-pointer text-xl text-green-700'>Already Registered ?  Login</div>
            </div>
          
        </div>
      )
}

export default Register
