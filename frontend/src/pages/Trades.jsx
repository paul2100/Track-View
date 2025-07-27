import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import axios from 'axios';
import CardTrades from '../components/CardTrades';
import FormUpdateTrades from '../components/FormUpdateTrades';
import FormAddTrade from '../components/FormAddTrade';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardStatsTrades from '../components/CardStatsTrades.jsx';
import { BarChart3 , Hourglass , CircleDollarSign , MoveDownRight, Percent , MoveUpRight , Calculator} from 'lucide-react';


function Trades() {
  const [allTrades, setAllTrades] = useState([]);
  const [selectedTradeId, setSelectedTradeId] = useState(null);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [averageStats , setAverageStats] = useState('');
  const [allTradesStats , setAllTradesStats] = useState('');
  const [succesRateStats , setSuccesRateStats] = useState('');
  const [drawdownStats , setDrawdownStats] = useState('');
  const [winTradeTotalStats , setWinTradeTotalStats] = useState('');
  const [lostTradeTotalStats , setLostTradeTotalStats] = useState('');
  const [bestTradeStats , setBestTradeStats] = useState('');
  const [worstTradeStats , setWorstTradeStats] = useState('');
  const [period, setPeriod] = useState('week');
  const location = useLocation();



useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getSuccesRate?period=${period}`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        setSuccesRateStats(res.data.pourcentageSuccesRate);
      }
    })
    .catch(err => {
      console.error(err.response?.data || err.message);
    });
}, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getWinTrade?period=${period}`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        setWinTradeTotalStats(res.data.winCount);
      }
    })
    .catch(err => {
      console.error(err.response?.data || err.message);
    });
}, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getLossTrade?period=${period}`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        setLostTradeTotalStats(res.data.lostCount);
      }
    })
    .catch(err => {
      console.error(err.response?.data || err.message);
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
  axios.get(`http://localhost:3000/api/stats/getMaxWin?period=${period}`, {withCredentials: true})
  .then((res) => {
    if (res.status === 200) {
      setBestTradeStats(res.data.bestResult)
    }
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
      });
  }, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getMaxLost?period=${period}`, {withCredentials: true})
  .then((res) => {
    if (res.status === 200) {
      setWorstTradeStats(res.data.worstResult)
    }
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
      });
  }, [period]);


useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getMaxDrawdown?period=${period}`, {withCredentials: true})
  .then((res) => {
    if (res.status === 200) {
      setDrawdownStats(res.data.maxDrawdown)
    }
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
      });
  }, [period]);

useEffect(() => {
  axios.get(`http://localhost:3000/api/stats/getAverageTimeTrade?period=${period}`, {withCredentials: true})
  .then((res) => {
    if (res.status === 200) {
      setAverageStats(res.data.averageTime)
    }
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
      });
  }, [period]);



  const fetchTrades = () => {
    axios.get('http://localhost:3000/api/trade/getAllTrades', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setAllTrades(res.data.allTrades);
        } else {
          console.error('Erreur inattendue lors de la récupération des trades');
        }
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
      });
  };


  const handleDelete = (tradeId) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce Trade ?')) {
  axios.delete(`http://localhost:3000/api/trade/deleteTradeById/${tradeId}`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        toast.success("Trade supprimé avec succès !");
        window.location.reload();
        fetchTrades();
      }
    })
    .catch((err) => {
      const message = err.response?.data?.error || "Erreur lors de la suppression du trade";
      toast.error(message);
    });
}};


  useEffect(() => {
    fetchTrades();
  }, []);

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="flex relative">
      <Sidebar />
      <main className="md:ml-[260px] p-6 flex-1 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-2xl font-semibold">Trades</h1>
            <span className="text-gray-500 text-base">
              Browse all your trades on this page
            </span>
          </div>

          <div className="w-full md:w-auto flex md:flex-row-reverse flex-col md:items-center md:justify-center">
            <button
              onClick={() => setCreateFormOpen(true)}
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

        {createFormOpen && (
          <div className='fixed top-0 right-0 h-full md:w-[400px] w-full bg-white z-50 shadow-xl overflow-y-auto p-6'>
            <button onClick={() => setCreateFormOpen(false)} className="text-rose-500 cursor-pointer border border-red-600 px-4 py-1 rounded-lg bg-rose-100 hover:bg-red-600 hover:text-white duration-300">
              Close
            </button>
            <FormAddTrade onSuccess={() => 
              {fetchTrades(); 
              setCreateFormOpen(false);
            }}/>
          </div>
        )}

        <div className='my-5 py-5 w-full shadow-xs rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <CardStatsTrades title={'Average time of a trade'} stats={averageStats || '0'} icons={Hourglass} />
          <CardStatsTrades title={'WinRate %'} stats={succesRateStats + '%'} icons={Percent}/>
          <CardStatsTrades title={'Total trade closed'} stats={allTradesStats} icons={Calculator}/>
          <CardStatsTrades title={'Drawdown max'} stats={drawdownStats ? '-' + drawdownStats : '0'} icons={MoveDownRight}/>
          <CardStatsTrades title={'Winning trade'} stats={winTradeTotalStats || '0'} icons={MoveUpRight}/>
          <CardStatsTrades title={'The biggest gain'} stats={bestTradeStats || '0'} icons={CircleDollarSign}/>
          <CardStatsTrades title={'Losing trade'} stats={lostTradeTotalStats || '0'} icons={MoveDownRight}/>
          <CardStatsTrades title={'The biggest loss'} stats={worstTradeStats || '0'} icons={CircleDollarSign}/>
        </div>


        {allTrades.length === 0 ? (
          <div className='flex justify-center flex-col items-center h-screen bg-gray-100 rounded-lg'>
            <h3 className='text-sm mb-10 text-gray-500'>You have not added any trades yet, please add one !</h3>
            <div className='p-10 bg-rose-100 rounded-[300px]'>
              <img src="src/assets/image.svg" alt="" className='h-15 w-15 opacity-40'/>
            </div>
            
          </div>
          
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4"><span className='text-orange-400'>A</span>ll Trades</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTrades.map(trade => (
                <CardTrades
                  key={trade.id}
                  trade={trade}
                  onUpdate={() => setSelectedTradeId(trade.id)}
                  onDelete={() => handleDelete(trade.id)} 
                />
              ))}
            </div>
          </div>
        )}

        {selectedTradeId && (
          <div className="fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-xl overflow-y-auto p-6">
            <button onClick={() => setSelectedTradeId(null)} className="text-rose-500 cursor-pointer border border-red-600 px-4 py-1 rounded-lg bg-rose-100 hover:bg-red-600 hover:text-white duration-300">
              Close
            </button>
            <FormUpdateTrades
              tradeId={selectedTradeId}
              onSuccess={() => {
                fetchTrades();
                setSelectedTradeId(null);
                toast.success("Trade updated successfully!");
              }}
            />
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}

export default Trades;
