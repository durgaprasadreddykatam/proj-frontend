import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const apiaddress=process.env.REACT_APP_API_USER_ADDRESS;

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  function SubmitformData(e) {
    e.preventDefault();
    console.log('Login form submitted');
    console.log(formData);
    if(formData.email === '' || formData.password === ''){
      alert('All fields are required');
      return;
  }
  else if(formData.email.indexOf('@'&& '.') === -1){
      alert('Invalid Email');
      return;
  }
  else if(formData.password.length < 8){
      alert('Password should be minimum 8 characters');
      return;
  }
  else{
    axios.post(`${apiaddress}/login`, {
      "email": formData.email,
      "password": formData.password
    })
    .then(response => {
      if(response.status === 200){
        console.log('User logged in successfully', response);
        localStorage.setItem('token', response.data.token);
      }
    })
    .catch(error => {
      console.error('Error logging in user', error);
    });
  }
  }
  return (
    <div className='lg:bg-neutral-200 lg:h-screen'>
    
          <div className='h-full w-full  py-5 lg:py-10 flex items-center justify-center   '>
            <div className='lg:w-1/3 lg:border-2 lg:p-5 lg:rounded-2xl lg:bg-white'>
            <div className='md:px-40 flex justify-center w-full h-20 lg:h-12 text-4xl lg:text-3xl font-bold items-center'>Login</div>
            <div className='mt-10 px-10 md:px-40 lg:px-10 lg:h-12'>
              <input 
                name='email'
                onChange={handleFormChange}
              type='email'
              placeholder='Email' 
              className='h-20 lg:h-12 w-full rounded-2xl lg:rounded-xl pl-5 text-3xl lg:text-xl border-1'/>
            </div>
            <div className='mt-10 px-10 md:px-40 lg:px-10 lg:h-12'>
              <input 
                name='password'
                onChange={handleFormChange}
                type='password'
              placeholder='Password' 
              className='h-20 lg:h-12 w-full rounded-2xl lg:rounded-xl pl-5 text-3xl lg:text-xl border-1'/>
            </div>
            <div className='mt-10 px-10 md:px-40 lg:px-10'>
              <button 
              onClick={SubmitformData} 
              className='flex-shrink-0 px-10 mt-10 text-white font-bold text-2xl lg:text-xl rounded-2xl lg:rounded-xl bg-green-600 h-20 lg:h-12 w-full flex items-center justify-center'>Login</button>
            </div>
            <Link to='/register' className='mt-10 flex items-center justify-center cursor-pointer text-xl lg:text-lg text-green-700'>Not an User ?  Register</Link>
            </div>
            
            </div>
          
        </div>
    
  )
}

export default Login
