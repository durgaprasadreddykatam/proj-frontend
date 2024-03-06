import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';

const Home = () => {
    let token;
  useEffect(() => {
    
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (token === null) {
        return redirect("/login");
      }
  }, []);

  return (
    <div>
        {token !=null & <div className='h-full w-full p-5 '>
      <div>
        <span className='text-3xl font-bold'>Hello User</span>
      </div>
    </div>}
    </div>
     
  );
};

export default Home;
