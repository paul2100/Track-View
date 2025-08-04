import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import axios from 'axios'
import FormAddCapital from '../components/FormAddCapital';
import CardAccountDetails from '../components/CardAccountDetails';



function Account() {
  const [user , setUser] = useState(null);
  const [portefeuille , setPortefeuille] = useState(null);

  const today = new Date();

  function daysSince(dateString) {
    const createdDate = new Date(dateString);
    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const email = user?.email || "";

  function getPseudo (email) {
    return email.split('@')[0]
  }

  function getInitial(email) {
    if (!email) return ""; 
    return email.split('@')[0].charAt(0).toUpperCase();
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/user/getUser', { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setUser(res.data.user);
          console.log(res.data.user)
        }
      })
  }, []);

useEffect(() => {
  axios.get('http://localhost:3000/api/portefeuille/getportefeuille', { withCredentials: true })
    .then(res => {
      if (res.status === 200) {
        setPortefeuille(res.data.portefeuille);
      }
    });
}, []);




  return (
    <div>
        <Sidebar/>
        <main className="md:ml-[260px] p-6 flex-1 bg-black min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 rounded-md mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="md:text-4xl text-2xl text-white font-semibold">Account</h1>
            <span className="text-gray-400 text-base">
              View your account information
            </span>
          </div>
        </div>


        <div className='h-80 w-full bg-orange-300/20 rounded-lg border border-orange-500 overflow-hidden shadow-lg inset-shadow-lg inset-shadow-orange-500 shadow-orange-500'>
          {user ? (
            <div className='relative  h-full'>
              <div className='absolute top left-0 w-full h-45 bg-black blur-[5px]'></div>

              <div className='absolute bottom-25 z-10 px-6 py-5 border-4 my-2 border-white rounded-full bg-orange-500 text-white font-bold ml-4 '>
                <p>{getInitial(user.email)}</p>
              </div>


              <div className='absolute bottom-0 z-10 p-4'>
                <p className="text-lg text-white font-semibold flex items-center my-2">{getPseudo(user.email)} <span className='px-3 py-1 ml-4 text-xs border rounded-full bg-transparent text-orange-500'>user</span></p>
                <div className='text-gray-200'>
                  <p>Joined {new Date(user.createdAt).toLocaleDateString('en-US', {year:'numeric' , month: 'long' , day:'numeric'})}</p>
                  <p>{daysSince(user.createdAt)} {daysSince(user.createdAt) === 1 ? 'day' : 'days'} active</p>
                </div>

              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>


        
        <div className="mt-10 bg-stone-300/10 rounded-lg p-4 shadow-lg shadow-stone-600">
          <h3 className='text-white font-semibold mx-2'>Account Overview</h3>
          {portefeuille ? (
            // Si l'user a un portefeuille alors on. affiche ces infos 
            <div className="flex md:flex-row flex-col">
              <CardAccountDetails title="Initial capital" value={portefeuille.solde_initial} currency={portefeuille.currency} img='/src/assets/icon.svg' />
              <CardAccountDetails title="Current capital" value={portefeuille.capital_actuel} currency={portefeuille.currency} img='/src/assets/icon.svg' />
              <CardAccountDetails title="Leverage" value={portefeuille.leverage} img='/src/assets/icon.svg' />
              <CardAccountDetails title="Risk per trade" value={portefeuille.risk_per_trade + '%'} img='/src/assets/icon.svg' />
            </div>
          ) : (
            // sinon on affiche le formulaire pour cree son portefeuille
            <FormAddCapital />
          )}
        </div>


        
      </main>
    </div>
  )
}

export default Account
