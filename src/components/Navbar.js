import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    function logout(){
        localStorage.removeItem('token');
        window.location.reload();
    }
  return (
    <div className='h-20 w-full bg-blue-600 flex items-center justify-end px-10'>
        <Link to={'/update'} className='h-12 w-32 flex items-center justify-center mr-5 bg-red-400 rounded-lg text-white font-bold text-xl'>
            Update 
        </Link>
        <button 
        onClick={logout}
        className='h-12 w-32 bg-red-400 rounded-lg text-white font-bold text-xl'>
            Logout
        </button>
      
    </div>
  )
}

export default Navbar
