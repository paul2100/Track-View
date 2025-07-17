import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/me', { withCredentials: true })
      .then(res => {
        if (res.status === 200) setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='flex justify-center items-center h-screen'><img src="/src/assets/bouncing-circles.svg" alt="" className='h-30 w-30'/></div>;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
