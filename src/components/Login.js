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
    <div>

      <div className='h-full w-full py-20  '>
        <div className=' flex justify-center w-full h-20 text-4xl font-bold items-center'>Login</div>
        <div className='mt-10 px-10'>
          <input 
          name='email'
          onChange={handleFormChange}
          value={formData.email}
          placeholder='Email' 
          className='h-20 w-full rounded-2xl pl-5 text-3xl border-1'/>
        </div>
        <div className='mt-10 px-10'>
          <input 
          onChange={handleFormChange}
          name='password'
          type='password'
          value={formData.password}
          placeholder='Password' 
          className='h-20 w-full rounded-2xl pl-5 text-3xl border-1'/>
        </div>
        <div className='mt-10 px-10'>
          <button 
          onClick={SubmitformData}
          className='px-10 mt-10 text-white font-bold text-2xl rounded-2xl bg-green-600 h-20 w-full flex items-center justify-center'>Login</button>
        </div>
        <Link to='/register' className='mt-10 flex items-center justify-center cursor-pointer text-xl text-green-700'>Not an User ?  Register</Link>
        </div>
      
    </div>
  )
}

export default Login
