import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import CalendarTrade from '../components/CalendarTrade'
import DonutChartTrades from '../components/DonutChartTrades';
import BarChartTradesPerformance from '../components/BarChartTradesPerformance';
import axios from 'axios';
import DonutLongShort from '../components/DonutLongShort';
import BarChartHorizontalAverageTime from '../components/BarChartHorizontalAverageTime';
import LineChartDrawdown from '../components/LineChartDrawdown';


function Performance() {

  const [groupeTrades , setGroupeTrades] = useState({});
  const [period , setPeriod] = useState('week');
  const [countPaireByPaire , setCountPaireByPaire] = useState({});
  const [countPaireByResult , setCountPaireByResult] = useState({});
  const [TotalLongShortTrade , setTotalLongShortTrade] = useState({});
  const [AverageTimeLossAndWinTrade , setAverageTimeLossAndWinTrade] = useState({});
  const [DrawdownInPourcent , setDrawdownInPourcent] = useState({});
  const [FiveBestTrade , setFiveBestTrade] = useState([]);
  const [FiveWorstTrade , setFiveWorstTrade] = useState([]);



  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const isoDate = `${year}-${month}-${day}T${timePart || "00:00"}`;
    const date = new Date(isoDate);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };



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
    .catch(err => console.error("Erreur axios getTradeByPaire :", err));
  }, [period]);  

  // Count by Perf
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/getTradeByPaireResult?period=${period}` , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setCountPaireByResult(res.data.countsTradeByResult);
        }
    })
    .catch(err => console.error("Erreur axios getTradeByPaireResult :", err));
  }, [period]);


  // Count Long and short 
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/getLongShortByTrade?period=${period}` , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setTotalLongShortTrade(res.data.counts);
        }
    })
    .catch(err => console.error("Erreur axios getTradeByPaireResult :", err));
  }, [period]);


  // AverageTimeLossAndWinTrade
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/getAverageTimeLossAndWinTrade?period=${period}` , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setAverageTimeLossAndWinTrade(res.data.data);
        }
    })
    .catch(err => console.error("Erreur axios getTradeByPaireResult :", err));
  }, [period]);

  // Drowdawn In pourcent 
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/getDrawdownInPourcent?period=${period}` , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setDrawdownInPourcent(res.data.drawdownHistory);
        }
    })
    .catch(err => console.error("Erreur axios getTradeByPaireResult :", err));
  }, [period]);

  // Best five Trade 
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/getFiveBestTrade?period=${period}` , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setFiveBestTrade(res.data.bestTrades);
        }
    })
    .catch(err => console.error("Erreur axios getTradeByPaireResult :", err));
  }, [period]);
  
  // Worst five Trade 
  useEffect(() => {
    axios.get(`http://localhost:3000/api/stats/getFiveWorstTrade?period=${period}` , { withCredentials: true})
    .then(res => {
        if (res.status === 200) {
            setFiveWorstTrade(res.data.worstTrades);
        }
    })
    .catch(err => console.error("Erreur axios getTradeByPaireResult :", err));
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
              <button onClick={() => setPeriod('year')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105  duration-300 ${period === 'year' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Year</button>
              <button onClick={() => setPeriod('month')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105 duration-300 ${period === 'month' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Month</button>
              <button onClick={() => setPeriod('week')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105  duration-300 ${period === 'week' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Week</button>
          </div>

        </div>

        <div className='w-full flex md:flex-row flex-col'>
            <div className='md:w-2/3 mr-4 w-full'>
              <CalendarTrade groupeTrades={groupeTrades}/>
            </div>
            <div className='flex flex-col justify-between md:w-1/3 md:mt-0'>
              <DonutChartTrades countPaireByPaire={countPaireByPaire}/>
              <BarChartTradesPerformance countPaireByResult={countPaireByResult}/>
            </div>
        </div>

        <div className='w-full flex flex-col'>
          <div className='flex md:flex-row-reverse flex-col w-full md:my-4'>
            <div className='md:w-1/2 w-full'>
              <DonutLongShort TotalLongShortTrade={TotalLongShortTrade}/>
            </div>
            <div className='md:w-1/2 md:mr-4 w-full'>
              <BarChartHorizontalAverageTime AverageTimeLossAndWinTrade={AverageTimeLossAndWinTrade}/>
            </div>
          </div>

          <div className='w-full'>
            <div> 
              <LineChartDrawdown DrawdownInPourcent={DrawdownInPourcent}/>
            </div>
          </div>
        </div>


      <div className="my-4 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-center text-stone-200 my-2">Five Worst Trades</h2>
          <div className="border border-orange-400/50 rounded-lg overflow-hidden shadow-sm shadow-orange-500/80">
            <table className="w-full md:text-sm text-xs">
              <thead>
                <tr className="bg-gray-500/30">
                  <th className="md:py-2 py-1 px-1 text-white">Closing date</th>
                  <th className="md:py-2 py-1 px-1 text-white">Pair</th>
                  <th className="md:py-2 py-1 px-1 text-white">Risk-Reward</th>
                  <th className="md:py-2 py-1 px-1 text-white">Net Result</th>
                  <th className="md:py-2 py-1 px-1 text-white">Status</th>
                  <th className="md:py-2 py-1 px-1 text-white">Duration</th>
                </tr>
              </thead>
              <tbody>
                {FiveWorstTrade.length > 0 ? (
                  FiveWorstTrade.map((trade, idx) => (
                    <tr key={trade.id || idx} className="text-center">
                      <td className="py-2 text-gray-200">{formatDate(trade.date)}</td>
                      <td className="py-2 text-gray-200">{trade.paire}</td>
                      <td className="py-2 text-gray-200">{trade.rr}</td>
                      <td className="py-2 text-gray-200">{trade.pnl.toFixed(2)} €</td>
                      <td className="py-2 text-gray-200">{trade.direction}</td>
                      <td className="py-2 text-gray-200">{trade.duration}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-gray-400 text-center">
                      No worst trades found
                    </td>
                  </tr>
                )}
            </tbody>

            </table>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-center text-stone-200 my-2">Five Best Trades</h2>
          <div className="border border-orange-400/50 rounded-lg overflow-hidden shadow-sm shadow-orange-500/80">
            <table className="w-full md:text-sm text-xs">
              <thead>
                <tr className="bg-gray-500/30">
                  <th className="md:py-2 py-1 px-1 text-white">Closing date</th>
                  <th className="md:py-2 py-1 px-1 text-white">Pair</th>
                  <th className="md:py-2 py-1 px-1 text-white">Risk-Reward</th>
                  <th className="md:py-2 py-1 px-1 text-white">Net Result</th>
                  <th className="md:py-2 py-1 px-1 text-white">Status</th>
                  <th className="md:py-2 py-1 px-1 text-white">Duration</th>
                </tr>
              </thead>
              <tbody>
                {FiveBestTrade.length > 0 ? (
                  FiveBestTrade.map((trade, idx) => (
                    <tr key={trade.id || idx} className="text-center">
                      <td className="py-2 text-gray-200">{formatDate(trade.date)}</td>
                      <td className="py-2 text-gray-200">{trade.paire}</td>
                      <td className="py-2 text-gray-200">{trade.rr}</td>
                      <td className="py-2 text-gray-200">{trade.pnl.toFixed(2)} €</td>
                      <td className="py-2 text-gray-200">{trade.direction}</td>
                      <td className="py-2 text-gray-200">{trade.duration}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-gray-400 text-center">
                      No Best trades found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      </main>
    </div>
  )
}

export default Performance
