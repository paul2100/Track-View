import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import CardStats from '../components/CardStats';
import CapitalChart from '../components/CapitalChart';
import axios from 'axios';
import FormAddCapital from '../components/FormAddCapital';
import PnlChart from '../components/PnlChart';



function Dashboard() {
  const [capital_actuel, setCapital_actuel] = useState('0');
  const [allTradesStats , setAllTradesStats] = useState('0');
  const [hasPortefeuille, setHasPortefeuille] = useState(true);
  const [capitalHistoryCharts , setCapitalHistoryCharts] = useState([]);
  const [pnlCharts , setPnlChart] = useState([]);
  const [pnLStats , setPnlStats] = useState('');
  const [riskRewardStats , setRiskRewardStats] = useState('');
  const [lastTradeStats , setLastTradeStats] = useState([]);
  const [period, setPeriod] = useState('week');
  


useEffect(() => {
    axios.get('http://localhost:3000/api/portefeuille/getportefeuille', { withCredentials: true })
      .then(res => {
        if (res.data?.portefeuille) {
          setCapital_actuel(res.data.portefeuille.capital_actuel);
          setHasPortefeuille(true);
        } else {
          setHasPortefeuille(false);
        }
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
        setHasPortefeuille(false);
      });
  }, []);


useEffect(() => {
  axios.get('http://localhost:3000/api/stats/getCapitalHistory', { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setCapitalHistoryCharts(res.data.capitalEvolution);
      }
    })
    .catch(err => {
      console.error('Erreur getCapitalHistory:', err);
    });
}, []);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getPnl?period=${period}`, { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setPnlStats(res.data.pnlTotal);
      }
    })
    .catch(err => {
      console.error('Erreur getCapitalHistory:', err);
    });
}, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getRewardRisk?period=${period}`, { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setRiskRewardStats(res.data.rewardRisk);
        console.log(res.data.rewardRisk)
      }
    })
    .catch(err => {
      console.error('Erreur getRewardRisk:', err);
    });
}, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getTotalTrades?period=${period}`, {withCredentials: true})
  .then((res) => {
    if (res.status === 200) {
      setAllTradesStats(res.data.totalTrade)
    }
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
      });
}, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/trade/getLastTrade`, {withCredentials: true})
  .then((res) => {
    if (res.status === 200) {
      setLastTradeStats(res.data.lastTrades)
    }
    })
    .catch(err => {
      console.error('Erreur :' , err);
    });
}, []);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getPnlChart?period=${period}`, { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setPnlChart(res.data.pnlVariations);
        console.log(res.data.pnlVariations)
      }
    })
    .catch(err => {
      console.error('Erreur pnl:', err);
    });
}, [period]);





  return (
    <div className="flex relative">
      <Sidebar />
      <main className="md:ml-[260px] flex-1 p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-2xl font-semibold">Dashboard</h1>
            <span className="text-gray-500 text-base">
              Welcome back! Here's your activity overview.
            </span>
          </div>

          <div className="w-full md:w-auto flex md:flex-row-reverse flex-col md:items-center md:justify-center">
            <button
              className="w-full md:w-auto bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition cursor-pointer"
            >
              + Create
            </button>

            <div className="md:mr-5 md:mt-0 mt-10">
              <button onClick={() => setPeriod('week')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40 text-black/50 hover:scale-110 hover:shadow-orange-500 duration-300 ${period === 'week' ? 'text-orange-400' : ''}`}>Week</button>
              <button onClick={() => setPeriod('month')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40 text-black/50 hover:scale-110 hover:shadow-orange-500 duration-300 ${period === 'month' ? 'text-orange-400' : ''}`}>Month</button>
              <button onClick={() => setPeriod('year')} className={`mr-3 cursor-pointer py-1 px-4 shadow-sm rounded-4xl shadow-black/40 text-black/50 hover:scale-110 hover:shadow-orange-500 duration-300 ${period === 'year' ? 'text-orange-400' : ''}`}>Year</button>
            </div>
          </div>
        </div>


        <div className="flex md:justify-between md:flex-row flex-col">
          <CardStats title="Capital" value={capital_actuel} img='/src/assets/icon.svg' />
          <CardStats title="Total trade closed" value={allTradesStats} img='/src/assets/icon.svg' />
          <CardStats title="PNL net" value={pnLStats || '0'} img='/src/assets/icon.svg' />
          <CardStats title="Risk/Reward" value={`${riskRewardStats ?? 0}%`} img='/src/assets/icon.svg' />
        </div>


        <div className='flex md:flex-row flex-col justify-between mt-5 w-full'>
          
          <CapitalChart data={capitalHistoryCharts}/>
          <PnlChart data={pnlCharts}/>
          
        </div>


        <div className="w-full mt-8">
          <table className="w-full text-black md:text-sm text-xs">
            <thead>
              <tr className="shadow-sm shadow-orange-500/40 rounded-lg">
                <th className="md:py-2 py-1 px-1">Closing date</th>
                <th className="md:py-2 py-1 px-1">Pair</th>
                <th className="md:py-2 py-1 px-1">Direction</th>
                <th className="md:py-2 py-1 px-1">Net Result</th>
                <th className="md:py-2 py-1 px-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {lastTradeStats.map((trade) => (
                <tr key={trade.id} className="text-center">
                  <td className='py-2'>{new Date(trade.closedAt).toLocaleDateString()}</td>
                  <td className='py-2'>{trade.paire}</td>
                  <td className='py-2'>{trade.direction}</td>
                  <td className='py-2'>{trade.result} €</td>
                  <td className='py-2'>{trade.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        
        {!hasPortefeuille && (
          <div className="fixed inset-0 bg-black/10 flex justify-center items-center flex-col z-50" style={{ backdropFilter: 'blur(3px)' }}>
            <FormAddCapital />
          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;
