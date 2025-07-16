import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import axios from 'axios';
import AllTradesDetail from '../components/AllTradesDetail';
import CardTrades from '../components/CardTrades';

function Trades() {
  const [allTrades, setAllTrades] = useState([]);

  useEffect(() => {
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
  },[]);

  useEffect(() => {
    console.log('Trades dans l’état:', allTrades);
  }, [allTrades]);

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
            <button className="w-full md:w-auto bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition cursor-pointer">
              + Create
            </button>
          </div>
        </div>

        <div className='my-5'>
          <AllTradesDetail/>
        </div>
        


        {allTrades.length === 0 ? (
          <p>Aucun trade trouvé</p>
        ) : (
          <div className='flex md:flex-row flex-col'>
            {allTrades.map(trade => (
              <CardTrades key={trade.id} trade={trade} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Trades;
