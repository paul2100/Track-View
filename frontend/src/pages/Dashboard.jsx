import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import CardStats from '../components/CardStats';
import CapitalChart from '../components/CapitalChart';
import axios from 'axios';
import FormAddCapital from '../components/FormAddCapital';
import PnlChart from '../components/PnlChart';
import { useNavigate } from 'react-router-dom';



function Dashboard() {
  const [capital_actuel, setCapital_actuel] = useState('0');
  const [currency , setCurrency] = useState ('$')
  const [allTradesStats , setAllTradesStats] = useState('0');
  const [capitalHistoryCharts , setCapitalHistoryCharts] = useState([]);
  const [pnlCharts , setPnlChart] = useState([]);
  const [pnLStats , setPnlStats] = useState('');
  const [riskRewardStats , setRiskRewardStats] = useState('');
  const [lastTradeStats , setLastTradeStats] = useState([]);
  const [period, setPeriod] = useState('week');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  


useEffect(() => {
  axios.get('http://localhost:3000/api/portefeuille/getportefeuille', { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setCapital_actuel(res.data.portefeuille.capital_actuel);
        setCurrency(res.data.portefeuille.currency);
        setShowAlert(false);
      } else {
        setTimeout(() => {
          setShowAlert(true);
        }, 2000);
      }
    })
    .catch(() => {
      setTimeout(() => {
        setShowAlert(true);
      }, 2000);
    });
}, []);


  const handleOk = () => {
    setShowAlert(false),
    navigate('/account');
  }



useEffect(() => {
  axios.get('http://localhost:3000/api/stats/getCapitalHistory', { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setCapitalHistoryCharts(res.data.capitalEvolution);
      }
    })
}, []);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getPnl?period=${period}`, { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setPnlStats(res.data.pnlTotal);
      }
    })
}, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getRewardRisk?period=${period}`, { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setRiskRewardStats(res.data.rewardRisk);
      }
    })
}, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getTotalTrades?period=${period}`, {withCredentials: true})
  .then((res) => {
    if (res.status === 200) {
      setAllTradesStats(res.data.totalTrade)
    }
    })
}, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/trade/getLastTrade`, {withCredentials: true})
  .then((res) => {
    if (res.status === 200) {
      setLastTradeStats(res.data.lastTrades)
    }
    })
}, []);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getPnlChart?period=${period}`, { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setPnlChart(res.data.pnlVariations);
      }
    })
}, [period]);



  return (
    <div className="flex relative">
      <Sidebar />

      {showAlert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 flex flex-col items-center text-center font-semibold">
            <p className="mb-6 text-gray-800 text-base leading-relaxed">
              ! Vous devez avoir un portefeuille pour accéder au dashboard.<br />
              Vous allez être redirigé vers la page account pour la configuration de votre compte.
            </p>
            <button onClick={handleOk} className="bg-orange-500 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer">
              OK
            </button>
          </div>
        </div>
      )}



      <main className="md:ml-[260px] flex-1 p-6 bg-black min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-white text-2xl font-semibold">Dashboard</h1>
            <span className="text-gray-400 text-base">
              Welcome back! Here's your activity overview.
            </span>
          </div>

          <div className="w-full md:w-auto flex md:flex-row-reverse flex-col md:items-center md:justify-center">

            <div className="md:mr-5 md:mt-0 mt-10">
              <button onClick={() => setPeriod('week')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105  duration-300 ${period === 'week' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Week</button>
              <button onClick={() => setPeriod('month')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105 duration-300 ${period === 'month' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Month</button>
              <button onClick={() => setPeriod('year')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40  hover:scale-105  duration-300 ${period === 'year' ? 'text-orange-400 border border-orange-400 shadow-orange-400' : 'text-gray-200 border border-white shadow-white'}`}>Year</button>
            </div>
          </div>
        </div>


        <div className="flex md:justify-between md:flex-row flex-col">
          <CardStats title="Capital" value={capital_actuel} currency={currency} img='/src/assets/icon.svg' />
          <CardStats title="Total trade closed" value={allTradesStats} img='/src/assets/icon.svg' />
          <CardStats title="PNL net" value={pnLStats || '0'} img='/src/assets/icon.svg' />
          <CardStats title="Risk/Reward" value={`${riskRewardStats ?? 0}%`} img='/src/assets/icon.svg' />
        </div>


        <div className='flex md:flex-row flex-col justify-between mt-5 w-full'>
          
          <CapitalChart data={capitalHistoryCharts}/>
          <PnlChart data={pnlCharts}/>
          
        </div>


        <div className="w-full mt-8 border border-orange-400/50 rounded-lg overflow-hidden shadow-sm shadow-orange-500/80">
          <table className="w-full md:text-sm text-xs">
            <thead>
              <tr className="bg-gray-500/30">
                <th className="md:py-2 py-1 px-1 text-white">Closing date</th>
                <th className="md:py-2 py-1 px-1 text-white">Pair</th>
                <th className="md:py-2 py-1 px-1 text-white">Direction</th>
                <th className="md:py-2 py-1 px-1 text-white">Net Result</th>
                <th className="md:py-2 py-1 px-1 text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {lastTradeStats.map((trade, idx) => (
                <tr
                  key={trade.id}
                  className={`text-center ${idx % 2 === 0 ? 'bg-gray-800/20' : ''}`}
                >
                  <td className='py-2 text-gray-200'>{new Date(trade.closedAt).toLocaleDateString()}</td>
                  <td className='py-2 text-gray-200'>{trade.paire}</td>
                  <td className='py-2 text-gray-200'>{trade.direction}</td>
                  <td className='py-2 text-gray-200'>{trade.result} €</td>
                  <td className='py-2 text-gray-200'>{trade.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
