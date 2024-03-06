import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
    
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && typeof token === 'string') {
      try {
        const decoded = jwtDecode(token);
        setFormData({
          firstName: decoded.firstname,
          lastName: decoded.lastname,
          email: decoded.email
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      
      }
    }
    else{
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      {localStorage.getItem('token') !== null && 
      <div>
        <Navbar />
        <div className='h-full w-full p-5 '>
          <div>
            <span className='text-3xl font-bold'>Hello {formData.firstName} {formData.lastName}</span>
          </div>
        </div>
      </div>
      
      }
    </div>
     
  );
};

export default Home;
