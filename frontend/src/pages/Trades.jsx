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


function Trades({tradeId}) {
  const [allTrades, setAllTrades] = useState([]);
  const [selectedTradeId, setSelectedTradeId] = useState(null);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const location = useLocation();

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
  axios.delete(`http://localhost:3000/api/trade/deleteTradeById/${tradeId}`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        toast.success("Trade supprimé avec succès !");
        fetchTrades();
      }
    })
    .catch((err) => {
      const message = err.response?.data?.error || "Erreur lors de la suppression du trade";
      toast.error(message);
    });
};


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
    <div className="flex">
      <Sidebar />
      <main className="md:ml-[260px] p-6 flex-1 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-2xl font-semibold">Trades</h1>
            <span className="text-gray-500 text-base">
              Browse all your trades on this page
            </span>
          </div>

          <div className="w-full md:w-auto">
            <button
              onClick={() => setCreateFormOpen(true)}
              className="w-full md:w-auto bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition cursor-pointer"
            >
              + Create
            </button>
          </div>
        </div>

        {createFormOpen && (
          <div className='fixed top-0 right-0 h-full md:w-[400px] w-full bg-white z-50 shadow-xl overflow-y-auto p-6'>
            <button onClick={() => setCreateFormOpen(false)} className="text-red-500 font-semibold cursor-pointer mb-4">
              Close
            </button>
            <FormAddTrade
              onSuccess={() => {
                fetchTrades();
                setCreateFormOpen(false);
              }}
            />
          </div>
        )}

        <div className='my-5 py-5 w-full shadow-xs rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <CardStatsTrades title={'Average time of a trade'} stats={'2 days and 20 hours'} icons={Hourglass} />
          <CardStatsTrades title={'Success rate'} stats={'89%'} icons={CircleDollarSign}/>
          <CardStatsTrades title={'Total trade during the month'} stats={'9'} icons={Calculator}/>
          <CardStatsTrades title={'Drawdown max'} stats={'-223'} icons={MoveDownRight}/>
          <CardStatsTrades title={'Winning trade'} stats={'4'} icons={MoveUpRight}/>
          <CardStatsTrades title={'Winning percentage'} stats={'40%'} icons={Percent}/>
          <CardStatsTrades title={'Losing trade'} stats={'5'} icons={MoveDownRight}/>
          <CardStatsTrades title={'Loss percentage'} stats={'60%'} icons={Percent}/>
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
            <button onClick={() => setSelectedTradeId(null)} className="text-red-500 font-semibold cursor-pointer mb-4">
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
