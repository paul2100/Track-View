import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import CalendarTrade from '../components/CalendarTrade'
import axios from 'axios';

function Performance() {

  const [groupeTrades , setGroupeTrades] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/stats/getTradeClosedByDay' , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setGroupeTrades(res.data.grouped);
            console.log(res.data.grouped)
        }
    })
    .catch(err => console.error("Erreur axios grouped trades :", err));
  }, []);



  return (
    <div className="flex relative">
      <Sidebar />
      <main className="md:ml-[260px] p-6 flex-1 bg-black min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-2xl text-white font-semibold">Performance</h1>
            <span className="text-gray-400 text-base">
              Browse all your performance on this page
            </span>
          </div>
        </div>

        <div className='w-full h-200'>
            <CalendarTrade groupeTrades={groupeTrades}/>
        </div>

      </main>
    </div>
  )
}

export default Performance
