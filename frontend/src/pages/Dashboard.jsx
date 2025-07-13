import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';


function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Mon token JWT:", token);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 w-full p-6 bg-gray-50 min-h-screen">
        
      </main>
    </div>
  );
}

export default Dashboard;
