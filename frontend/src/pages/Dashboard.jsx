import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import axios from 'axios';



function Dashboard() {

  return (
    <div className="flex">
      <Sidebar />
      <div className="md:ml-60 w-full p-6 bg-gray-50 min-h-screen">
        <div>
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
