import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import CalendarTrade from '../components/CalendarTrade'
import DonutChartTrades from '../components/DonutChartTrades';
import BarChartTradesPerformance from '../components/BarChartTradesPerformance';
import axios from 'axios';

function Performance() {

  const [groupeTrades , setGroupeTrades] = useState({});
  const [period , setPeriod] = useState('month');
  const [countPaireByPaire , setCountPaireByPaire] = useState({});
  const [countPaireByResult , setCountPaireByResult] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/stats/getTradeClosedByDay' , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setGroupeTrades(res.data.grouped);
        }
    })
    .catch(err => console.error("Erreur axios grouped trades :", err));
  }, []);

  // Count by paire
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/getTradeByPaire?period=${period}` , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setCountPaireByPaire(res.data.counts);
        }
    })
    .catch(err => console.error("Erreur axios grouped trades :", err));
  }, [period]);  

  // Count by Perf
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/getTradeByPaireResult?period=${period}` , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setCountPaireByResult(res.data.counts);
        }
    })
    .catch(err => console.error("Erreur axios grouped trades :", err));
  }, [period]);


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

          <div className="md:mr-5 md:mt-0">
              <button onClick={() => setPeriod('week')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105  duration-300 ${period === 'week' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Week</button>
              <button onClick={() => setPeriod('month')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105 duration-300 ${period === 'month' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Month</button>
              <button onClick={() => setPeriod('year')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105  duration-300 ${period === 'year' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Year</button>
          </div>

        </div>

        <div className='w-full flex md:flex-row flex-col'>
            <div className='md:w-2/3'>
              <CalendarTrade groupeTrades={groupeTrades}/>
            </div>
            <div className='flex flex-col justify-between md:w-1/3 md:mt-0'>
              <DonutChartTrades countPaireByPaire={countPaireByPaire}/>
              <BarChartTradesPerformance countPaireByResult={countPaireByResult}/>
            </div>


        </div>

      </main>
    </div>
  )
}

export default Performance
